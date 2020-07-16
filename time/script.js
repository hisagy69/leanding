'use strict';

const wrap = document.querySelector('.wrap');

const showMessage = (message) => {
	wrap.insertAdjacentHTML('beforeend', `<p>${message}</p>`);
};

const dateGen = () => {
	const timesDay = ['утро', 'день', 'вечер', 'ночи'],
				dayWeek = ['Воскресенье', 'Понедельник', 
										'Вторник', 'Среда', 'Четверг', 
										'Пятница', 'Суббота'];
	
			const date = new Date(),

				week = date.getDay(),
				hours = date.getHours(),
				localWatch = date.toLocaleTimeString('en-US');
	wrap.textContent = '';

	const endWordDay = (hours <= 11 && hours >= 4) ?
	'ое ' +  timesDay[0] : (hours >= 11 && hours <= 14) ? 
	'ый ' + timesDay[1] : (hours >= 15 && hours <= 22) ? 
	'ый ' + timesDay[2] : 'ой ' + timesDay[3];

	showMessage('Добр' + endWordDay);
	showMessage('Сегодня: ' + dayWeek[week]);
	showMessage('Текущее время ' + localWatch);
	showMessage('До нового года осталось ' + (Math.floor(Math.floor(Date.now() / 1000) / 60 / 60 / 24) % 365)  + ' дней');
}

setInterval(dateGen, '1000');