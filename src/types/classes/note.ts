import { Weekdays } from "../../utils";
import { NoteItem } from "../index";

class Note implements NoteItem {
  content: string;
  title?: string;
  tags?: Array<string>;
  readonly createdAt: Date;

  constructor (
    createdAt: Date,
    content: string,
    title?: string,
    tags?: Array<string>
  ) {
    this.createdAt = createdAt;
    this.content = content;
    this.title = title ?? "";
    this.tags = tags ?? [];
  }

  get dateString(): string {
    const date: Date = new Date(this.createdAt);
    return `${Weekdays[date.getDay()]}, ${date.toDateString().substring(3)}`;
  }

  get id(): number {
    return this.createdAt.valueOf();
  }
}

export default Note;