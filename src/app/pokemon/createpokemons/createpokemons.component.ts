import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';
import { Pokemon } from '../pokemon.interfaces';


@Component({
  selector: 'app-createpokemons',
  templateUrl: './createpokemons.component.html',
  styleUrls: ['./createpokemons.component.css']
})
export class CreatepokemonsComponent implements OnInit, OnDestroy  {

  public types: string[] = ["cargando..."]
  newPokemon: Pokemon = {
    id: 0,
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
    console.log("On Init");
    
    this.pokemonService.getTypes()
      .subscribe(resp => {
        this.types = resp
      })
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    
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
    this.newPokemon.id = Math.floor(Math.random()*1000000),
    this.pokemonService.addPokemon(this.newPokemon)
    this.newPokemon = {
      id: 0,
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