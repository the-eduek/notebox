import { NoteItem } from "../types";

export enum Weekdays {
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
}

export function getLocalArray<T extends number | NoteItem>(localName: string): Array<T> {
  const local = localStorage.getItem(localName);
  let localArray: Array<T> = [];

  if (local) localArray = JSON.parse(local);
  else localStorage.setItem(localName, JSON.stringify([]));

  return localArray;
}

export function setLocalArray<T extends number | NoteItem>(
  variableName: string,
  newValue: Array<T>
): void {
  localStorage.setItem(variableName, JSON.stringify(newValue));
}

export function validateNoteItem(noteParam: NoteItem): boolean {
  const isValid =
    "content" in noteParam &&
    typeof noteParam.content === "string" &&
    "createdAt" in noteParam &&
    new Date(noteParam.createdAt) instanceof Date &&
    "id" in noteParam &&
    typeof noteParam.id === "number" &&
    "tags" in noteParam &&
    Array.isArray(noteParam.tags) &&
    noteParam.tags.every((tag: string) => typeof tag === "string") &&
    "title" in noteParam &&
    typeof noteParam.title === "string";

  return isValid
    ? new Date(noteParam.createdAt).getTime() === noteParam.id
      ? true
      : false
    : false;
}
