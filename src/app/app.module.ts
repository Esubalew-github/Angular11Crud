import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCurrencyComponent } from './components/add-currency/add-currency.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { CurrenciesListComponent } from './components/currencies-list/currencies-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCurrencyComponent,
    CurrencyDetailsComponent,
    CurrenciesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
