import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';

const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'peliculas/:id', component: PeliculasComponent},
  {path:'buscar/:texto', component: BuscarComponent},
  {path:'**', redirectTo: '/home'}
];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
