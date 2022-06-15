import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonlistComponent } from './pokemon/pokemonlist/pokemonlist.component';
import { FiltroPipe } from './pokemon/filtro.pipe';
import { PokemondetailComponent } from './pokemon/pokemondetail/pokemondetail.component';
import {ButtonModule} from 'primeng/button';
import { ColorBackgroundPipe } from './pokemon/color.pipe';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    AppComponent,
    PokemonlistComponent,
    FiltroPipe,
    ColorBackgroundPipe,
    PokemondetailComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
