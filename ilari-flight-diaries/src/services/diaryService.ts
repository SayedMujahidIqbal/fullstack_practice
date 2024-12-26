import diaries from "../../data/entries";

import { DiaryEntry, NonSensitiveDiartEntry, NewDiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiartEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiayEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiayEntry);
  return newDiayEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById,
};
