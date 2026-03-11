// ─── Type definitions shared between the API layer and the frontend ──────────

/** Shape the LLM should return — mirrors the existing platformData structure. */
export interface GeneratedPlatformData {
  projectName: string
  generatedAt: string
  summary: string
  scoreCards: {
    awsWaf: string
    databricksWaf: string
    platformMaturity: string
    securityPillar: string
  }
  keyGaps: Array<{
    id: string
    title: string
    severity: 'High' | 'Medium' | 'Low'
    currentState: string
    targetState: string
    impact: string
    framework: 'AWS' | 'Databricks' | 'Shared'
  }>
  implementationTasks: Array<{
    id: string
    title: string
    category: string
    status: 'Completed' | 'In Progress' | 'Planned' | 'Blocked'
    priority: 'Critical' | 'High' | 'Medium' | 'Low'
    description: string
    impact: string
  }>
}

/** System prompt sent to the LLM when analysing an uploaded project folder. */
export const ANALYSIS_SYSTEM_PROMPT = `
You are a senior cloud platform architect and consultant.
You will receive the text content of files from a software project.
Your job is to produce a structured JSON status report that follows the
GeneratedPlatformData schema exactly.

Guidelines:
- scoreCards values should be percentages (e.g. "87%") or maturity levels (e.g. "L3.5")
- severity: use "High" for blocking/critical items, "Medium" for important-but-not-blocking, "Low" for nice-to-have
- Be concise but specific — this report will be presented to executives and engineers
- Only include items with evidence in the files; do not hallucinate gaps
- Output ONLY the JSON object, no prose, no markdown fences
`.trim()

/** Build the user message from an array of { filename, content } pairs. */
export function buildUserMessage(
  files: Array<{ name: string; content: string }>,
): string {
  const fileBlock = files
    .map((f) => `### ${f.name}\n\`\`\`\n${f.content.slice(0, 6000)}\n\`\`\``)
    .join('\n\n')

  return `Analyse the following project files and return the platform status report JSON:\n\n${fileBlock}`
}
