export interface NoteItem {
  content: string;
  contentHTML: string;
  tags?: Array<string>;
  title?: string;

  readonly createdAt: Date;
}

export type ViewType = 'grid' | 'list';