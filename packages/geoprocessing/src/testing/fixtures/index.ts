import { randomInt, randomFloat } from "../../helpers/randomData.js";

export interface HumanUse {
  name: string;
  count: number;
  perc: number;
  group: string;
}

const humanUse: HumanUse[] = [
  {
    name: "Motorboat, anchoring, swimming",
    count: 0,
    perc: 0,
    group: "high",
  },
  {
    name: "Rec fishing from a self-propelled boat",
    count: 2,
    perc: 0.023,
    group: "med",
  },
  {
    name: "Rec shell fishing, clamming",
    count: 1,
    perc: 0.115,
    group: "low",
  },
  {
    name: "Scuba or snorkel from shore",
    count: 0,
    perc: 0,
    group: "low",
  },
  {
    name: "Rec fishing from a motorboat",
    count: 4,
    perc: 0.045,
    group: "high",
  },
  {
    name: "Commercial fishing",
    count: 0,
    perc: 0,
    group: "low",
  },
  {
    name: "Motorboating, no anchoring",
    count: 1,
    perc: 0.018,
    group: "med",
  },
  {
    name: "Surfing",
    count: 0,
    perc: 0,
    group: "med",
  },
];

export interface Ranked extends Record<string, string | number> {
  value: number;
  percent: number;
  totalValue: number;
  rank: string;
  fullName: string;
}

export interface RankedResult {
  ranked: Ranked[];
}

const ranked: Ranked[] = [
  {
    value: 10,
    percent: 0.1,
    totalValue: 100,
    rank: "Low",
    fullName: "Cape St. James",
  },
  {
    value: 25,
    percent: 0.25,
    totalValue: 100,
    rank: "Medium",
    fullName: "South Moresby Trough",
  },
  {
    value: 40,
    percent: 0.2,
    totalValue: 200,
    rank: "Very High",
    fullName: "Cape St. James",
  },
  {
    value: 25,
    percent: 0.25,
    totalValue: 100,
    rank: "Medium",
    fullName: "Dogfish Bank",
  },
];

export interface Categorical {
  id: string;
  count: number;
  low: number;
  med: number;
  high: number;
  comment: string;
}

export const getRandomCategorical = (): Categorical[] => {
  return Array.from({ length: 30 }).map((r, index) => ({
    id: `${index + 1}`,
    count: randomInt(10_000_000),
    low: randomFloat(0, 0.2),
    med: randomFloat(0.3, 0.5),
    high: randomFloat(0.7, 0.9),
    comment: "This is a comment",
  }));
};

export const nested: Record<string, any>[] = [
  {
    propA: "a",
    propB: "b",
    arrayC: ["one", "two", 3, 4, "five"],
    level2: {
      propC: 1,
      propD: 2,
      level3: {
        propE: "e",
        propF: "f",
      },
    },
  },
];

export default {
  ranked,
  humanUse,
  nested,
  randomCategorical: getRandomCategorical(),
};
