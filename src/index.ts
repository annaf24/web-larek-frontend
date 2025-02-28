import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CardsListData } from './components/Model/CardsModel';
import { UserData } from './components/Model/UserModel';
import { Basket } from './components/View/Basket';
import { CardList } from './components/View/CardList';
import { CardPreview } from './components/View/CardPreview';
import { Contacts } from './components/View/Contacts';
import { Modal } from './components/View/Modal';
import { Order } from './components/View/Order';
import { OrderSuccess } from './components/View/OrderSuccess';
import { Page } from './components/View/Page';
import { WebLarekFrontendAPI } from './components/WebLarekFrontendAPI';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// API и Event
const events = new EventEmitter();
const api = new WebLarekFrontendAPI(CDN_URL, API_URL);

// Модели данных
const cardsData = new CardsListData(events);
const userData = new UserData(events)

// Глобальные контейнеры
const pageContainer = ensureElement('.page') as HTMLElement;
const modalContainer = ensureElement('#modal-container') as HTMLElement;

const page = new Page(pageContainer, events);
const modal = new Modal(modalContainer, events);

// Темплейты
const cardListTemplate = ensureElement('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement('#card-basket') as HTMLTemplateElement;
const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;
const contactsTemplate = ensureElement('#contacts') as HTMLTemplateElement;
const orderTemplate = ensureElement('#order') as HTMLTemplateElement;
const orderSuccessTemplate = ensureElement('#success') as HTMLTemplateElement;

// Переиспользуемые части приложения
const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const orderSuccess = new OrderSuccess(cloneTemplate(orderSuccessTemplate), events);

// Получение карточек с сервера
api.getCardsAPI()
  .then(cardsData.setCards.bind(cardsData))
  .catch(err => console.error(err));

// Вывод карточек на экран
events.on('cardsListData:changed', () => {});
// Открытие карточки товара
events.on('cardList:clickCard', () => {});
// Добавление товара в корзину
events.on('cardPreview:clickButton', () => {});
// Изменение корзины (добавление товара, счетчик)
events.on('cardsListData:basketChanged', () => {});
// Открытие корзины
events.on('basket:open', () => {});
// Удаление товара из корзины
events.on('cardBasket:delete', () => {});
// Ввод данных пользователя (форма)
events.on('formValue:changed', () => {});
// Ввод данных пользователя (модель)
events.on('user:changed', () => {});
// Оформление заказа (корзина)
events.on('basketView:submit', () => {});
// Оформление заказа (заказ)
events.on('', () => {});
// Оформление заказа (контакты)
events.on('', () => {});
// Закрытие окна успешного оформления заказа
events.on('successView:close', () => {});




