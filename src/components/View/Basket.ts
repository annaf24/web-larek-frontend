import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/components";
import { EventEmitter } from "../base/events";

// Структура данных корзины
interface IBasket {
    items: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected totalPriceElement: HTMLElement;
    protected buttonOrderElement: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonOrderElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.buttonOrderElement.addEventListener('click', () => {
            this.events.emit('basketView:submit');
        });

        // Очистка корзины при создани
        this.items = [];
    }

    // Сеттер обновления списка товаров
    // Если массив items не пустой очищаем listItem и добавляем товары
    // Включаем кнопку
    // Если корзина пуста
    // Очищаем listElement и добавляем текст "Корзина пуста"
    // Отключаем кнопку (this.isButtonEnabled = false)
    set items(items: HTMLElement[]) {   
        if (items.length) {
            this.listElement.replaceChildren(...items);
            this.isButtonEnabled = true;
        } else {
            this.listElement.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this.isButtonEnabled = false;
        }
    }

    // Сеттер обновления суммы
    set total(value: number) {
        this.totalPriceElement.textContent = `${value} синапсов`;
    }

    // Сеттер управления кнопкой
    // Если value === true, кнопка становится активной
    // Если value === false, кнопка блокируется
    set isButtonEnabled(value: boolean) {
        this.setDisabled(this.buttonOrderElement, !value);
    }
}
