import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input()
  movies: Movie[] = [];

  swiper!: Swiper;

  constructor() { }
  ngAfterViewInit(): void {
  this.swiper = new Swiper('.swiper-container', { 
      loop: true,
    });
  }
 
  ngOnInit(): void {
    //console.log(this.movies)
  }

  onSlideNext() {
    this.swiper.slideNext();
  }
  onSlidePrev() {
    this.swiper.slidePrev();
  }
} 