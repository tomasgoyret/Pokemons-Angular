import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from './pokemon.interfaces';

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {

  public pokemons: Pokemon[] = []
  public page: number = 0;

  constructor(
   private pokemonService : PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemons()
      .subscribe(resp => {
        this.pokemons = resp
      })
  }

  nextPage(){
    this.page += 5
  }
  previousPage(){
    this.page -= 5
  }

}
