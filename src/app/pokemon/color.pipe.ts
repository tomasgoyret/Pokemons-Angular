import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon.interfaces';

@Pipe({
  name: 'colorBackground'
})
export class ColorBackgroundPipe implements PipeTransform {

  transform(poke: string): string {


    if(poke == "water") {
      return "blue"
    } else if (poke == "grass") {
      return "green"
    } else {
      return "yellow"
    }
    
  }

}
