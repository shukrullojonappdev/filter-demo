import { Injectable, signal } from '@angular/core';
import { ICard, IFilter } from './advanced-filter/advanced-filter.component';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  filters = signal<IFilter[]>([
    { id: 'filter0', name: 'Filter 0', selected: true, cards: [] },
    { id: 'filter1', name: 'Filter 1', selected: true, cards: [] },
    { id: 'filter2', name: 'Filter 2', selected: false, cards: [] },
    { id: 'filter3', name: 'Filter 3', selected: false, cards: [] },
    { id: 'filter4', name: 'Filter 4', selected: false, cards: [] },
  ]);
  cards = signal<ICard[]>([
    { name: 'Show all', selected: false },
    { name: 'Card 1', selected: false },
    { name: 'Card 2', selected: false },
    { name: 'Card 3', selected: false },
    { name: 'Card 4', selected: false },
    { name: 'Card 5', selected: false },
    { name: 'Card 6', selected: false },
    { name: 'Card 7', selected: false },
    { name: 'Card 8', selected: false },
  ]);
  defaultFilterCards = signal<ICard[]>([
    { name: 'Show all', selected: false },
    { name: 'Card 1', selected: false },
    { name: 'Card 2', selected: false },
    { name: 'Card 3', selected: false },
    { name: 'Card 4', selected: false },
    { name: 'Card 5', selected: false },
    { name: 'Card 6', selected: false },
    { name: 'Card 7', selected: false },
    { name: 'Card 8', selected: false },
  ]);

  constructor() {}

  selectFilter(filter: { name: string; selected: boolean }) {
    this.filters.update((filters) => {
      return filters.map((f) => {
        if (filter.name === f.name && filter.selected === f.selected) {
          // Rerender filter selected cards
          this.cards.update((cards) => {
            return cards.map((c) => {
              if (f.cards?.some((card) => card.name === c.name)) {
                return { ...c, selected: true };
              }
              return { ...c, selected: false };
            });
          });
          return { ...f, selected: true };
        }
        return { ...f, selected: false };
      });
    });
  }

  selectCard(card: { name: string; selected: boolean }) {
    this.cards.update((cards) => {
      return cards.map((c) => {
        if (card.name === c.name && card.selected === c.selected) {
          // Toggle selected card and remove filter cards
          if (card.selected) {
            this.filters.update((filters) => {
              return filters.map((f) => {
                if (!f.selected) return f;
                return { ...f, cards: [] };
              });
            });
            return { ...c, selected: false };
          }
          // Select card and add card to filter
          this.filters.update((filters) => {
            return filters.map((f) => {
              if (!f.selected || f.name === 'Filter 0') return f;
              return { ...f, cards: [card] };
            });
          });
          return { ...c, selected: true };
        }
        return { ...c, selected: false };
      });
    });
  }

  selectCardInDefaultFilter(card: { name: string; selected: boolean }) {
    this.defaultFilterCards.update((cards) => {
      return cards.map((c) => {
        if (card.name === c.name && card.selected === c.selected) {
          // Toggle selected card and remove filter cards
          if (card.selected) {
            this.filters.update((filters) => {
              return filters.map((f) => {
                if (f.name === 'Filter 0' && f.selected)
                  return { ...f, cards: [card] };
                return f;
              });
            });
            return { ...c, selected: false };
          }
          // Select card and add card to filter
          this.filters.update((filters) => {
            return filters.map((f) => {
              if (f.name === 'Filter 0' && f.selected)
                return { ...f, cards: [card] };
              return f;
            });
          });
          return { ...c, selected: true };
        }
        return { ...c, selected: false };
      });
    });
  }
}
