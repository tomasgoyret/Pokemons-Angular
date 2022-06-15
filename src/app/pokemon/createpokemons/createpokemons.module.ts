import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatepokemonsRoutingModule } from './createpokemons-routing.module';
import { CreatepokemonsComponent } from './createpokemons.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreatepokemonsComponent,
  ],
  imports: [
    CommonModule,
    CreatepokemonsRoutingModule,
    FormsModule
  ]
})
export class CreatepokemonsModule { }
