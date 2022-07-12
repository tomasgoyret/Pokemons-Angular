import { Action, createReducer, on } from "@ngrx/store";
import { Pokemon } from "../pokemon.interfaces";
import { allPokemons } from "./action.creadtor";
import { GET_ALL_POKEMONS } from "./actions.types";

export interface AppState {
    allPokemons : Array<Pokemon>;
}

const initialState : AppState = {
    allPokemons : [{
            id: 1,
            name: "Tomas",
            pic: "sin",
            stats: [],
            tipos: []
          }]
}


// export function pokemonReducer ( state : AppState = { allPokemons : [{
//     id: 0,
//     name: "",
//     pic: "",
//     stats: [],
//     tipos: []
//   }]}, action: Action) {
//     switch (action.type){
//         case GET_ALL_POKEMONS:
//                 state = {
//                     allPokemons: [...state.allPokemons]
//                 }
//                 console.log(action, "la accion")
//             return state
//         default:
//             return state
//     }
// }

export const pokemonReducer = createReducer(
    initialState.allPokemons,
    on( allPokemons, (state, {payload}) =>  state = [...payload])
)

//TODO : HACER ALGO