import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/currency.model';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css']
})
export class AddCurrencyComponent implements OnInit {
  currency: Currency = {
    ticker: '',
    name: '',
    number_of_coins:1000,
    market_cap:100
    };
  submitted = false;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

  saveCurrency(): void {
    const data = {
      ticker: this.currency.ticker,
      name: this.currency.name,
      number_of_coins: this.currency.number_of_coins,
      market_cap: this.currency.market_cap
    };

    this.currencyService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newCurrency(): void {
    this.submitted = false;
    this.currency = {
      ticker: '',
      name: '',
      number_of_coins:1000,
      market_cap:100
      };
  }

}
