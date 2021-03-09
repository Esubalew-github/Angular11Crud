import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/currency.model';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.css']
})
export class CurrenciesListComponent implements OnInit {
  currencies: Currency[] = [];
  currentCurrency?: Currency;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.retrieveCurrencies();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveCurrencies(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.currencyService.getAll(params)
    .subscribe(
      response => {
        const { currencies, totalItems } = response;
        this.currencies = currencies;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveCurrencies();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCurrencies();
  }

  refreshList(): void {
    this.retrieveCurrencies();
    this.currentCurrency = undefined;
    this.currentIndex = -1;
  }

  setActiveCurrency(currency: Currency, index: number): void {
    this.currentCurrency = currency;
    this.currentIndex = index;
  }

  removeAllCurrencies(): void {
    this.currencyService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchName(): void {
    this.currencyService.findByName(this.name)
      .subscribe(
        data => {
          this.currencies = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}