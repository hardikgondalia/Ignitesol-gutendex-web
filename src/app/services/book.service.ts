import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookApiResponse } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://skunkworks.ignitesol.com:8000/books';

  constructor(private http: HttpClient) { }

  getBooks(
    page: number = 1,
    search?: string,
    languages?: string[],
    mimeType?: string,
    topic?: string
  ): Observable<BookApiResponse> {
    let params = new HttpParams().set('page', page.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (languages && languages.length > 0) {
      params = params.set('languages', languages.join(','));
    }

    if (mimeType) {
      params = params.set('mime_type', mimeType);
    }

    if (topic) {
      params = params.set('topic', topic);
    }

    return this.http.get<BookApiResponse>(this.baseUrl, { params });
  }
  getPreferredFormatUrl(book: Book): string | null {
    const formats = book.formats;

    if (formats['text/html'] && !formats['text/html'].endsWith('.zip')) {
      return formats['text/html'];
    }
    if (formats['application/pdf'] && !formats['application/pdf'].endsWith('.zip')) {
      return formats['application/pdf'];
    }
    if (formats['text/plain'] && !formats['text/plain'].endsWith('.zip')) {
      return formats['text/plain'];
    }

    // Check for any HTML, PDF, or TXT format (even if not standard MIME)
    for (const [key, value] of Object.entries(formats)) {
      if ((key.includes('html') || key.includes('pdf') || key.includes('text/plain')) &&
          !value.endsWith('.zip')) {
        return value;
      }
    }

    return null;
  }
}
