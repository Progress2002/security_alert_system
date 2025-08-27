export function formatDateTime(isoString: Date): string {
  const date = new Date(isoString);
  const formatted = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatted;
}
