import { ICard, ICardWithSelection, ICardsListActions, ICardsListState } from '../../types';
import { IEvents } from '../base/events';
import { Model } from '../base/Model';

export class CardsListData extends Model<ICardsListState> implements ICardsListActions {
  protected cards: ICardWithSelection[];

  constructor(events: IEvents, data: Partial<ICardsListState> = { cards: [] }) {
    super(data, events);
    this.cards = data.cards;
  }

  // Устанавливает новые карточки каталога, добавляя свойства выбора и корзины.
  setCards(cardsData: ICard[]): void {
    this.cards = cardsData.map(card => ({
      ...card,
      isBasket: false,
      isSelected: false
    }));
    this.emitChanges('cardsListData:changed');
  }

  // Делает указанную карточку выбранной, сбрасывая выбор у остальных
  setSelectedCard(id: string): void {
    this.cards.forEach(card => card.isSelected = false);
    const card = this.getCardByID(id);
    if (card) {
      card.isSelected = true;
      this.emitChanges('cardsListData:selectedChanged', { id });
    }
  }

  // Возвращает список всех карточек
  getAllCards(): ICardWithSelection[] {
    return this.cards;
  }

  // Ищет карточку по идентификатору. Возвращает `null`, если карточка не найдена
  getCardByID(id: string): ICardWithSelection | null {
    return this.cards.find(card => card.id === id) || null;
  }

  // Переключает состояние корзины для указанной карточки
  toggleCardBasketStatus(id: string): void {
    const card = this.getCardByID(id);
    if (!card) return;

    card.isBasket = !card.isBasket;
    this.emitChanges('cardsListData:basketChanged');

    if (card.isSelected) {
      this.emitChanges('cardsListData:selectedChanged', { id });
    }
  }

  // Возвращает список карточек, находящихся в корзине 
    getBasketCards(): ICardWithSelection[] {
    return this.cards.filter(card => card.isBasket);
  }

  // Возвращает список идентификаторов карточек, находящихся в корзине
  getBasketCardsID(): string[] {
    return this.getBasketCards().map(card => card.id);
  }

  // Возвращает количество карточек в корзине
  getBasketItemCount(): number {
    return this.getBasketCards().length;
  }

  // Рассчитывает общую стоимость всех товаров в корзине
  calculateTotalBasketPrice(): number {
    const basketCards = this.getBasketCards();
    return basketCards.reduce((acc, card) => acc + card.price, 0);
  }

  //  Очищает корзину и сбрасывает выделение у всех карточек
  clearBasket(): void {
    this.cards.forEach(card => {
      card.isBasket = false;
      card.isSelected = false;
    });
    this.emitChanges('cardsListData:basketChanged');
  }

  // Проверяет, находится ли карточка в корзине
  isCardInBasket(id: string): boolean {
    const card = this.getCardByID(id);
    return !!card && card.isBasket;
  }

  // Проверяет, есть ли в корзине хотя бы один товар
  isBasketNotEmpty(): boolean {
    return this.getBasketItemCount() > 0;
  }
}
