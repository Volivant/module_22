const chatUrl = "wss://echo-ws-service.herokuapp.com/";

const btnSend = document.querySelector('.input-message-send');
const btnGeo = document.querySelector('.input-message-geo');

// функция вставки сообщения в окно
insertMessage = function(type, message) {
    const containerMessages = document.querySelector('.container-messages'); // указатель на блок с сообщениями
    const divMessage = document.createElement('div');// создаем сообщение
    divMessage.classList.add('message'); // присваиваем класс
    divMessage.classList.add(type);// присваиваем класс указывающий на тип сообщения
    divMessage.innerHTML = message;
    containerMessages.prepend(divMessage); // вставляем сообщение
}

insertMessage('receive-message', "Устанавливаю соединение...");
//соединение с сервером
let websocket = new WebSocket(chatUrl);

websocket.onopen = function(evt) {
    insertMessage('receive-message', "Соединение установлено");
};

websocket.onmessage = function(evt) {
    insertMessage('receive-message', evt.data);
};

// отправка сообщения
btnSend.addEventListener('click', () => {
    const textMessage = document.querySelector('.input-message-input'); // указатель на поле ввода
    websocket.send(textMessage.value);
    insertMessage('send-message', textMessage.value);
});

// закрытие соединения с сервером
window.onclose = function() {
    websocket.close();
    websocket = null;
};

// получение гео-локации
// Функция, выводящая текст об ошибке
const error = () => {
    insertMessage('receive-message', 'Невозможно получить ваше местоположение');
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    insertMessage('receive-message', `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Ваше местоположение</a>`);
}

btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        insertMessage('receive-message', 'Geolocation не поддерживается вашим браузером');
    } else {
        insertMessage('receive-message', 'Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
