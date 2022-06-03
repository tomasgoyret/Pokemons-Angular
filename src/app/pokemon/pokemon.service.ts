import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FetchAllPokemonResponse, FetchPokemonDetail, Pokemon, PokemonDetail } from './pokemonlist/pokemon.interfaces';

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
        map(this.transformSmallPokemonIntoPokemon)
      )
  }

  getPokemonDetail(id: number): Observable<PokemonDetail> {
      return this.http.get<FetchPokemonDetail>(`${this.url}/pokemon/${id}`)
        .pipe(
          map(this.transformPokemonDetailResponseIntoPokemonDetail)
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
        pic
      }
    })
    return pokemonList
  }

  private transformPokemonDetailResponseIntoPokemonDetail(resp: FetchPokemonDetail) {
    const pokemonbyID: PokemonDetail = {
      id: resp.id,
      name: resp.name,
      pic:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resp.id}.png`,
      stats: resp.stats.map( p => {
        const stats = {
          name : p.stat.name,
          points: p.base_stat
        }
        return stats
      }),
      types: resp.types.map( t => t.type.name)
    }
    return pokemonbyID
  }
}

