import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';
import { Pokemon } from '../pokemon.interfaces';

@Component({
  selector: 'app-pokemoncreate',
  templateUrl: './pokemoncreate.component.html',
  styleUrls: ['./pokemoncreate.component.css']
})
export class PokemoncreateComponent implements OnInit {

  public types: string[] = ["cargando..."]
  @Input() newPokemon: Pokemon = {
    id: "",
    name: "",
    pic: "",
    tipos: [],
    stats: [{
      name: "hp",
      points: 0
    }, {
      name: "attack",
      points: 0
    }, {
      name: "defense",
      points: 0
    }, {
      name: "special-attack",
      points: 0
    }, {
      name: "special-defense",
      points: 0
    },
    {
      name: "speed",
      points: 0
    },
    ]
  }


  constructor(
    private pokemonService: PokemonService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.pokemonService.getTypes()
      .subscribe(resp => {
        this.types = resp
      })
    console.log(this.newPokemon)
  }

  goBack() {
    this.location.back();
  }

  addType(tipo: string){
    if(this.newPokemon.tipos.includes(tipo)){
      alert("Este tipo de pokemon ya está agregado")
    } else {
      this.newPokemon.tipos.push(tipo)
    }
  }

  alerta(){
    alert(`Pokemon en creación 
    nombre : ${this.newPokemon.name}
    pic : ${this.newPokemon.pic}
    hp : ${this.newPokemon.stats[0].points}
    attack : ${this.newPokemon.stats[1].points}
    defense : ${this.newPokemon.stats[2].points}
    special-attack : ${this.newPokemon.stats[3].points}
    special-defense : ${this.newPokemon.stats[4].points}
    speed : ${this.newPokemon.stats[5].points}
    `)
  }

}
