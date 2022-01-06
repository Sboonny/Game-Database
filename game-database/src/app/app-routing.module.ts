import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search/:game-search',
    component: HomeComponent,
  }
];
=======
const routes: Routes = [];
>>>>>>> parent of f0fdc03 (added home-component)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
