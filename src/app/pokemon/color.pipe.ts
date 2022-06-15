import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorBackground'
})
export class ColorBackgroundPipe implements PipeTransform {
  

  transform(poke: string): string {

    switch(poke) {
      case "normal":
        return "bg-indigo-400"
      case "fighting":
        return "bg-red-800"
      case "flying":
        return "bg-teal-700"
      case "poison":
        return "bg-purple-500"
      case "ground":
        return "bg-yellow-800"
      case "rock":
        return "bg-bluegray-500"
      case "bug":
        return "bg-green-600"
      case "ghost":
        return "surface-400"
      case "fire":
        return "bg-red-500"
      case "water":
        return "bg-primary-400"
      case "grass":
        return "bg-green-400"
      case "electric":
        return "bg-yellow-500"
      case "psychic":
        return "bg-pink-300"
      case "ice":
        return "bg-blue-200"
      case "dragon":
        return "bg-orange-500"
      case "dark":
        return "surface-900"
      case "fairy":
        return "bg-pink-100"
      case "unknown":
        return "surface-600"
      case "shadow":
        return "surface-800"
      default:
        return "bg-primary-reverse"
    }

    
  }

}
