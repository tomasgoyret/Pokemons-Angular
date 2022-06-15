import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepokemonsComponent } from './createpokemons.component';

const routes: Routes = [{ path: '', component: CreatepokemonsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatepokemonsRoutingModule { }
