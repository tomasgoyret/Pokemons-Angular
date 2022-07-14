import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../pokemon.interfaces';

@Component({
  selector: 'app-pokemoncard',
  templateUrl: './pokemoncard.component.html',
  styleUrls: ['./pokemoncard.component.css']
})
export class PokemoncardComponent implements OnInit {

  @Input() pokecard!: Pokemon;
  public isFavourite: boolean = false

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  check(){
    let oldiesFav = localStorage.getItem("favs")
    let allFavs = JSON.parse(oldiesFav || "[]")
    let exist = allFavs.find((p: Pokemon) => p.id === this.pokecard.id)
    exist ? this.isFavourite === true : false
  }


  addToFavourite(pokemon: Pokemon) {
    let oldiesFav = localStorage.getItem("favs")
    let allFavs = JSON.parse(oldiesFav || "[]")
    let joinAllWithNew = [...allFavs, pokemon]
    localStorage.setItem("favs", JSON.stringify(joinAllWithNew))
  }

}
