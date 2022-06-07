import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-pokemoncreate',
  templateUrl: './pokemoncreate.component.html',
  styleUrls: ['./pokemoncreate.component.css']
})
export class PokemoncreateComponent implements OnInit {
  
  public types: string[] = ["cargando..."]


  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getTypes()
      .subscribe(resp => {
        this.types = resp
      })
  }

}
