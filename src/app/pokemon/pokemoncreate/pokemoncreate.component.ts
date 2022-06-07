import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemoncreate',
  templateUrl: './pokemoncreate.component.html',
  styleUrls: ['./pokemoncreate.component.css']
})
export class PokemoncreateComponent implements OnInit {
  
  public types: string[] = ["cargando..."]


  constructor(
    private pokemonService: PokemonService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.pokemonService.getTypes()
      .subscribe(resp => {
        this.types = resp
      })
  }

  goBack(){
    this.location.back();
  }

}
