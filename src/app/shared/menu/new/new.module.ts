import { NgModule } from '@angular/core';
import { NewComponent } from './new.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: NewComponent,
  }, 
];

@NgModule({
  declarations: [NewComponent],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class NewModule { }