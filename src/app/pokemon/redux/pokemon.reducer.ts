import { Action } from "@ngrx/store";
import { Pokemon } from "../pokemon.interfaces";

export interface AppState {
    allPokemons : Array<Pokemon>;
}



export function pokemonReducer ( state : AppState = {
    allPokemons: [{
    id: 1,
    name: "eTC",
    pic: "",
    stats: [],
    tipos: []
  }]}, action: Action) {
    switch (action.type){
        case "GET_ALL_POKEMONS":
                state = {
                    allPokemons: [...state.allPokemons, {
                    id: 2,
                    name: "Otro",
                    pic: "",
                    stats: [],
                    tipos: []
                  }]}
            return state
        default:
            return state
    }
}