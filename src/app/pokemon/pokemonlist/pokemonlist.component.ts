import { Component, Injectable, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.interfaces';


@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {

  public pokemons: Pokemon[] = []
  public pokemons2: Pokemon[] = []
  public page: number = 0;
  search: string = "";
  public types: string[] = ["cargando..."]


  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.page = 0;
    this.search = "";
    this.pokemons = [];
    this.pokemonService.getAllPokemons()
      .subscribe(resp => {
        this.pokemons = resp
        this.pokemons2 = resp
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

  filterByType(tipo: string) {
    if(tipo != "limpiar"){
      let filteredPokemon = this.pokemons2.filter(p => p.tipos.includes(tipo))
      this.pokemons = filteredPokemon;
    } else {
      this.pokemons = this.pokemons2
    }
  }

  getAllPokemonsWithTipes() {
    const pokemonsWithTypes = this.pokemons.map((p): Pokemon => {
      this.pokemonService.getPokemonDetail(parseInt(p.id))
        .subscribe(resp => {
          p.tipos = resp.types
          p.stats = resp.stats 
        })
      return p
    })
    this.pokemons = pokemonsWithTypes
    this.pokemons2 = pokemonsWithTypes
    
  }

  orderAZ() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemons = this.pokemons.sort(function (a, b) {
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
  orderZA() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemons = this.pokemons.sort(function (a, b) {
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

  orderbyWeaker() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemonsByStrength = this.pokemons.sort(function (a, b) {
      if (a.stats[1].points > b.stats[1].points) {
        return 1;
      }
      if (a.stats[1].points < b.stats[1].points) {
        return -1;
      }
      return 0;
    });
    this.pokemons = orderedPokemonsByStrength;
  }
  

  orderbyStronger() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemonsByStrength = this.pokemons.sort(function (a, b) {
      if (a.stats[1].points > b.stats[1].points) {
        return -1;
      }
      if (a.stats[1].points < b.stats[1].points) {
        return 1;
      }
      return 0;
    });
    this.pokemons = orderedPokemonsByStrength;
  }

  nextPage() {
    this.page += 4
  }
  previousPage() {
    this.page -= 4
  }

}
