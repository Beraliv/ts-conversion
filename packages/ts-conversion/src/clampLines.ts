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

  return (
    lines
      // Ignore empty lines
      .filter((line) => line.trim().length > 0)
      .map((line) => line.slice(minIndent))
      .join("\n")
  );
};
