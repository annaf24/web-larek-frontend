import { ICard } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";


export class Card<T> extends Component<ICard> {
    protected _id: string;
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this._title = ensureElement('.card__title', this.container) as HTMLElement;
        this._price = ensureElement('.card__price', this.container) as HTMLElement;
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set price(value: number | null) {
        this.setText(this._price, value ? `${value} синапсов` : `Бесценно`);
    }

    set description(value: string | string[]) {
        if (Array.isArray(value)) {
            this._description.replaceWith(...value.map(str => {
                const descTemplate = this._description.cloneNode() as HTMLElement;
                this.setText(descTemplate, str);
                return descTemplate;
            }));
        } else {
            this.setText(this._description, value);
        }
    }
}