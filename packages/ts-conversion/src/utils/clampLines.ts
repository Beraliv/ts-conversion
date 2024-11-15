export const clampLines = (input: string): string => {
  const lines = input.split("\n");

  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length === 0) {
      // Ignore empty lines

      continue;
    }

    // Leading whitespaces only
    const match = line.match(/^\s*/);
    if (match && match.length > 0 && match[0].length < minIndent) {
      minIndent = match[0].length;
    }
  }

  const clampedLines = lines.map((line) => line.slice(minIndent));

  let start = 0;
  if (clampedLines[start].trim().length === 0) {
    start++;
  }

  return clampedLines.slice(start).join("\n");
};
