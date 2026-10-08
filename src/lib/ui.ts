import type { PriceDirection } from "./types";

/**
 * Colours follow the Figma design: a price RISE is red (bad for buyers) and a
 * price FALL is green. Swap the two classes below if you prefer green-up/red-down.
 */
export const DIRECTION_STYLE: Record<
  PriceDirection,
  { arrow: string; text: string }
> = {
  up: { arrow: "▲", text: "text-rise" },
  down: { arrow: "▼", text: "text-fall" },
  flat: { arrow: "—", text: "text-base-content/60" },
};
