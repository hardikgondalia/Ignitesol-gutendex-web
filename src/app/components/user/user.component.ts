import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PdfViewerComponent } from "../pdf-viewer/pdf-viewer.component";

@Component({
    selector: 'app-user',
    imports: [CommonModule, RouterModule, InfiniteScrollDirective, PdfViewerComponent],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  loading = false;
  hasMore = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    this.userService.getUserList(this.currentPage).subscribe({
      next: (response) => {
        this.users = [...this.users, ...response.users];
        this.hasMore = response.hasMore;
        this.currentPage++;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load users',
          icon: 'error',
          confirmButtonText: 'Try Again'
        }).then(() => this.loadUsers());
      }
    });
  }

  onScroll(): void {
    this.loadUsers();
  }

  showUserDetails(user: any): void {
    Swal.fire({
      title: user.name,
      html: `
        <img src="${user.avatar}" class="swal-avatar">
        <p>Email: ${user.email}</p>
      `,
      imageUrl: user.avatar,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: user.name,
      confirmButtonText: 'Close'
    });
  }
}
