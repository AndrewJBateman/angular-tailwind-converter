import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertComponent } from './modules/application/convert/convert.component';
import { NotFoundComponent } from './modules/common/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ConvertComponent,
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/common/about/about.module'),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./modules/application/chat/chat.module'),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
