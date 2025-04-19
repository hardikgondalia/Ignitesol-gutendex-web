import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-genre-card',
  imports: [RouterModule],
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
