import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FetchAllPokemonResponse, FetchPokemonDetail, Pokemon } from './pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2/pokemon"

  public currentPage: string | null = this.url;
  public nextPage: string | null = "";
  public previousPage: string | null = "";

  private _newPokemons: Pokemon[] = [
  ];

  get newPokemons(): Pokemon[] {
    return [...this._newPokemons]
  }


  constructor(
    private http: HttpClient
  ) { }

  getPokemonDetail(id: number): Observable<Pokemon> {
    return this.http.get<FetchPokemonDetail>(`${this.url}/${id}`)
      .pipe(
        map(this.transformPokemonDetailResponseIntoPokemonDetail)
      )
  }

  next(){
    this.currentPage = this.nextPage
  }

  previous(){
    this.currentPage = this.previousPage
  }

  getAllPokemonsFromApi(): Observable<Pokemon[]> {
    this.getLinksForPagination(!this.currentPage ? this.url : this.currentPage );
    return this.http.get<FetchAllPokemonResponse>(`${this.currentPage}`)
      .pipe(
        map(this.transformSmallPokemonIntoPokemon),
      )
  }

  getLinksForPagination(url: string = this.url) {
    this.currentPage = url;
    const links: Observable<FetchAllPokemonResponse> = this.http.get<FetchAllPokemonResponse>(`${url}`)
    links.subscribe(p => {
      this.nextPage = p.next;
      this.previousPage = p.previous      
    })
  }

  getTypes(): Observable<string[]> {
    return this.http.get<FetchAllPokemonResponse>(`https://pokeapi.co/api/v2/type`)
      .pipe(
        map(this.transformPokemonTypesResponseIntoPokemonType),
      )
  }

  addPokemon(nuevo: Pokemon) {
    this._newPokemons.unshift(nuevo)
  }

  private transformSmallPokemonIntoPokemon(resp: FetchAllPokemonResponse): Pokemon[] {
    const pokemonList: Pokemon[] = resp.results.map(poke => {
      const urlArr = poke.url.split('/')
      const id = parseInt(urlArr[6])
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      return {
        id,
        name: poke.name,
        pic,
        tipos: ["unknown"],
        stats: [{ name: "hp", points: 0 }]
      }
    })
    return pokemonList
  }

  private transformPokemonTypesResponseIntoPokemonType(resp: FetchAllPokemonResponse) {
    const types: string[] = resp.results.map(poke => {
      return poke.name
    })
    return types
  }


  private transformPokemonDetailResponseIntoPokemonDetail(resp: FetchPokemonDetail) {
    const pokemonbyID: Pokemon = {
      id: resp.id,
      name: resp.name,
      pic: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${resp.id}.png`,
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

