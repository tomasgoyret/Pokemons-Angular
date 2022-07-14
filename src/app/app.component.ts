import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonService } from './pokemon/pokemon.service';
import {  allPokemons } from './pokemon/redux/action.creadtor';
import { AppState } from './pokemon/redux/pokemon.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pokemon';

  estado : any = [];

  constructor(
    private store: Store<AppState>,
    public pokemonService : PokemonService
    ) {
    this.store.subscribe(state => {
      this.estado = state;
    })
  }

  action() {
    this.pokemonService.getAllPokemonsFromApi()
      .subscribe( pokemons => {
        const accion = allPokemons({payload: pokemons})
        this.store.dispatch(accion)
      })
  }
}
