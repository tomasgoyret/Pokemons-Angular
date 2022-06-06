import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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
  search: string = "";
  public types: string[] = ["cargando..."]


  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.page = 0;
    this.search = "";
    this.pokemons = [];
    this.pokemonService.getAllPokemons()
      .subscribe(resp => {
        this.pokemons = resp
        this.getAllPokemonsWithTipes()
      })
    this.pokemonService.getTypes()
      .subscribe(resp => {
        this.types = resp
      })
  }

  onSearchPokemon(search: string) {
    this.page = 0;
    this.search = search;
  }

  filterByType(tipo : string){
    const filteredPokemon = this.pokemons.filter( p => p.tipos.includes(tipo))
    this.pokemons = filteredPokemon;
  }

  getAllPokemonsWithTipes() {
    const pokemonsWithTypes = this.pokemons.map((p): Pokemon => {
      this.pokemonService.getPokemonDetail(parseInt(p.id))
        .subscribe(resp => {
          p.tipos = resp.types
        })
      return p
    })
    this.pokemons = pokemonsWithTypes
  }

  orderAZ() {
    this.page = 0;
    this.pokemonService.getAllPokemons()
      .subscribe(resp => {
        const orderedPokemons = resp.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.pokemons = orderedPokemons;
      }
      )
  }
  orderZA() {
    this.page = 0;
    this.search = "";
    this.pokemonService.getAllPokemons()
      .subscribe(resp => {
        const orderedPokemons = resp.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
        this.pokemons = orderedPokemons;
      }
      )
  }

  nextPage() {
    this.page += 4
  }
  previousPage() {
    this.page -= 4
  }

}
