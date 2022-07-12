import { Action, createAction, props } from "@ngrx/store";
import { Pokemon } from "../pokemon.interfaces";
import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL } from "./actions.types";

// export class GetAllPokemonsAction implements Action{
//     readonly type: string = GET_ALL_POKEMONS
//     constructor( public payload: Array<Pokemon>) {
//         console.log(this.payload, "el payload")
//     }
// }

export const allPokemons = createAction(
    '[Fetch All Pokemons] Get All Pokemons',
    props<{ payload : Array<Pokemon>}>()
) 
// export class GetPokemonDetail implements Action {
//     readonly type: string = GET_POKEMON_DETAIL
//     constructor( public payload: Array<Pokemon>) {}
// }

// export type actions = GetAllPokemonsAction | GetPokemonDetail;