const btn = document.querySelector('.j-btn-test');
const timeZone = document.querySelector('.timezone');
const localDateTime = document.querySelector('.local-date-time');

// Функция, выводящая текст об ошибке
const error = () => {
    timeZone.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    //console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
    .then((response) => {
        // Объект ответа на запрос
        //console.log('response', response);
        // Превращаем объект в JSON. Мы не можем его сразу прочитать,
        // надо отдать в следующий then
        const result = response.json();
        //console.log('result', result);
        return result;
    })
    .then((data) => {
        // Объект результата в формате JSON
        //console.log(data);
        timeZone.textContent = `Ваш часовой пояс ${data.timezone}`;
        localDateTime.textContent = `Местная дата и время ${data.date_time_txt}`;
    })
    .catch(() => { console.log('error') });
}

btn.addEventListener('click', () => {
    
    if (!navigator.geolocation) {
        timeZone.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        timeZone.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});