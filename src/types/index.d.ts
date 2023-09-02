export interface NoteItem {
  content: string;
  tags?: Array<string>;
  title?: string;

  readonly createdAt: Date;
  readonly id: number;
}

export type ViewType = "grid" | "list";

export type ModalAction = 0 | 1;
