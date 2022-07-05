import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Notfound404Component } from './pokemon/notfound404/notfound404.component';
import { PokemoncardComponent } from './pokemon/pokemoncard/pokemoncard.component';
import { PokemondetailComponent } from './pokemon/pokemondetail/pokemondetail.component';
import { PokemonlistComponent } from './pokemon/pokemonlist/pokemonlist.component';

const routes: Routes = [
  {path:"", component: PokemonlistComponent},
  {path:"newpokemon",
  loadChildren: () => import('./pokemon/createpokemons/createpokemons.module').then(m => m.CreatepokemonsModule) },
  {path:"pokemon/:id", component: PokemondetailComponent},
  {path:"card", component: PokemoncardComponent},
  {path:"**", component: Notfound404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

