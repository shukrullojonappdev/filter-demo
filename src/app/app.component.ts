import { Component, inject } from '@angular/core';
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

  filters = this.appService.filters;
  cards = this.appService.cards;

  selectFilter(filter: IFilter) {
    this.appService.selectFilter(filter);
  }

  selectCard(card: ICard) {
    this.appService.selectCard(card);
  }
}
