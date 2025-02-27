import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CardsListData } from './components/Model/CardsModel';
import { UserData } from './components/Model/UserModel';
import { Modal } from './components/View/Modal';
import { Page } from './components/View/Page';
import { WebLarekFrontendAPI } from './components/WebLarekFrontendAPI';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';

// API и Event
const events = new EventEmitter();
const api = new WebLarekFrontendAPI(CDN_URL, API_URL);

// Модели данных
const cardsData = new CardsListData(events);
const userData = new UserData(events)

// Глобальные контейнеры
const pageContainer = ensureElement('page') as HTMLElement;
const modalContainer = ensureElement('#modal-container') as HTMLElement;

const page = new Page(pageContainer, events);
const modal = new Modal(modalContainer, events);


// Переиспользуемые части приложения
// const cardPreview
// const basket
// const order
// const contacts 
// const orderSuccess

// Получение карточек с сервера
// api.getCardsAPI()
// .then(card => {
//     cardsData.cards = card;
    
//   })
//   .catch(err => {
//       console.error(err);
//   });
//   .then(cardList.setCards.bind(cardList))
//   .catch(err => console.error(err));

// Вывод карточек на экран




