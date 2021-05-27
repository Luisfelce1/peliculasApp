import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { CarteleraReponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CreditsReponse } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  getPleiculaDetalle(id: any) {
    throw new Error('Method not implemented.');
  }

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;


  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '2bcc0e0d00694ab7980ac72a95e61293',
      language: 'es-ES',
      page: this.carteleraPage
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;
    return this.http.get<CarteleraReponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: texto };
    // http://api.themoviedb.org/3/search/movie

    return this.http.get<CarteleraReponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    )
  }

  getPeliculaDetalle(id: string) {

    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    )
  }

  getCast(id: string): Observable<Cast[]>{

    return this.http.get<CreditsReponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(err => of([]) )
      )
  } 
}
