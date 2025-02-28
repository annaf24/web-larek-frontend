import { ensureElement } from '../../utils/utils';
import { Component } from '../base/components';
import { IEvents } from '../base/events';

export interface IFormState {
  valid: boolean;
  errors: string[]; // Используем массив ошибок
}

export class Form<T> extends Component<IFormState> {
  protected submit: HTMLButtonElement;
  protected _errors: HTMLSpanElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.submit = ensureElement('button[type=submit]', this.container) as HTMLButtonElement;
    this._errors = ensureElement('.form__errors', this.container) as HTMLSpanElement;

    this.container.addEventListener('input', this.handleInput);
    this.container.addEventListener('submit', this.handleSubmit);
  }

  protected handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.name) return; // Пропускаем элементы без имени

    this.onInputChange(target.name as keyof T, target.value);
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit('formValue:changed', { field, value });
  }

  protected handleSubmit = (event: Event) => {
    event.preventDefault();
    const formName = this.container.name || 'unknown'; // Защита от пустого имени формы
    this.events.emit(`${formName}form:submit`);
  }

  set valid(isValid: boolean) {
    this.setDisabled(this.submit, !isValid);
  }

  set errors(errors: string[]) {
    this.setText(this._errors, errors.join('\n')); // Объединяем ошибки в строку
  }

  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });

    Object.entries(inputs).forEach(([key, value]) => {
      const input = this.container.elements.namedItem(key);
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.value = value as string;
      }
    });

    return this.container;
  }
}
