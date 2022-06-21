import { Component, Injectable, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.interfaces';


@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {

  private pokemonsBU: Pokemon[] = []
  private _pokemonsShow: Pokemon[] = []
  public page: number = 0;
  search: string = "";
  public types: string[] = ["cargando..."]

  get pokemonsShow () : Pokemon[] {
    return [...this._pokemonsShow]
  }

  get existPokemonsToShow(): boolean {
    if(this._pokemonsShow.length > 0) return true
    return false;
  }

  set pokemonsShow (pokemons: Pokemon[]) {
    this._pokemonsShow = pokemons
  }

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.page = 0;
    this.search = "";
    this.pokemonsShow = [];
    this.pokemonService.getAllPokemonsFromApi()
      .subscribe(resp => {
        this.pokemonsBU = resp
        this.getAllPokemonsWithTipes()
        this.pokemonsShow = [...this.pokemonService.newPokemons,...this.pokemonsBU]
        this.pokemonsBU = this.pokemonsShow
        
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

  evento(){
    alert("Bienvenido a la app de Pokemons")
  }

  filterByType(tipo: string) {
    if(tipo != "limpiar"){
      let filteredPokemon = this.pokemonsBU.filter(p => p.tipos.includes(tipo))
      this.pokemonsShow = filteredPokemon;
    } else {
      this.pokemonsShow = this.pokemonsBU
    }
  }

  getAllPokemonsWithTipes() {
    const pokemonsWithTypes = this.pokemonsBU.map((p): Pokemon => {
      this.pokemonService.getPokemonDetail(p.id)
        .subscribe(resp => {
          p.tipos = resp.tipos
          p.stats = resp.stats 
        })
      return p
    })
    this.pokemonsBU = pokemonsWithTypes
    
  }

  getPokemonsCreados(){
    this.pokemonsShow = this.pokemonService.newPokemons
  }

  orderAZ() {
    this.page = 0;
    this.search = "";
    const orderedPokemons = this.pokemonsBU.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    this.pokemonsShow = orderedPokemons;
  }
  orderZA() {
    this.page = 0;
    this.search = "";
    const orderedPokemons = this.pokemonsBU.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    this.pokemonsShow = orderedPokemons;
  }

  orderbyWeaker() {
    this.page = 0;
    this.search = "";
    const orderedPokemonsByStrength = this.pokemonsBU.sort(function (a, b) {
      if (a.stats[1].points > b.stats[1].points) {
        return 1;
      }
      if (a.stats[1].points < b.stats[1].points) {
        return -1;
      }
      return 0;
    });
    this.pokemonsShow = orderedPokemonsByStrength;
  }
  

  orderbyStronger() {
    this.page = 0;
    this.search = "";
    const orderedPokemonsByStrength = this.pokemonsBU.sort(function (a, b) {
      if (a.stats[1].points > b.stats[1].points) {
        return -1;
      }
      if (a.stats[1].points < b.stats[1].points) {
        return 1;
      }
      return 0;
    });
    this.pokemonsShow = orderedPokemonsByStrength;
  }

  nextPage() {
    this.page += 4
    if(this.page === this.pokemonsShow.length) this.page = this.page-1
    console.log(this.page);
    console.log(this.pokemonsShow.length);
  }
  previousPage() {
    this.page -= 4
    
    
  }

}
