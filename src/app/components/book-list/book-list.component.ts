import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollDirective, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books: Book[] = [];
  isLoading = false;
  hasMore = true;
  currentPage = 1;
  searchQuery = '';
  languageFilter = '';
  mimeTypeFilter = '';
  topicFilter = '';

  private searchSubject = new Subject<string>();

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicFilter = params['category'];
      this.loadBooks();
    });

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.resetAndLoadBooks();
    });
  }

  loadBooks(): void {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    const languages = this.languageFilter ? this.languageFilter.split(',') : undefined;
    this.bookService.getBooks(
      this.currentPage,
      this.searchQuery,
      languages,
      this.mimeTypeFilter,
      this.topicFilter
    ).subscribe({
      next: (response) => {
        this.books = [...this.books, ...response.results];
        this.hasMore = !!response.next;
        this.currentPage++;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load books. Please try again later.'
        });
      }
    });
  }

  onScroll(): void {
    this.loadBooks();
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onFilterChange(): void {
    this.resetAndLoadBooks();
  }

  resetAndLoadBooks(): void {
    this.books = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.loadBooks();
  }

  getCoverImage(book: Book): string {
    for (const [key, value] of Object.entries(book.formats)) {
      if (key.startsWith('image/') && !value.endsWith('.zip')) {
        return value;
      }
    }
    return 'assets/images/Fiction.svg';
  }

  getAuthorNames(authors: any[]): string {
    return authors?.map(a => a.name).join(', ') || 'Unknown';
  }

  openBook(book: Book): void {
    const url = this.bookService.getPreferredFormatUrl(book);

    if (url) {
      window.open(url, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No Viewable Version',
        text: 'No viewable version (HTML, PDF, or TXT) available for this book.',
        confirmButtonText: 'OK'
      });
    }
  }
}
