export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "long"
  }).format(new Date(date));
}

export function formatDateRange(startDate: string, endDate: string) {
  const formatter = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short"
  });

  return `${formatter.format(new Date(startDate))} - ${formatter.format(new Date(endDate))}`;
}

export function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatTime(time: string | null) {
  if (!time) {
    return "Flexible";
  }

  return time;
}

export function slugifyCity(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export function unslugifyCity(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
