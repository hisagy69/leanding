window.addEventListener('DOMContentLoaded', () => {
	'use strict';
	//Timer
	const countTimer = (deadline) => {
		const timerHours = document.getElementById('timer-hours'),
					timerMinutes = document.getElementById('timer-minutes'),
					timerSeconds = document.getElementById('timer-seconds');

		const getTimeRemaining = () => {
			const dateStop = new Date(deadline).getTime(),
					dateNow = new Date().getTime(),
					timeRemaining = (dateStop - dateNow) / 1000,
					seconds = Math.floor(timeRemaining % 60),
					minutes = Math.floor((timeRemaining / 60) % 60),
					hours = Math.floor(timeRemaining / 60 / 60) % 24;
					return { timeRemaining, hours, minutes, seconds };
		}
		
		const updateClock = () => {
			const timer = getTimeRemaining();
			for(let key in timer) {
				if(String(timer[key]).length === 1) {
					timer[key] = '0' + timer[key];
				}
			}
			if(timer.timeRemaining <= 0) {
				timer.hours = '00';
				timer.minutes = '00';
				timer.seconds = '00';
				clearInterval(time);
			}
			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;
		}
		const time = setInterval(updateClock);
	};
	countTimer('01 july 2021');

	//menu
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
					menu = document.querySelector('menu'),
					closeBtn = menu.querySelector('.close-btn');

		const handlerMenu = (event) => {
			const target = event.target;
			if (target === btnMenu || target === closeBtn || target.closest('menu > li')) {
				menu.classList.toggle('active-menu');
			}
		}

		btnMenu.addEventListener('click', (event) => {
			handlerMenu(event);
		});
		menu.addEventListener('click', (event) => {
			handlerMenu(event);
		});
	};

	//popup
	const toglePopup = () => {
		const popup = document.querySelector('.popup'),
					popupBtn = document.querySelectorAll('.popup-btn'),
					popupContent = popup.querySelector('.popup-content');
		let alfa = 0;
		let rotate = 45;

		const popupAnimation = () => {
			popup.style.display = 'inline-block';
			const animation = () => {
				popup.style.opacity = alfa;
				alfa = (alfa * 10 + 1) / 10;
				if(alfa === 1) {
					clearInterval(interval);
					alfa = 0;
				}
			};
			const translated = () => {
				rotate--;
				popupContent.style.transform = `rotate(${rotate}deg)`;
				if (rotate === 0) {
					rotate = 45;
					clearInterval(intervalTranslate);
				}
			};
			const interval = setInterval(animation, 50);
			const intervalTranslate = setInterval(translated, 20);
		};

		popupBtn.forEach((item) => {
			item.addEventListener('click', () => {
				if (screen.width > 768) {
					popupAnimation();
				} else {
					popup.style.display = 'inline-block';
				}
			});
		});

		popup.addEventListener('click', (event) => {
			const target = event.target;
			if(!target.closest('.popup-content') || target.closest('.popup-close')) {
				popup.style.opacity = '';
				popup.style.display = '';
			}
		});
	};

	//табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
					tab = document.querySelectorAll('.service-header-tab'),
					tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = (index) => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tabContent[i].classList.add('d-none');
					tab[i].classList.remove('active');
				}
			}
		};

		tabHeader.addEventListener('click', (event) => {
			const target = event.target.closest('.service-header-tab');
				if (target) {
					tab.forEach((item, i) => {
						if (item === target) {
							toggleTabContent(i);
						}
					});
				}
		});
	};
	toggleMenu();
	toglePopup();
	tabs();
});