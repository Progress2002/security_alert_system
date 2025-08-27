export function formatDateTime(isoString: Date): string {
  const date = new Date(isoString);
  const formatted = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formatted;
}
