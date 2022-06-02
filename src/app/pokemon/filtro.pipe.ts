import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemonlist/pokemon.interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(pokemons: Pokemon[], page: number = 0): Pokemon[] {
    return pokemons.slice(page,page+5)
  }

}
