import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonDetail } from '../pokemon.interfaces';
import { Observable, of } from 'rxjs';


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
    stats: [],
    types: []
  };

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    if( id < 2000) {
      this.pokemonService.getPokemonDetail(id)
        .subscribe((p) => {
          this.pokemonDetail = p
          this.loaded = true;          
        })
    } else {
      this.getPokemonCreatedDetail()
      .subscribe((p) => {
        this.pokemonDetail = p
        this.loaded = true;          
      })
         
    }
  }

  getPokemonDetail() {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.pokemonService.getPokemonDetail(id)
      .subscribe((p) => {
        this.pokemonDetail = p
        this.loaded = true;
      })
  };

  getPokemonCreatedDetail() : Observable<PokemonDetail> {
    const id = Number(this.route.snapshot.paramMap.get("id"))
      let found = this.pokemonService.newPokemons.find(p => p.id == id.toString())
      let response: PokemonDetail = {
        id: found ? parseInt(found.id) : 0,
        name: found ? found.name : "",
        pic: found ? found.pic : "",
        stats: found ? found.stats : [],
        types: found ? found.tipos : []
      }
      const respuesta = of(response)
      return respuesta
  }
}
