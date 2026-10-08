export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type PriceDirection = "up" | "down" | "flat";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: PriceDirection; pct: number };
  markets?: Market[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};
