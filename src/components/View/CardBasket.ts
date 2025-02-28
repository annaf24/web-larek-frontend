import { TCardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Card } from './Card';

export class CardBasket extends Card<TCardBasket> {
  protected _button: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._button = ensureElement('.card__button', this.container) as HTMLButtonElement;
    this._index = ensureElement('.basket__item-index', this.container) as HTMLElement;

    this._button.addEventListener('click', () => this.events.emit('cardBaske:clickDeleteButton', { id: this._id }));
  }

  //Устанавливает индекс элемента в корзине
  setIndex(value: number): this {
    this.setText(this._index, value.toString());
    return this;
  }
}
