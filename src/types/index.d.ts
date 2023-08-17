export interface NoteItem {
  content: string;
  contentHTML: string;
  id: number;
  tags?: Array<string>;
  title?: string;

  readonly createdAt: Date;
}

export type ViewType = 'grid' | 'list';