import { IUser, IUserState, IUserActions } from '../../types';
import { IEvents } from '../base/events';
import { Model } from '../base/Model';

export class UserData extends Model<IUserState> implements IUserActions {
  protected order: IUser = {
    email: '',
    phone: '',
    address: '',
    payment: '',
  };
  protected formErrors: Record<string, string> = {};

  constructor(events: IEvents) {
    super({}, events);  // Инициализация базового класса (передаем пустой объект данных)
  }

  getUserData(): IUser {
    return { ...this.order };
  }

  setUserData(field: keyof IUser, value: string): void {
    this.order[field] = value;
    this.validateError();  // Проверка ошибок при изменении поля
    this.emitChanges('user:changed', this.formErrors);  // Эмитим изменения
  }

  validForm(data: string[]): boolean {
    return data.some((i) => i === '');  // Проверка, если есть пустые поля
  }

  // Валидация 
  validateError(): void {
    this.formErrors = {};  // Очищаем ошибки перед новой проверкой

    if (!this.order.email) {
      this.formErrors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      this.formErrors.phone = 'Необходимо указать телефон';
    }
    if (!this.order.address) {
      this.formErrors.address = 'Необходимо указать адрес';
    }
    if (!this.order.payment) {
      this.formErrors.payment = 'Необходимо выбрать способ оплаты';
    }

    // После проверки ошибок эмитим их
    this.emitChanges('formErrors:change', this.formErrors);
  }

  // Очистка полей ввода
  clearUserData(): void {
    this.order = {
      email: '',
      phone: '',
      address: '',
      payment: '',
    };
    this.formErrors = {};  // Очищаем ошибки
    this.emitChanges('user:changed', this.formErrors);  // Эмитим событие об очищении
  }
}
