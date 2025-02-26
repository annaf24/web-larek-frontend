// Карточка товара
export interface ICard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
}

export interface ICardWithSelection extends ICard {
  isBasket: boolean;
  isSelected: boolean;
}

// Каталог
export interface ICatalogState {
  cards: ICardWithSelection[];
}

export interface ICatalogActions {
  setCards(data: ICard[]): void;
  setSelectedCard(id: string): void;
  getAllCards(): ICardWithSelection[];
  getCardByID(id: string): ICardWithSelection | null;
  toggleCardBasketStatus(id: string): void;
  getBasketCards(): ICardWithSelection[];
  getBasketCardsID(): string[];
  getBasketItemCount(): number;
  calculateTotalBasketPrice(): number;
  clearBasket(): void;
  isCardInBasket(id: string): boolean;
  isBasketNotEmpty(): boolean;
}

// Пользователь
export interface IUser {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IUserState {
  user: IUser;
}

export interface IUserActions {
  setUserData(field: keyof IUser, value: string): void;
  getUserData(): IUser;
  clearUserData(): void;
}

// Заказ
export interface IOrder extends IUser {
  total: number;
  items: string[];
}

export interface IOrderSuccess {
  id: string;
  total: number;
}

// Вспомогательные типы
export type TCardCatalog = Omit<ICard, 'id' | 'description'>;
export type TCardPreview = Omit<ICard, 'id'>;
export type TCardBasket = Pick<ICard, 'title' | 'price'>;

export type TUserOrder = Pick<IUser, 'payment' | 'address'>;
export type TUserContacts = Pick<IUser, 'phone' | 'email'>;
