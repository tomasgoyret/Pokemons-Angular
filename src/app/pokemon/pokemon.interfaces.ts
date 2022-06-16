export interface FetchAllPokemonResponse {
    count : number;
    next: null;
    previous: null;
    results: SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    pic: string;
    tipos: string[];
    stats: Stats[];
}

export interface FetchPokemonDetail {
    abilities: any[];
    base_experience: number;
    forms: string[];
    game_indices: any[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    past_types: any[];
    species: object;
    sprites: object;
    stats: any[];
    types: any[];
    weight: number;
}


export interface Stats {
    name: string;
    points: number;
}
