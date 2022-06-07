import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { FetchAllPokemonResponse, FetchPokemonDetail, Pokemon, PokemonDetail, PokemonsWithTypes } from './pokemonlist/pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2"

  constructor(
    private http: HttpClient
  ) { }

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<FetchAllPokemonResponse>(`${this.url}/pokemon?limit=1500`)
      .pipe(
        map(this.transformSmallPokemonIntoPokemon),
      )
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
        map(this.transformPokemonTaypesResponseIntoPokemonType)
      )

  }

  private transformSmallPokemonIntoPokemon(resp: FetchAllPokemonResponse) {

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

