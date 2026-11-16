// Date helpers for the owner portal. Times are shown in Evelyn's time zone
// (Minneapolis), not the server's, so "received at" matches her clock.
const timeZone = "America/Chicago";

export function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    timeZone,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function daysAgo(value: string) {
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}
