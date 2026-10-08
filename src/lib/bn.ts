const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** 1850 -> "১৮৫০" */
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** "১,৮৫০.৫০" -> 1850.5 (also accepts plain ASCII digits). Returns NaN if no number found. */
export function parseBnNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const ascii = value
    .replace(/[০-৯]/g, (ch) => String(BN_DIGITS.indexOf(ch)))
    .replace(/,/g, "")
    .replace(/[^\d.\-]/g, "");
  return ascii === "" ? NaN : Number(ascii);
}

/** 1850 -> "১,৮৫০" ; 63.5 -> "৬৩.৫০" */
export function formatNumber(value: number): string {
  const hasFraction = !Number.isInteger(value);
  const text = value.toLocaleString("en-US", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return toBn(text);
}

export const formatTaka = (value: number) => `${formatNumber(value)} টাকা`;

const UNIT_LABELS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitLabel = (unit: string) => UNIT_LABELS[unit] ?? unit;
export const perUnit = (unit: string) => `প্রতি ${unitLabel(unit)}`;

/** "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" in Bangladesh time */
export function banglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("bn-BD-u-nu-beng", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

export const formatPct = (pct: number) => `${toBn(Math.abs(pct).toFixed(1))}%`;
