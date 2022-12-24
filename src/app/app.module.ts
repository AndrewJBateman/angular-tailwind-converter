import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './modules/common/nav/nav.component';
import { ConvertComponent } from './modules/application/convert/convert.component';
import { NotFoundComponent } from './modules/common/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ConvertComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
