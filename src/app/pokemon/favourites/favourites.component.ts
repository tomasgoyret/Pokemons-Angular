import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.interfaces';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  constructor() { }

  public favourites : Pokemon[]  = []

  ngOnInit() {
    this.favourites = JSON.parse(localStorage.getItem("favs") || "[]")
    console.log(this.favourites)
  }

}
