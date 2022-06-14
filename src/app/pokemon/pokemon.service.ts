import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, concatWith, map, mergeWith, Observable, pipe, switchMap, tap } from 'rxjs';
import { FetchAllPokemonResponse, FetchPokemonDetail, Pokemon, PokemonDetail, PokemonsWithTypes } from './pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2"
  private _newPokemons: Pokemon[] = [{
    id: Math.random().toString(),
    name: "NuevoPokemon",
    pic: "https://media.shoanime.com/2017/10/Pikachu-portada-1.jpg",
    tipos: ["electric", "unknown"],
    stats: [{ name: "hp", points: 5000 }, { name: "attack", points: 5000 }, { name: "defense", points: 5000 }, { name: "special-attack", points: 5000 }, { name: "special-defense", points: 5000 },{ name: "speed", points: 5000 }, ]
  }];

  get newPokemons(): Pokemon[] {
    return [...this._newPokemons]
  }

  

  constructor(
    private http: HttpClient
  ) { }

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<FetchAllPokemonResponse>(`${this.url}/pokemon?limit=1500`)
      .pipe(
        map(this.transformSmallPokemonIntoPokemon),
      )
  }


  getCreatedPokemons():Pokemon[] {
    return this.newPokemons
  }

  getPokemonDetail(id: number): Observable<PokemonDetail> {
    
    return this.http.get<FetchPokemonDetail>(`${this.url}/pokemon/${id}`)
      .pipe(
        map(this.transformPokemonDetailResponseIntoPokemonDetail)
      )
  }

  getTypes() : Observable<string[]> {
    return this.http.get<FetchAllPokemonResponse>(`${this.url}/type`)
      .pipe(
        map(this.transformPokemonTaypesResponseIntoPokemonType),
      )

  }

  addPokemon(nuevo: Pokemon) {
    this._newPokemons.unshift(nuevo)
    console.log(this._newPokemons)
  }

  private transformSmallPokemonIntoPokemon(resp: FetchAllPokemonResponse) : Pokemon[] {

    const pokemonList: Pokemon[] = resp.results.map(poke => {

      const urlArr = poke.url.split('/')
      const id = urlArr[6]
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      return {
        id,
        name: poke.name,
        pic,
        tipos: ["default"],
        stats: [{name: "cargando", points: 0}]
      }
    })
    return pokemonList
  }

  private transformPokemonTaypesResponseIntoPokemonType(resp: FetchAllPokemonResponse) {
    const types: string[] = resp.results.map( poke => {
      return poke.name
    })
    return types
  }

  private transformPokemonDetailResponseIntoPokemonDetail(resp: FetchPokemonDetail) {
    const pokemonbyID: PokemonDetail = {
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
      types: resp.types.map(t => t.type.name)
    }
    return pokemonbyID
  }
}

