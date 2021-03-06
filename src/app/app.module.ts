import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonlistComponent } from './pokemon/pokemonlist/pokemonlist.component';
import { FiltroPipe } from './pokemon/filtro.pipe';
import { PokemondetailComponent } from './pokemon/pokemondetail/pokemondetail.component';
import { ButtonModule } from 'primeng/button';
import { ColorBackgroundPipe } from './pokemon/color.pipe';
import { TagModule } from 'primeng/tag';
import { PokemoncardComponent } from './pokemon/pokemoncard/pokemoncard.component';
import {CardModule} from 'primeng/card';
import { GridstatsComponent } from './pokemon/grid-stats/grid-stats.component';
import { ChartModule } from 'primeng/chart';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from './pokemon/redux/pokemon.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FavouritesComponent } from './pokemon/favourites/favourites.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonlistComponent,
    FiltroPipe,
    ColorBackgroundPipe,
    PokemondetailComponent,
    PokemoncardComponent,
    GridstatsComponent,
    FavouritesComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TagModule,
    CardModule,
    ChartModule,
    StoreModule.forRoot({pokemon : pokemonReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
