import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {


  public pelicula!: MovieResponse;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    //fORMA CORTA/ CON ALGUNOS ERRORES

   // combineLatest([

   //   this.peliculasService.getCast(id),
   //   this.peliculasService.getPeliculaDetalle(id)


   // ]).subscribe(([pelicula, cast]) => {
   
   //   if (!pelicula) {
   //     this.router.navigateByUrl('/home');
   //     return;
   //   }
   //   
   //   this.pelicula = pelicula;
   //   this.cast = cast.filter( actor => actor.profile_path !== null);
   // });


    //FORMA LARGA

       this.peliculasService.getPeliculaDetalle(id).subscribe(movie => {
         
         if(!movie) {
           this.router.navigateByUrl('/home');
           return;
         }
         //console.log(movie);
         this.pelicula = movie;
       });
    
       this.peliculasService.getCast(id).subscribe(cast => {
         console.log(cast)
         this.cast = cast.filter( actor => actor.profile_path !== null);
       });
     }
    
     onRegresar() {
       this.location.back();
     }

  }
