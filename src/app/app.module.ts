import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonlistComponent } from './pokemon/pokemonlist/pokemonlist.component';
import { FiltroPipe } from './pokemon/filtro.pipe';
import { PokemondetailComponent } from './pokemon/pokemondetail/pokemondetail.component';
import { PokemoncreateComponent } from './pokemon/pokemoncreate/pokemoncreate.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonlistComponent,
    FiltroPipe,
    PokemondetailComponent,
    PokemoncreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
