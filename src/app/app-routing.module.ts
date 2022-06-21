import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemoncardComponent } from './pokemon/pokemoncard/pokemoncard.component';
import { PokemondetailComponent } from './pokemon/pokemondetail/pokemondetail.component';
import { PokemonlistComponent } from './pokemon/pokemonlist/pokemonlist.component';

const routes: Routes = [
  {path:"", component: PokemonlistComponent},
  {path:"newpokemon",
  loadChildren: () => import('./pokemon/createpokemons/createpokemons.module').then(m => m.CreatepokemonsModule) },
  // children : [

  // ]},
  {path:"pokemon/:id", component: PokemondetailComponent},
  {path:"card", component: PokemoncardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
