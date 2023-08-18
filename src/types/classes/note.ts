import { Weekdays } from "../../utils";
import { NoteItem } from "../index";

class Note implements NoteItem {
  content: string;
  title?: string;
  tags?: Array<string>;
  readonly createdAt: Date;
  readonly id: number;

  constructor (
    createdAt: Date,
    content: string,
    title?: string,
    tags?: Array<string>
  ) {
    this.createdAt = new Date(createdAt);
    this.content = content;
    this.id = this.createdAt.getTime();
    this.title = title ?? "";
    this.tags = tags ?? [];
  }

  get dateString(): string {
    const date: Date = new Date(this.createdAt);
    return `${Weekdays[date.getDay()]}, ${date.toDateString().substring(3)}`;
  }
}

export default Note;