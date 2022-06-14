import { Pipe, PipeTransform } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Pipe({
  name: 'colorBackground'
})
export class ColorBackgroundPipe implements PipeTransform {
  

  transform(poke: string): string {

    switch(poke) {
      case "normal":
        return "red"
      case "fighting":
        return "blue"
      case "flying":
        return "yellow"
      case "poison":
        return "green"
      case "ground":
        return "purple"
      case "rock":
        return "orange"
      case "bug":
        return "dark-green"
      case "ghost":
        return "black"
      case "fire":
        return "red"
      case "water":
        return "blue"
      case "grass":
        return "blue"
      case "electric":
        return "yellow"
      case "psychic":
        return "blue"
      case "ice":
        return "blue"
      case "dragon":
        return "blue"
      case "dark":
        return "blue"
      case "fairy":
        return "blue"
      case "unknown":
        return "blue"
      case "shadow":
        return "blue"
      default:
        return "grey"
    }

    
  }

}
