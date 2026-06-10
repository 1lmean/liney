export interface Line {
  id: string;
  sentence: string;
  bookTitle: string;
  author?: string;
  page?: number;
  savedAt: Date;
}
