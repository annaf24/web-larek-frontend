import { TCardCatalog } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Card } from './Card';

export class CardList extends Card<TCardCatalog> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _button: HTMLButtonElement | null;

  protected categoryValue = new Map<string, string>([
    ['софт-скил', 'card__category_soft'],
    ['другое', 'card__category_other'],
    ['дополнительное', 'card__category_additional'],
    ['кнопка', 'card__category_button'],
    ['хард-скил', 'card__category_hard'],
  ]);

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._button = this.container.querySelector('.card__button');

    this.container.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      
      if (target.closest('.card__button')) {
        this.events.emit('cardPreview:clickButton', { id: this._id });
      } else {
        this.events.emit('cardList:clickCard', { id: this._id });
      }
    });
  }

  set category(value: string) {
    if (!value) return;

    this.setText(this._category, value);
    const className = this.categoryValue.get(value);
    if (className) {
      this.toggleClass(this._category, className, true);
    }
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }
}
