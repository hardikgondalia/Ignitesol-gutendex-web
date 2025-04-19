import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre-card',
  imports: [],
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent implements OnInit {
  @Input() name!: string;
  @Input() image!: string;
  constructor(){}
  ngOnInit(): void {
  }
}
