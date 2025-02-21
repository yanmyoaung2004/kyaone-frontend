export function formatToSpecificDateTime(timestamp) {
  const specificDate = new Date(timestamp);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return specificDate.toLocaleString("en-US", options);
}
