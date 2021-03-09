import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from 'src/app/models/currency.model';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  currentCurrency: Currency = {
    ticker: '',
    name: '',
    number_of_coins:1000,
    market_cap:100
  };
  message = '';

  constructor(
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getCurrency(this.route.snapshot.params.id);
  }

  getCurrency(id: string): void {
    this.currencyService.get(id)
      .subscribe(
        data => {
          this.currentCurrency = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateName(status: string): void {
    const data = {
      ticker: this.currentCurrency.ticker,
      name: this.currentCurrency.name,
      number_of_coins:this.currentCurrency.number_of_coins,
      market_cap:this.currentCurrency.market_cap
    };

    this.message = '';

    this.currencyService.update(this.currentCurrency.id, data)
      .subscribe(
        response => {
          this.currentCurrency.ticker = status;
          console.log(response);
          this.message = response.message ? response.message : 'This currency was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateCurrency(): void {
    this.message = '';

    this.currencyService.update(this.currentCurrency.id, this.currentCurrency)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This currency was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteCurrency(): void {
    this.currencyService.delete(this.currentCurrency.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/currencies']);
        },
        error => {
          console.log(error);
        });
  }
}
