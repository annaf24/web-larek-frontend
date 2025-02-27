import { TCardPreview } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { CardList } from './CardList';

export class CardPreview extends CardList implements TCardPreview {
    protected _description: HTMLElement;
  
    constructor(container: HTMLElement, events: IEvents) {
      super(container, events);
  
      // Получаем элемент описания карточки
      this._description = ensureElement('.card__text', this.container) as HTMLElement;
    }
  
    // Устанавливает описание карточки.
    set description(value: string) {
      this.setText(this._description, value);
    }
    
    // Устанавливает текст на кнопке в зависимости от состояния.
    setButtonText(value: boolean) {
      if (!this._button) return; // Проверяем, что кнопка существует
      this.setText(this._button, value ? 'Убрать' : 'В корзину');
    }
  
    //Изменяет состояние кнопки (активна/неактивна).
    setButtonState(value: boolean) {
      if (!this._button) return;
      this.setDisabled(this._button, !value);
    }
  }