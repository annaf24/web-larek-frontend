# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Описание типов данных
### Описание типов данных

#### **Карточка товара**
- `ICard` – базовый интерфейс, описывающий товар:
  - `id: string` – уникальный идентификатор товара.
  - `title: string` – название товара.
  - `description: string` – описание товара.
  - `image: string` – URL изображения товара.
  - `category: string` – категория товара.
  - `price: number | null` – цена товара (может быть `null`, если цена не указана).

- `ICardWithSelection` – расширенный интерфейс карточки товара, добавляющий информацию о статусе выбора:
  - `isBasket: boolean` – находится ли товар в корзине.
  - `isSelected: boolean` – выбран ли товар.

#### Каталог товаров
- `ICardsListState` – состояние каталога:
  - `cards: ICardWithSelection[]` – список всех товаров с возможностью выбора.

- `ICardsListActions` – методы управления каталогом:
  - `setCards(data: ICard[]): void` – установка списка товаров.
  - `setSelectedCard(id: string): void` – выбор товара.
  - `getAllCards(): ICardWithSelection[]` – получение всех товаров.
  - `getCardByID(id: string): ICardWithSelection | null` – получение товара по ID.
  - `toggleCardBasketStatus(id: string): void` – добавление/удаление товара из корзины.
  - `getBasketCards(): ICardWithSelection[]` – получение всех товаров в корзине.
  - `getBasketCardsID(): string[]` – получение ID всех товаров в корзине.
  - `getBasketItemCount(): number` – подсчет количества товаров в корзине.
  - `calculateTotalBasketPrice(): number` – расчет общей стоимости корзины.
  - `clearBasket(): void` – очистка корзины.
  - `isCardInBasket(id: string): boolean` – проверка, находится ли товар в корзине.
  - `isBasketNotEmpty(): boolean` – проверка, есть ли товары в корзине.

#### Пользователь
- `IUser` – интерфейс пользователя:
  - `payment?: string` – информация об оплате.
  - `email?: string` – электронная почта.
  - `phone?: string` – номер телефона.
  - `address?: string` – адрес доставки.

- `IUserState` – состояние пользователя:
  - `user: IUser` – данные пользователя.

- `IUserActions` – методы управления пользователем:
  - `setUserData(field: keyof IUser, value: string): void` – установка данных пользователя.
  - `getUserData(): IUser` – получение данных пользователя.
  - `clearUserData(): void` – очистка данных пользователя.

#### Заказ
- `IOrder` – данные заказа, включающие информацию о пользователе:
  - `total: number` – итоговая сумма заказа.
  - `items: string[]` – список ID товаров в заказе.

- `IOrderSuccess` – данные успешного заказа:
  - `id: string` – идентификатор заказа.
  - `total: number` – итоговая сумма заказа.

#### Вспомогательные типы
- `TCardCatalog` – карточка товара без `id` и `description`.
- `TCardPreview` – карточка товара без `id`.
- `TCardBasket` – только название (`title`) и цена (`price`) товара.
- `TUserOrder` – только платежные и адресные данные пользователя.
- `TUserContacts` – только контактные данные пользователя (`phone` и `email`).

## Описание базовых классов

