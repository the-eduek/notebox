import { NoteItem } from "../index";

class Note implements NoteItem {
  title: string;
  tags: Array<string>;

  readonly createdAt: Date;

  constructor (
    title: string,
    tags: Array<string>
  ) {
    this.title = title;
    this.tags = tags;
    this.createdAt = new Date();
    
  }
}

export default Note;