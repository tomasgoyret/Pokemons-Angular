import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.interfaces';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-pokemondetail',
  templateUrl: './pokemondetail.component.html',
  styleUrls: ['./pokemondetail.component.css']
})
export class PokemondetailComponent implements OnInit {

  public loaded = false;
  public pokemonDetail: Pokemon = {
    id: 0,
    name: "",
    pic: "",
    stats: [],
    tipos: []
  };

  data: any;
  chartOptions: any;



  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
  ) {

    console.log(this.data);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    if (id < 2000) {
      this.pokemonService.getPokemonDetail(id)
        .subscribe((p) => {
          this.pokemonDetail = p
          this.loaded = true;
          this.data = {
            labels: this.pokemonDetail.stats.map((e) => e.name),
            datasets: [{
              label: "Estadísticas",
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: this.pokemonDetail.stats.map((e) => e.points),
              tension: 0
            }]
          }
          this.chartOptions = {
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              // ticks: { 
              //   max: 190, 
              //   min: 1, 
              //   stepSize: 20, 
              // },
              r: {
                pointLabels: {
                  font: {
                    size: 20,
                  },
                  color: [
                    'red',    // color for data at index 0
                    'blue',   // color for data at index 1
                    'green',  // color for data at index 2
                    'black',
                    'pink',
                    'orange',  // color for data at index 3
                    //...
                  ],
                },
              },
            },
          }
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

  getPokemonCreatedDetail(): Observable<Pokemon> {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    let found = this.pokemonService.newPokemons.find(p => p.id == id)
    let response: Pokemon = {
      id: found ? found.id : 0,
      name: found ? found.name : "",
      pic: found ? found.pic : "",
      stats: found ? found.stats : [],
      tipos: found ? found.tipos : []
    }
    const respuesta = of(response)
    return respuesta
  }
}
