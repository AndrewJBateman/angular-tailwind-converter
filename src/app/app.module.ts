import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './modules/common/nav/nav.component';
import { ConvertComponent } from './modules/application/convert/convert.component';
import { NotFoundComponent } from './modules/common/not-found/not-found.component';
import { FormComponent } from './modules/application/form/form.component';
import { ResultsComponent } from "./modules/application/results/results.component";

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        ConvertComponent,
        NotFoundComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule, HttpClientModule,
        FormComponent,
        ResultsComponent
    ]
})
export class AppModule { }
