import { Component, inject, effect, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  appService = inject(AppService);

  keyword = '';
  filters = this.appService.filters;
  cards = this.appService.cards;
  defaultFilterCards = this.appService.defaultFilterCards;

  ngOnInit(): void {
    // For close dropdown when click outside
    document.body.addEventListener('click', (e: any) => {
      const dropdown = document.getElementById('dropdown');
      const dropdownTrigger =
        dropdown?.getElementsByClassName('dropdown-trigger')[0];
      const dropdownItems =
        dropdown?.getElementsByClassName('dropdown-items')[0];

      if (dropdownItems && !dropdownItems.contains(e.target)) {
        if (dropdownTrigger && dropdownTrigger.contains(e.target)) {
          dropdownTrigger.classList.contains('is-open')
            ? dropdownTrigger?.classList.remove('is-open')
            : dropdownTrigger?.classList.add('is-open');
          return;
        }
        dropdownItems?.setAttribute('data-dropdown', 'closed');
        dropdownTrigger?.classList.remove('is-open');
      }
    });
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

    if (this.appService.checkFilterValidation(result)) console.log(result);
  }
}
