import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/characterDetails/character.details.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'character/:id', component: CharacterComponent},
  {path: '', redirectTo:'/search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
