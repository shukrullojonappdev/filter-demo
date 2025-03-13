import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

export interface IFilter {
  id: string
  name: string;
  selected: boolean;
  cards?: ICard[];
}

export interface ICard {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-advanced-filter',
  imports: [],
  templateUrl: './advanced-filter.component.html',
  styleUrl: './advanced-filter.component.css',
})
export class AdvancedFilterComponent {
  @Input() filters: any;
  @Input() cards: any;
  @Output() selectFilterEvent = new EventEmitter();
  @Output() selectCardEvent = new EventEmitter();

  @ViewChild('accordion') accordion: ElementRef | undefined;
  toggleAccordion() {
    if (this.accordion) {
      this.accordion.nativeElement.setAttribute(
        'data-accordion',
        this.accordion.nativeElement.getAttribute('data-accordion') === 'closed'
          ? 'opened'
          : 'closed'
      );
    }
  }

  selectFilter(filter: IFilter) {
    this.selectFilterEvent.emit(filter);
  }

  selectCard(card: ICard) {
    this.selectCardEvent.emit(card);
  }
}
