import { IOrderSuccess } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/components';
import { IEvents } from '../base/events';

export class OrderSuccess extends Component<IOrderSuccess> {
  protected _total: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    // Находим инициализированные элементы в DOM
    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    // Добавляем обработчик клика для закрытия окна
    this.button.addEventListener('click', this.handleClose);
  }

  // Геттер для установки отображаемой суммы списанных синапсов
  set total(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }

  // Обработчик закрытия окна, который передает событие в EventEmitter
  private handleClose = (): void => {
    this.events.emit('successView:close');
  };
}