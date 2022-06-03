import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemondetailComponent } from './pokemon/pokemondetail/pokemondetail.component';
import { PokemonlistComponent } from './pokemon/pokemonlist/pokemonlist.component';

const routes: Routes = [
  {path:"pokemon/:id", component: PokemondetailComponent},
  {path:"", component: PokemonlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
