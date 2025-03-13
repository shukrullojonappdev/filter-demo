import { Component, inject, effect } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {
  AdvancedFilterComponent,
  ICard,
  IFilter,
} from './advanced-filter/advanced-filter.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [SearchBarComponent, AdvancedFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  appService = inject(AppService);

  keyword = '';
  filters = this.appService.filters;
  cards = this.appService.cards;
  defaultFilterCards = this.appService.defaultFilterCards;

  constructor() {
    effect(() => {});
  }

  selectFilter(filter: IFilter) {
    this.appService.selectFilter(filter);
  }

  selectCard(card: ICard) {
    this.appService.selectCard(card);
  }

  selectCardInDefaultFilter(card: ICard) {
    this.appService.selectCardInDefaultFilter(card);
  }

  onInput(e: any) {
    this.keyword = e;
  }

  sendFilter(e: any) {
    e.preventDefault();
    const result = {
      keyword: this.keyword,
      filter0:
        this.filters()[0].cards!.length > 0
          ? [this.filters()[0].cards![0].name.toString()]
          : [],
      filter1:
        this.filters()[1].cards!.length > 0
          ? [this.filters()[1].cards![0].name.toString()]
          : [],
      filter2:
        this.filters()[2].cards!.length > 0
          ? [this.filters()[2].cards![0].name.toString()]
          : [],
      filter3:
        this.filters()[3].cards!.length > 0
          ? [this.filters()[3].cards![0].name.toString()]
          : [],
      filter4:
        this.filters()[4].cards!.length > 0
          ? [this.filters()[4].cards![0].name.toString()]
          : [],
    };
    console.log(result);
  }
}
