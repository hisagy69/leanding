window.addEventListener('DOMContentLoaded', () => {
	'use strict';
	//Timer
	const countTimer = deadline => {
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

		const handlerMenu = event => {
			const target = event.target;
			if (target.closest('.menu') || target === closeBtn || target.closest('menu li > a') || (menu.classList.contains('active-menu') && !target.closest('menu'))) {
				menu.classList.toggle('active-menu');
			}
		};
		document.body.addEventListener('click', event => {
			handlerMenu(event);
		});
	};

	//scroll
	const scrollWindow = () => {
		let interval;
		const slowScroll = event => {
			if(!event.target.closest('main a') && !event.target.closest('menu li a')) {
				return;
			}
			const target = event.target.closest('main a') || event.target.closest('menu li a');
			const block = document.querySelector(target.attributes.href.textContent);
			const animation = () => {
				document.documentElement.scrollTop += 10;
				if (document.documentElement.scrollTop >= block.offsetTop) {
					clearInterval(interval);
				}
			};
			interval = setInterval(animation, 5);
		};
		document.addEventListener('click', event => {
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

		popupBtn.forEach(item => {
			item.addEventListener('click', () => {
				if (screen.width > 768) {
					popupAnimation();
				} else {
					popup.style.display = 'inline-block';
				}
			});
		});

		popup.addEventListener('click', event => {
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

		const toggleTabContent = index => {
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

		tabHeader.addEventListener('click', event => {
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
					portfolioDots = document.querySelector('.portfolio-dots'),
					slider = document.querySelector('.portfolio-content');
		
		let currentSlide = 0,
		interval;

		const dotRender = () => {
			slide.forEach(() => {
				portfolioDots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
			});
			document.querySelector('.dot').classList.add('dot-active');
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
		slider.addEventListener('click', event => {
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
		slider.addEventListener('mouseover', event => {
			if (!event.target.matches('#arrow-right, #arrow-left, .dot')) {
				return;
			}
			stopSlide();
		});
		slider.addEventListener('mouseout', event => {
			if (!event.target.matches('#arrow-right, #arrow-left, .dot')) {
				return;
			}
			startSlide();
		});
		startSlide(1500);
	};

	//command
	const commandShow = () => {
		const command = document.getElementById('command');
		let src;
	
		command.addEventListener('mouseover', event => {
			const target = event.target;
			src = target.src;
			if (target.matches('.command__photo')) {
				target.src = target.dataset.img;
			}
		});
		command.addEventListener('mouseout', event => {
			if (event.target.matches('.command__photo')) {
				event.target.src = src;
			}
		});
	};

	//калькулятор
	const  calculate = (price = 100) => {
		const	calcType = document.querySelector('.calc-type'),
					calcSquare = document.querySelector('.calc-square'),
					calcDay = document.querySelector('.calc-day'),
					totalValue = document.getElementById('total'),
					calcCount = document.querySelector('.calc-count'),
					calcBlock = document.querySelector('.calc-block');

		const calcAnimate = number => {
			let keyInterval;
			const animate = () => {
				let count;
				(number > 3000) ? count = 100 : count = 30;
				const clearAnimate = () => {
					cancelAnimationFrame(keyInterval);
					return;
				};
				if (+totalValue.textContent + count >= number) {
					totalValue.textContent = Math.round(number);
					calcBlock.removeEventListener('change', clearAnimate);
					clearAnimate();
				}
				totalValue.textContent = +totalValue.textContent + count;
				calcBlock.addEventListener('blur', clearAnimate);
				keyInterval = requestAnimationFrame(animate);
			};
			keyInterval = requestAnimationFrame(animate);
		};

		const countSum = () => {
			let total = 0,
					countValue = 1,
					dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
						squareValue = +calcSquare.value;
			totalValue.textContent = 0;
			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}
			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			}	else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}
			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}
			if (calcType.value && calcSquare.value) {
				calcAnimate(total);
			}
		};

			calcBlock.addEventListener('change', event => {
				const target = event.target;
				if (target.matches('input') || target.matches('select')) {
					countSum();
				}
			});
		
		calcBlock.addEventListener('input', event => {
			const target = event.target;
			if (target.matches('input')) {
				target.value = target.value.replace(/\D/, '');
			}
		});
	};

	//send-ajax-form
	const sendForm = (idForm) => {
		const errorMessage = 'Что то пошло не так...',
					loadMessage = 'Загрузка...',
					successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
		const form = document.getElementById(idForm);
		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem;';
		form.addEventListener('submit', event => {
			event.preventDefault();
			form.append(statusMessage);
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				statusMessage.textContent = loadMessage;
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					statusMessage.textContent = successMessage;
					[...form.elements].forEach(item => {
						if(item.tagName.toLowerCase() === 'input') {
							item.value = '';
						}
					});
				} else {
					statusMessage.textContent = errorMessage;
					console.error(request.status);
				}
			});
			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'application/json');
			const formData = new FormData(form);
			let body = {};
			for (let val of formData.entries()) {
				body[val[0]] = val[1];
			}
			request.send(JSON.stringify(body));
		});
	};

	//valid
	const valid = new Validator({
		selector: '#form1',
		pattern: {
			phone: /^\d+$/
		},
		method: {
			'name': [
				['notEmpty'],
				['pattern', 'name']
			],
			'phone': [
				['notEmpty'],
				['pattern', 'phone']
			],
			'email': [
				['notEmpty'],
				['pattern', 'email']
			]
		}
	});
	const valid1 = new Validator({
		selector: '#form2',
		method: {
			'phone': [
				['notEmpty'],
				['pattern', 'phone']
			],
			'email': [
				['notEmpty'],
				['pattern', 'email']
			],
			'name': [
				['notEmpty'],
				['pattern', 'name']
			],
			'message': [
				['notEmpty'],
				['pattern', 'message']
			]
		}
	});
	valid.init();
	valid1.init();
	sendForm('form1');
	sendForm('form2');
	sendForm('form3');
	toggleMenu();
	scrollWindow();
	toglePopup();
	tabs();
	slider();
	commandShow();
	calculate(100);
});