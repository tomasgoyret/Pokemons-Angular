import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonDetail } from '../pokemonlist/pokemon.interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemondetail',
  templateUrl: './pokemondetail.component.html',
  styleUrls: ['./pokemondetail.component.css']
})
export class PokemondetailComponent implements OnInit {

  public loaded = false;
  public pokemonDetail: PokemonDetail = {
    id: 0,
    name: "",
    pic: "",
    stats: []
  };
  
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location
    ) { }
    
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get("id"))
      this.pokemonService.getPokemonDetail(id)
        .subscribe((p) => {
          console.log(p, "subscribe")
          this.pokemonDetail = p
          this.loaded = true;
      })      
    }

    goBack(){
      this.location.back();
    }
    
}

