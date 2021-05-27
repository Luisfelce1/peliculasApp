import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input()  movies: Movie[] = [];

  swiper!: Swiper;

  constructor(private router: Router) { 
   
  }

  ngOnInit(): void {
  }

  onMovieClick(movie: Movie){


    this.router.navigate(['/peliculas', movie.id]);
  }

}
