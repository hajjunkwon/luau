export function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/^['"`]+|['"`]+$/g, "")
    .replace(/\s+/g, " ")
    .replace(/;+$/g, "")
    .toLowerCase();
}

function compact(raw: string): string {
  return normalizeAnswer(raw)
    .replace(/\s+/g, "")
    .replace(/\(.*\)$/g, "")
    .replace(/^[:.]/, "");
}

export function gradeShort(input: string, accepted: string[]): boolean {
  const got = normalizeAnswer(input);
  if (!got) return false;
  const gotCompact = compact(input);
  return accepted.some((answer) => {
    const want = normalizeAnswer(answer);
    if (got === want) return true;
    return gotCompact.length > 0 && gotCompact === compact(answer);
  });
}

export function primaryAnswer(accepted: string[]): string {
  return accepted[0] ?? "";
}
