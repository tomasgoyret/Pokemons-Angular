import { Component } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from './pokemon/redux/pokemon.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pokemon';

  private estado : any = [];

  constructor(private store: Store<AppState>) {
    this.store.subscribe(state => {
      this.estado = state;
      console.log(state);
    })
  }

  action() {
    const accion: Action = {
      type: "GET_ALL_POKEMONS"
    }
    this.store.dispatch(accion)
    console.log(this.estado.pokemons)
  }
}
