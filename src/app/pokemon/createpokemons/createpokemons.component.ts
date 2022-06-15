import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';
import { Pokemon } from '../pokemon.interfaces';


@Component({
  selector: 'app-createpokemons',
  templateUrl: './createpokemons.component.html',
  styleUrls: ['./createpokemons.component.css']
})
export class CreatepokemonsComponent implements OnInit  {

  public types: string[] = ["cargando..."]
  @Input() newPokemon: Pokemon = {
    id: '',
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

  //public nuevoPokemon : Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private location: Location,
    //private pokemonList: PokemonlistComponent
  ) { }

  ngOnInit(): void {
    this.pokemonService.getTypes()
      .subscribe(resp => {
        this.types = resp
      })
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

  addPokemon(){
    this.newPokemon.id = Math.random().toString().split(".")[1];
    this.pokemonService.addPokemon(this.newPokemon)
    this.newPokemon = {
      id: '',
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
  }
}