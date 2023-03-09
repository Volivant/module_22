const btn = document.querySelector('.j-btn-test');
const coordsLocation = document.querySelector('.status');
const screenResolution = document.querySelector('.screen-resolution');

// Функция, выводящая текст об ошибке
const error = () => {
    coordsLocation.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    coordsLocation.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

btn.addEventListener('click', () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    
    screenResolution.textContent = `Разрешение экрана: Ширина ${screenWidth} px, Высота: ${screenHeight} px`;
    
    if (!navigator.geolocation) {
        coordsLocation.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        coordsLocation.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});