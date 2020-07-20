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
			for (let key in timer) {
				if (String(timer[key]).length === 1) {
					timer[key] = '0' + timer[key];
				}
			}
			if (timer.timeRemaining <= 0) {
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
		const menu = document.querySelector('menu'),
					closeBtn = menu.querySelector('.close-btn');

		const handlerMenu = (event) => {
			const target = event.target;
			if (target.closest('.menu') || target === closeBtn || target.closest('menu li > a') || (menu.classList.contains('active-menu') && !target.closest('menu'))) {
				menu.classList.toggle('active-menu');
			}
		};
		document.body.addEventListener('click', (event) => {
			handlerMenu(event);
		});
	};

	//scroll
	const scrollWindow = () => {
		let interval;
		const slowScroll = (event) => {
			if(!event.target.matches('main a, menu a')) {
				return;
			}
			const target = event.target.closest('main a') || event.target.closest('menu a');
			const block = document.querySelector(target.attributes.href.textContent);
			const animation = () => {
				document.documentElement.scrollTop += 10;
				if (document.documentElement.scrollTop >= block.offsetTop) {
					clearInterval(interval);
				}
			};
			interval = setInterval(animation, 10);
		};
		document.addEventListener('click', (event) => {
			if(event.target.closest('a')) {
				event.preventDefault();
				slowScroll(event);
			}
		});
	};

	//popup
	const toglePopup = () => {
		const popup = document.querySelector('.popup'),
					popupBtn = document.querySelectorAll('.popup-btn'),
					popupContent = popup.querySelector('.popup-content');
		let alfa = 0;
		let rotate = 50;

		const popupAnimation = () => {
			const animation = () => {
				popup.style.display = 'inline-block';
				alfa = (alfa * 10 + 1) / 10;
				rotate -= 5;
				popupContent.style.transform = `rotate(${rotate}deg) translateX(-50px)`;
				popup.style.opacity = alfa;
				if (alfa === 1) {
					clearInterval(interval);
					alfa = 0;
					rotate = 50;
				}
			};
			
			const interval = setInterval(animation, 40);
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

	//слайдер
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
					btn = document.querySelectorAll('.portfolio-btn'),
					portfolioDots = document.querySelector('.portfolio-dots'),
					slider = document.querySelector('.portfolio-content');
		
		let currentSlide = 0,
		interval;

		const dotRender = () => {
			slide.forEach(() => {
				portfolioDots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
				// <li class="dot dot-active"></li>
			});
		};
		dotRender();
		const dot = document.querySelectorAll('.dot');

		const prevSlide = (item, index, strClass) => {
			item[index].classList.remove(strClass);

		};

		const nextSlide = (item, index, strClass) => {
			item[index].classList.add(strClass);

		}

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if(currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};
		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};
		const stopSlide = () => {
			clearInterval(interval);
		};
		slider.addEventListener('click', (event) => {
			event.preventDefault();
			const target = event.target;

			if (!target.matches('#arrow-right, #arrow-left, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((item, index) => {
					if (item === target) {
						currentSlide = index;
					}
				});
			}
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});
		slider.addEventListener('mouseover', (event) => {
			if (!event.target.matches('#arrow-right, #arrow-left, .dot')) {
				return;
			}
			stopSlide();
		});
		slider.addEventListener('mouseout', (event) => {
			if (!event.target.matches('#arrow-right, #arrow-left, .dot')) {
				return;
			}
			startSlide();
		});
		startSlide(1500);
	};
	toggleMenu();
	scrollWindow();
	toglePopup();
	tabs();
	slider();
});