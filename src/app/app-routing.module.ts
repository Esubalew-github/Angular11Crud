import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesListComponent } from './components/currencies-list/currencies-list.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { AddCurrencyComponent } from './components/add-currency/add-currency.component';

const routes: Routes = [
  { path: '', redirectTo: 'currencies', pathMatch: 'full' },
  { path: 'currencies', component: CurrenciesListComponent },
  { path: 'currencies/:id', component: CurrencyDetailsComponent },
  { path: 'add', component: AddCurrencyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
