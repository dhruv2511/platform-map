/**
 * POST /api/analyze
 *
 * Accepts a multipart/form-data upload where each field is a text file from
 * the user's project folder.  Sends the content to an LLM and streams back
 * a GeneratedPlatformData JSON object that the dashboard can render immediately.
 *
 * ─── Deployment note ────────────────────────────────────────────────────────
 * This route requires a Node.js server.  It is NOT included in the static
 * GitHub Pages build (NEXT_PUBLIC_DEPLOY_TARGET=static).
 * Deploy to Vercel (or any Node host) to enable this endpoint.
 *
 * ─── Environment variables required ─────────────────────────────────────────
 * OPENAI_API_KEY   — for OpenAI models (gpt-4o recommended)
 *                    Set in Vercel dashboard → Settings → Environment Variables
 *
 * To swap to Anthropic / another provider, replace the fetch call below with
 * the relevant SDK — the prompt structure in src/lib/ai.ts stays the same.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'
import { ANALYSIS_SYSTEM_PROMPT, buildUserMessage } from '@/lib/ai'
import type { GeneratedPlatformData } from '@/lib/ai'

export const runtime = 'nodejs'  // edge runtime doesn't support formData file streaming well

// ─── Max file sizes ───────────────────────────────────────────────────────────
const MAX_FILES = 50
const MAX_FILE_BYTES = 100_000  // 100 KB per file (LLM context limit)

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── 1. Parse uploaded files ─────────────────────────────────────────────────
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid multipart form data' }, { status: 400 })
  }

  const files: Array<{ name: string; content: string }> = []

  for (const [name, value] of formData.entries()) {
    if (files.length >= MAX_FILES) break
    if (!(value instanceof Blob)) continue

    const text = await value
      .slice(0, MAX_FILE_BYTES)
      .text()

    // Skip binary / non-text files (simple heuristic)
    if (text.includes('\u0000')) continue

    files.push({ name, content: text })
  }

  if (files.length === 0) {
    return NextResponse.json({ error: 'No readable text files provided' }, { status: 400 })
  }

  // ── 2. Call the LLM ──────────────────────────────────────────────────────────
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY is not configured on the server' },
      { status: 500 },
    )
  }

  let llmText: string
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
          { role: 'user', content: buildUserMessage(files) },
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`OpenAI error ${response.status}: ${err}`)
    }

    const json = await response.json()
    llmText = json.choices?.[0]?.message?.content ?? ''
  } catch (err) {
    console.error('[analyze] LLM call failed:', err)
    return NextResponse.json({ error: 'LLM request failed' }, { status: 502 })
  }

  // ── 3. Parse and validate the structured output ──────────────────────────────
  let data: GeneratedPlatformData
  try {
    data = JSON.parse(llmText) as GeneratedPlatformData
  } catch {
    console.error('[analyze] LLM returned non-JSON:', llmText.slice(0, 500))
    return NextResponse.json({ error: 'LLM returned invalid JSON' }, { status: 502 })
  }

  // Stamp with server-side timestamp if the model forgot
  data.generatedAt ??= new Date().toISOString()

  return NextResponse.json(data)
}
