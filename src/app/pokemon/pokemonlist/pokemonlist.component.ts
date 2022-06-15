import { Component, Injectable, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.interfaces';


@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {

  private pokemons2: Pokemon[] = []
  private _pokemons3: Pokemon[] = []
  public page: number = 0;
  search: string = "";
  public types: string[] = ["cargando..."]

  get pokemons3 () : Pokemon[] {
    return [...this._pokemons3]
  }

  set pokemons3 (pokemons: Pokemon[]) {
    this._pokemons3 = pokemons
  }


  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.page = 0;
    this.search = "";
    this.pokemons3 = [];
    this.pokemonService.getAllPokemons()
      .subscribe(resp => {
        this.pokemons2 = resp
        this.getAllPokemonsWithTipes()
        this.pokemons3 = [...this.pokemonService.newPokemons,...this.pokemons2]
        this.pokemons2 = this.pokemons3
        
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
      this.pokemons3 = filteredPokemon;
    } else {
      this.pokemons3 = this.pokemons2
    }
  }

  getAllPokemonsWithTipes() {
    const pokemonsWithTypes = this.pokemons2.map((p): Pokemon => {
      this.pokemonService.getPokemonDetail(parseInt(p.id))
        .subscribe(resp => {
          p.tipos = resp.types
          p.stats = resp.stats 
        })
      return p
    })
    this.pokemons2 = pokemonsWithTypes
    
  }

  getPokemonsCreados(){
    this.pokemons3 = this.pokemonService.newPokemons
  }

  orderAZ() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemons = this.pokemons2.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    this.pokemons3 = orderedPokemons;
  }
  orderZA() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemons = this.pokemons2.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    this.pokemons3 = orderedPokemons;
  }

  orderbyWeaker() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemonsByStrength = this.pokemons2.sort(function (a, b) {
      if (a.stats[1].points > b.stats[1].points) {
        return 1;
      }
      if (a.stats[1].points < b.stats[1].points) {
        return -1;
      }
      return 0;
    });
    this.pokemons3 = orderedPokemonsByStrength;
  }
  

  orderbyStronger() {
    this.page = 0;
    this.search = "";
    this.getAllPokemonsWithTipes()
    const orderedPokemonsByStrength = this.pokemons2.sort(function (a, b) {
      if (a.stats[1].points > b.stats[1].points) {
        return -1;
      }
      if (a.stats[1].points < b.stats[1].points) {
        return 1;
      }
      return 0;
    });
    this.pokemons3 = orderedPokemonsByStrength;
  }

  nextPage() {
    this.page += 4
    if(this.page >= -5 && this.page < 0){
      this.page = 0
    }
    console.log(this.page);
    
  }
  previousPage() {
    this.page -= 4
    if(this.page >= -5){
      this.page = -5
    }
    console.log(this.page);

    
    
  }

}
