import { Component, OnInit } from '@angular/core';
import { Category, GenreCategoryService } from '../../services/genre-category.service';
import { GenreCardComponent } from "../genre-card/genre-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-list',
  imports: [GenreCardComponent, CommonModule],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.scss'
})
export class GenreListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: GenreCategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }
}
