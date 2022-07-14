import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.interfaces';

@Component({
  selector: 'app-pokemoncard',
  templateUrl: './pokemoncard.component.html',
  styleUrls: ['./pokemoncard.component.css']
})
export class PokemoncardComponent implements OnInit {

  @Input() pokecard! : Pokemon;

  constructor(
    ) {}

  ngOnInit(): void {
  }

  addToFavourite(pokemon: Pokemon){
    let oldiesFav = localStorage.getItem("favs")
    let allFavs = JSON.parse(oldiesFav || "[]")
    let joinAllWithNew = [...allFavs,pokemon]
    localStorage.setItem("favs", JSON.stringify(joinAllWithNew))
  }

}
