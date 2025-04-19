export interface Book {
  id: number;
  title: string;
  authors: { name: string; birth_year: number; death_year: number }[];
  translators: any[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: { [key: string]: string };
  download_count: number;
}

export interface BookApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}
