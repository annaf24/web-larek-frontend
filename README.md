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

#### Карточка товара
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

## Описание классов
### Описание базовых классов

#### Api
Класс `Api` предназначен для взаимодействия с REST API. Он предоставляет методы для выполнения GET- и POST-запросов, а также обработку ответов.

### Методы класса
- `constructor(baseUrl: string, options?: RequestInit)`  
  Конструктор принимает базовый URL API и опциональные настройки запроса (`RequestInit`).  
  - `baseUrl: string` – базовый адрес API.  
  - `options?: RequestInit` – дополнительные параметры для запроса.  

- `protected handleResponse<T>(response: Response): Promise<T>`  
  Метод обрабатывает HTTP-ответ и возвращает результат в формате JSON, либо выбрасывает ошибку.  
  - `response: Response` – объект ответа от сервера.  
  - Возвращает `Promise<T>` с JSON-данными или ошибкой.

- `get<T>(uri: string): Promise<T>`  
  Выполняет GET-запрос к API.  
  - `uri: string` – относительный путь к ресурсу.  
  - Возвращает `Promise<T>` с данными ответа.

- `post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>`  
  Выполняет POST, PUT или DELETE запрос с передачей данных.  
  - `uri: string` – относительный путь к ресурсу.  
  - `data: object` – отправляемые данные.  
  - `method?: ApiPostMethods` – HTTP-метод (`POST`, `PUT`, `DELETE`), по умолчанию `POST`.  
  - Возвращает `Promise<T>` с данными ответа.

---

#### Component
Абстрактный класс `Component<T>` предназначен для создания UI-компонентов, работающих с DOM. Он содержит набор вспомогательных методов для работы с элементами интерфейса.

### Методы класса
- `constructor(protected readonly container: HTMLElement)`  
  Конструктор принимает корневой DOM-элемент компонента.  
  - `container: HTMLElement` – корневой элемент компонента.

- `toggleClass(element: HTMLElement, className: string, force?: boolean)`  
  Добавляет или удаляет CSS-класс у элемента.  
  - `element: HTMLElement` – целевой элемент.  
  - `className: string` – класс для переключения.  
  - `force?: boolean` – принудительное добавление (`true`) или удаление (`false`).

- `protected setText(element: HTMLElement, value: unknown)`  
  Устанавливает текстовое содержимое элемента.  
  - `element: HTMLElement` – целевой элемент.  
  - `value: unknown` – значение, которое будет преобразовано в строку.

- `setDisabled(element: HTMLElement, state: boolean)`  
  Блокирует или разблокирует элемент.  
  - `element: HTMLElement` – целевой элемент.  
  - `state: boolean` – `true`, если элемент должен быть заблокирован.

- `protected setHidden(element: HTMLElement)`  
  Скрывает элемент (`display: none`).  
  - `element: HTMLElement` – целевой элемент.

- `protected setVisible(element: HTMLElement)`  
  Показывает ранее скрытый элемент.  
  - `element: HTMLElement` – целевой элемент.

- `protected setImage(element: HTMLImageElement, src: string, alt?: string)`  
  Устанавливает изображение и альтернативный текст.  
  - `element: HTMLImageElement` – целевой элемент изображения.  
  - `src: string` – URL изображения.  
  - `alt?: string` – альтернативный текст (необязательно).

- `render(data?: Partial<T>): HTMLElement`  
  Отрисовывает компонент с обновлением данных.  
  - `data?: Partial<T>` – обновленные данные.  
  - Возвращает корневой DOM-элемент компонента.

---

#### EventEmitter
Класс `EventEmitter` реализует паттерн «Издатель-Подписчик» (Event Broker). Позволяет подписываться на события, вызывать их и управлять подписчиками.

### Методы класса
- `constructor()`  
  Создает пустой реестр событий.

- `on<T extends object>(eventName: EventName, callback: (event: T) => void)`  
  Регистрирует обработчик на указанное событие.  
  - `eventName: EventName` – название события (`string` или `RegExp`).  
  - `callback: (event: T) => void` – функция-обработчик.

- `off(eventName: EventName, callback: Subscriber)`  
  Удаляет подписку на событие.  
  - `eventName: EventName` – название события.  
  - `callback: Subscriber` – обработчик, который нужно удалить.

- `emit<T extends object>(eventName: string, data?: T)`  
  Генерирует событие и передает данные подписчикам.  
  - `eventName: string` – имя события.  
  - `data?: T` – дополнительные данные (необязательно).

- `onAll(callback: (event: EmitterEvent) => void)`  
  Регистрирует обработчик для всех событий.  
  - `callback: (event: EmitterEvent) => void` – обработчик события.

- `offAll()`  
  Удаляет все подписки на события.

- `trigger<T extends object>(eventName: string, context?: Partial<T>)`  
  Создает функцию-триггер, которая при вызове автоматически инициирует событие.  
  - `eventName: string` – имя события.  
  - `context?: Partial<T>` – дополнительные данные.  
  - Возвращает функцию, которая вызывает событие при выполнении.

---

#### Model
###### Характеристика класса `Model<T>`
Абстрактный класс `Model<T>` представляет собой базовую модель данных. Используется для хранения данных и их обновления с последующим уведомлением подписчиков.

### Методы класса
- `constructor(data: Partial<T>, protected events: IEvents)`  
  Инициализирует модель данными и системой событий.  
  - `data: Partial<T>` – объект с начальными данными.  
  - `events: IEvents` – экземпляр `EventEmitter`.

- `emitChanges(event: string, payload?: object)`  
  Уведомляет подписчиков об изменении данных.  
  - `event: string` – название события.  
  - `payload?: object` – дополнительные данные (необязательно).

### Гард-функция
- `isModel(obj: unknown): obj is Model<any>`  
  Проверяет, является ли объект экземпляром `Model`.  
  - `obj: unknown` – проверяемый объект.  
  - Возвращает `true`, если объект является моделью.


### Описание базовых классов
####
####
####
####
### Описание классов моделей данных
### Описание классов представления



