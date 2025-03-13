import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ICard } from '../advanced-filter/advanced-filter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Input() cards: any;
  @Output() selectCardEvent = new EventEmitter();
  @Output() onInputEvent = new EventEmitter();
  @ViewChild('dropdown') dropdown: any;

  currentCard: any = {};

  selectCard(card: ICard) {
    if (card.selected) this.currentCard = {};
    else this.currentCard = card;
    this.selectCardEvent.emit(card);
  }

  toggleDropdown() {
    if (this.dropdown) {
      this.dropdown.nativeElement.setAttribute(
        'data-dropdown',
        this.dropdown.nativeElement.getAttribute('data-dropdown') === 'closed'
          ? 'opened'
          : 'closed'
      );
    }
  }

  onInput(e: any) {
    this.onInputEvent.emit(e.target.value);
  }
}
