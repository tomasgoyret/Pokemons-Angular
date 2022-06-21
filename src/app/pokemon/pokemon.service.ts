import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable} from 'rxjs';
import { FetchAllPokemonResponse, FetchPokemonDetail, Pokemon } from './pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2"

  //Pokemons que se crean
  private _newPokemons: Pokemon[] = [
  //   {
  //   id: Math.floor(Math.random()*1000000),
  //   name: "aabuevoPokemon",
  //   pic: "https://media.shoanime.com/2017/10/Pikachu-portada-1.jpg",
  //   tipos: ["electric", "unknown"],
  //   stats: [{ name: "hp", points: 5000 }, { name: "attack", points: 5000 }, { name: "defense", points: 5000 }, { name: "special-attack", points: 5000 }, { name: "special-defense", points: 5000 },{ name: "speed", points: 5000 }, ]
  // },{
  //   id: Math.floor(Math.random()*1000000),
  //   name: "zzzzzuevoPokemon",
  //   pic: "https://media.shoanime.com/2017/10/Pikachu-portada-1.jpg",
  //   tipos: ["normal", "grass"],
  //   stats: [{ name: "hp", points: 1 }, { name: "attack", points: 1 }, { name: "defense", points: 1 }, { name: "special-attack", points: 1 }, { name: "special-defense", points: 1 },{ name: "speed", points: 1 }, ]
  // },
];

  get newPokemons(): Pokemon[] {
    return [...this._newPokemons]
  }

  
  constructor(
    private http: HttpClient
  ) { }

  getAllPokemonsFromApi(): Observable<Pokemon[]> {
    return this.http.get<FetchAllPokemonResponse>(`${this.url}/pokemon?limit=1500`)
      .pipe(
        map(this.transformSmallPokemonIntoPokemon),
      )
  }

  getPokemonDetail(id: number): Observable<Pokemon> {
    
    return this.http.get<FetchPokemonDetail>(`${this.url}/pokemon/${id}`)
      .pipe(
        map(this.transformPokemonDetailResponseIntoPokemonDetail)
      )
  }

  getTypes() : Observable<string[]> {
    return this.http.get<FetchAllPokemonResponse>(`${this.url}/type`)
      .pipe(
        map(this.transformPokemonTypesResponseIntoPokemonType),
      )

  }

  addPokemon(nuevo: Pokemon) {
    this._newPokemons.unshift(nuevo)
    console.log(this._newPokemons)
  }

  private transformSmallPokemonIntoPokemon(resp: FetchAllPokemonResponse) : Pokemon[] {

    const pokemonList: Pokemon[] = resp.results.map(poke => {

      const urlArr = poke.url.split('/')
      const id = parseInt(urlArr[6])
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      return {
        id,
        name: poke.name,
        pic,
        tipos: ["unknown"],
        stats: [{name: "hp", points: 0}]
      }
    })
    return pokemonList
  }

  private transformPokemonTypesResponseIntoPokemonType(resp: FetchAllPokemonResponse) {
    const types: string[] = resp.results.map( poke => {
      return poke.name
    })
    return types
  }

  private transformPokemonDetailResponseIntoPokemonDetail(resp: FetchPokemonDetail) {
    const pokemonbyID: Pokemon = {
      id: resp.id,
      name: resp.name,
      pic: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resp.id}.png`,
      stats: resp.stats.map(p => {
        const stats = {
          name: p.stat.name,
          points: p.base_stat
        }
        return stats
      }),
      tipos: resp.types.map(t => t.type.name)
    }
    return pokemonbyID
  }
}

