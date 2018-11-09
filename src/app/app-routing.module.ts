import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleGrindersComponent } from './module-grinders/module-grinders.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'grinders', component: ModuleGrindersComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
