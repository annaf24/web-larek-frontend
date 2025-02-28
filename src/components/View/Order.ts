import { TUserOrder } from '../../types';
import { ensureAllElements } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from './Form';

export class UserOrder extends Form<TUserOrder> {
  protected paymentButton: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    
    // Получаем все кнопки оплаты
    this.paymentButton = ensureAllElements<HTMLButtonElement>(`.button_alt`, this.container);

    // Добавляем обработчик событий для всех кнопок оплаты
    this.paymentButton.forEach(button => {
      button.addEventListener('click', () => this.handlePaymentClick(button.name));
    });
  }

  // Обрабатываем нажатие на кнопку оплаты
  // payment - Название выбранного метода оплаты
  protected handlePaymentClick(payment: string): void {
    this.onInputChange('payment', payment);
  }

  // Устанавливаем активную кнопку оплаты
  set payment(value: string) {
    this.paymentButton.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === value);
    });
  }

  // Устанавливаем значение адреса в поле формы
  set address(value: string) {
    const addressInput = this.container.elements.namedItem('address') as HTMLInputElement;
    if (addressInput) {
      addressInput.value = value;
    } else {
      console.warn('Address input field not found in form.');
    }
  }
}
