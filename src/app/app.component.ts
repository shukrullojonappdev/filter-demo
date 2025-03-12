import { Component } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AdvancedFilterComponent } from './advanced-filter/advanced-filter.component';

@Component({
  selector: 'app-root',
  imports: [SearchBarComponent, AdvancedFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'filter-demo';
}
