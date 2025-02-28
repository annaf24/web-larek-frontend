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

---

## Описание классов
## Описание базовых классов

#### Api
Класс `Api` предназначен для взаимодействия с REST API. Он предоставляет методы для выполнения GET- и POST-запросов, а также обработку ответов.

#### Методы класса
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

### Component
Абстрактный класс `Component<T>` предназначен для создания UI-компонентов, работающих с DOM. Он содержит набор вспомогательных методов для работы с элементами интерфейса.

#### Методы класса
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

### EventEmitter
Класс `EventEmitter` реализует паттерн «Издатель-Подписчик» (Event Broker). Позволяет подписываться на события, вызывать их и управлять подписчиками.

#### Методы класса
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

### Model
Абстрактный класс `Model<T>` представляет собой базовую модель данных. Используется для хранения данных и их обновления с последующим уведомлением подписчиков.

#### Методы класса
- `constructor(data: Partial<T>, protected events: IEvents)`  
  Инициализирует модель данными и системой событий.  
  - `data: Partial<T>` – объект с начальными данными.  
  - `events: IEvents` – экземпляр `EventEmitter`.

- `emitChanges(event: string, payload?: object)`  
  Уведомляет подписчиков об изменении данных.  
  - `event: string` – название события.  
  - `payload?: object` – дополнительные данные (необязательно).

#### Гард-функция
- `isModel(obj: unknown): obj is Model<any>`  
  Проверяет, является ли объект экземпляром `Model`.  
  - `obj: unknown` – проверяемый объект.  
  - Возвращает `true`, если объект является моделью.

### Описание классов моделей данных

### CardsListData (Модель списка карточек товаров)
Класс `CardsListData` отвечает за хранение и управление списком карточек товаров, включая их выбор и добавление в корзину.
Наследуется от `Model<ICardsListState>` и реализует интерфейс `ICardsListActions`. Использует события для информирования об изменениях в данных.

#### Методы
- `setCards(cardsData: ICard[]): void`  
   Устанавливает новый список карточек, добавляя флаги `isBasket` (товар в корзине) и `isSelected` (товар выбран).

- `setSelectedCard(id: string): void`  
   Делает указанную карточку выбранной, сбрасывая выбор у остальных.

- `getAllCards(): ICardWithSelection[]`  
   Возвращает список всех карточек.

- `getCardByID(id: string): ICardWithSelection | null`  
   Ищет карточку по ID и возвращает её или `null`, если карточка не найдена.

- `toggleCardBasketStatus(id: string): void`  
   Переключает флаг `isBasket` (добавляет/удаляет из корзины).

- `getBasketCards(): ICardWithSelection[]`  
   Возвращает список карточек, находящихся в корзине.

- `getBasketCardsID(): string[]`  
   Возвращает список ID карточек, находящихся в корзине.

- `getBasketItemCount(): number`  
   Возвращает количество товаров в корзине.

- `calculateTotalBasketPrice(): number`  
   Рассчитывает общую стоимость всех товаров в корзине.

- `clearBasket(): void`  
    Очищает корзину, сбрасывая все товары.

- `isCardInBasket(id: string): boolean`  
    Проверяет, находится ли товар в корзине.

- `isBasketNotEmpty(): boolean`  
    Проверяет, есть ли в корзине хотя бы один товар.

---

### UserData (Модель данных пользователя)
Класс `UserData` управляет данными пользователя, включая контактную информацию и данные для оформления заказа.
Наследуется от `Model<IUserState>` и реализует интерфейс `IUserActions`. Поддерживает валидацию данных.

##### Методы
- `getUserData(): IUser`  
   Возвращает текущие данные пользователя.

- `setUserData(field: keyof IUser, value: string): void`  
   Устанавливает значение указанного поля и запускает валидацию.

- `validForm(data: string[]): boolean`  
   Проверяет, есть ли пустые поля в переданном массиве данных.

- `validateError(): void`  
   Проверяет, заполнены ли все поля пользователя. Если есть ошибки, сохраняет их в `formErrors` и эмитит событие.

- `clearUserData(): void`  
   Очищает данные пользователя и ошибки валидации.

### Описание классов представления
---

### `Modal` (Модальное окно)
Этот класс управляет модальным окном, обеспечивая его открытие, закрытие и взаимодействие с пользователем.
Наследуется от `Component<IModal>`. Реализует механику открытия и закрытия модального окна. Поддерживает закрытие при клике на фон или на кнопку "Escape".
Работает с системой событий.

#### Методы:
- `open()`  
   - Отображает модальное окно (`modal_active`).
   - Добавляет обработчик `keyup` для закрытия по Escape.
   - Блокирует страницу (`page__wrapper_locked`).
   - Эмитит событие `"modal:open"`.

- `close()`  
   - Закрывает модальное окно.
   - Удаляет обработчик `keyup`.
   - Очищает контент (`this.content`).
   - Разблокирует страницу.
   - Эмитит событие `"modal:close"`.

- `set content(value: HTMLElement)`  
   - Устанавливает переданный элемент в содержимое модального окна.

- `onClickOutside(evt: MouseEvent)`  
   - Закрывает модальное окно при клике вне его границ.

- `locked(value: boolean)`  
   - Блокирует (`true`) или разблокирует (`false`) страницу.

- `render(data: IModal)`  
   - Отрисовывает переданные данные и открывает модальное окно.

---

### `Form<T>` (Форма)
Этот класс управляет формой, включая ввод данных, валидацию и отправку.
Наследуется от `Component<IFormState>`. Поддерживает события изменения данных и отправки формы.
Обрабатывает ошибки валидации.

#### Методы:
- `handleInput(event: Event)`  
   - Слушает ввод данных и передаёт изменения в события.

- `onInputChange(field: keyof T, value: string)`  
   - Эмитит событие `"formValue:changed"`, передавая изменённое поле.

- `handleSubmit(event: Event)`  
   - Отменяет стандартную отправку формы.
   - Отправляет событие формы `"formNameform:submit"`.

- `set valid(isValid: boolean)`  
   - Включает/выключает кнопку отправки.

- `set errors(errors: string[])`  
   - Отображает ошибки формы.

- `render(state: Partial<T> & IFormState)`  
   - Отрисовывает переданные данные и ошибки.
   - Заполняет форму значениями.

---

### `Card<T>` (Карточка товара)
Отвечает за представление карточки товара, включая отображение названия, цены и описания.
 Наследуется от `Component<ICard>`. Позволяет динамически обновлять данные карточки.

#### Методы:
- `set id(value: string) / get id()`  
   - Устанавливает и получает `id` карточки через `dataset`.

- `set title(value: string) / get title()`  
   - Устанавливает и получает название товара.

- `set price(value: number | null)`  
   - Устанавливает цену товара. Если `null`, отображает `Бесценно`.

- `set description(value: string | string[])`  
   - Устанавливает описание. Поддерживает массив строк для многострочного описания.

---

### `Basket` (Корзина)
Этот класс отвечает за отображение корзины покупок и управление товарами внутри неё.
Наследуется от `Component<IBasket>`. Управляет списком товаров и общей суммой корзины. Обеспечивает кнопку оформления заказа.
Реагирует на нажатие кнопки заказа (`basketView:submit`).

#### Методы:
- `set items(items: HTMLElement[])`  
   - Устанавливает список товаров в корзине.  
   - Если товары есть – отображает их, если нет – выводит сообщение `"Корзина пуста"`.

- `set total(value: number)`  
   - Обновляет общую сумму товаров.

- `set isButtonEnabled(value: boolean)`  
   - Активирует или деактивирует кнопку заказа.

---

### `CardBasket` (Карточка в корзине)
Расширяет `Card`, представляя товар в корзине.
Наследуется от `Card<TCardBasket>`. Добавляет индекс элемента в корзине.
Позволяет удалять товар (`cardBasket:delete`).

#### Методы:
- `setIndex(value: number): this`  
   - Устанавливает порядковый номер товара в корзине.

---

### `CardList` (Карточка в каталоге)
Расширяет `Card`, представляя товар в каталоге.
Наследуется от `Card<TCardCatalog>`. Добавляет изображение, категорию и кнопку.

#### Методы:
- `set category(value: string)`  
   - Устанавливает категорию товара и применяет соответствующий CSS-класс.

- `set image(value: string)`  
   - Устанавливает изображение товара.

- События клика:  
   - Если клик по кнопке – эмитит `"cardPreview:clickButton"`.  
   - Если клик по карточке – эмитит `"cardList:clickCard"`.

---

### `CardPreview` (Карточка предпросмотра)
Расширяет `CardList`, добавляя описание товара и управление кнопкой.
Наследуется от `CardList`. Добавляет текстовое описание товара.
Управляет кнопкой (меняет текст и активность).

#### Методы:
- `set description(value: string)`  
   - Устанавливает описание товара.

- `setButtonText(value: boolean)`  
   - Изменяет текст кнопки: `"Убрать"` или `"В корзину"`.

- `setButtonState(value: boolean)`  
   - Делает кнопку активной/неактивной.

---

### `Page` (Главная страница)
Управляет глобальными элементами страницы, такими как каталог и корзина.
Наследуется от `Component<IPage>`. Управляет каталогом товаров и счётчиком корзины.
Реагирует на клик по иконке корзины (`basket:open`).

#### Методы:
- `set counter(value: number)`  
   - Обновляет количество товаров в корзине.

- `set catalog(items: HTMLElement[])`  
   - Отображает список товаров в каталоге.

---

### `Contacts` (Контактные данные)
Класс отвечает за работу с формой контактных данных пользователя.
Наследуется от `Form<TUserContacts>`. Управляет полями телефона и электронной почты.

#### Методы:
- `set phone(value: string)`  
   - Устанавливает значение номера телефона в соответствующее поле формы.

- `set email(value: string)`  
   - Устанавливает значение email в соответствующее поле формы.

---

### `Order` (Форма заказа)
Класс управления формой оформления заказа.
Наследуется от `Form<TUserOrder>`. Управляет выбором метода оплаты.
Обновляет поле адреса доставки.

#### Методы:
- `handlePaymentClick(payment: string)`  
   - Обрабатывает нажатие кнопки выбора метода оплаты.  
   - Устанавливает выбранный способ оплаты.

- `set payment(value: string)`  
   - Устанавливает активную кнопку оплаты, выделяя её.

- `set address(value: string)`  
   - Устанавливает значение адреса доставки в поле формы.

---

### `OrderSuccess` (Окно успешного заказа)
Класс управления окном подтверждения успешного оформления заказа.
Наследуется от `Component<IOrderSuccess>`. Показывает итоговую сумму списанных "синапсов".
Обрабатывает закрытие окна.

#### Методы:
- `set total(value: number)`  
   - Устанавливает сумму списанных "синапсов" и обновляет отображение.

- `handleClose()`  
   - Закрывает окно и передаёт событие `"successView:close"`.


