import { z } from "zod";
import { NewEntrySchema } from "./utils";

export type NonSensitiveDiartEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export enum Weather {
  Suuny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
