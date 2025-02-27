import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";
import { IEvents } from "../base/events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;
  protected handleEscUp: (evt: KeyboardEvent) => void;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>(".modal__close", container);
    this._content = ensureElement<HTMLElement>(".modal__content", container);

    this._closeButton.addEventListener("click", () => this.close());
    this.container.addEventListener("mousedown", this.onClickOutside);

    this.handleEscUp = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") this.close();
    };
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value ?? document.createElement("div")); // ✅ Исправлено
  }

  open() {
    this.toggleClass(this.container, "modal_active", true);
    document.addEventListener("keyup", this.handleEscUp);
    this.locked(true);
    this.events.emit("modal:open");
  }

  close() {
    this.toggleClass(this.container, "modal_active", false);
    document.removeEventListener("keyup", this.handleEscUp);
    this.content = document.createElement("div");
    this.locked(false);
    this.events.emit("modal:close");
  }

  private onClickOutside = (evt: MouseEvent) => {
    if (evt.target === this.container) this.close();
  };

  locked(value: boolean) {
    this.toggleClass(this.container, "page__wrapper_locked", value);
  }

  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}
