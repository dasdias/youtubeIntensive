'use strict';
document.addEventListener('DOMContentLoaded', () => {

	// экранная клавиатура
	{
		let keyboardButton = document.querySelector('.search-form__keyboard');
		let keyboard = document.querySelector('.keyboard');
		let closeKeyboard = document.getElementById('close-keyboard');
		let searchInput = document.querySelector('.search-form__input');
		// console.log(keyboard);
		// console.log(searchInput);

		// функция показывающая меню
		const toggleKeyboard = () => {
			keyboard.style.top = keyboard.style.top ? '' : '50%';
		};

		// функция переключения раскладки клавиатуры
		const changeLang = (btn, lang) => {
			const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
				'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
				'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
				'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
				'en', ' '
			];
			const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
				'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
				'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
				'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
				'ru', ' '
			];
			if (lang === 'en') {
				btn.forEach((elem, i) => {
					elem.textContent = langEn[i];
				});

			} else {
				btn.forEach((elem, i) => {
					elem.textContent = langRu[i];
				});
			}
		};

		// функция отслеживающая нажатия на виртуальную клавиатуру
		const typing = event => {
			const target = event.target;

			if (target.tagName.toLowerCase() === 'button') {
				const contentButton = target.textContent.trim();
				const buttons = [...keyboard.querySelectorAll('button')]
					.filter(elem => elem.style.visibility !== 'hidden');
				// console.log(buttons);
				// Проверка нажатия пробела
				if (target.getAttribute('data-spacebar')) {
					searchInput.value += target.textContent = ' ';
				}
				// удаляем последний символ при нажатии backspace
				else if (target.getAttribute('data-backspace')) {
					const str = searchInput.value;
					searchInput.value = str.slice(0, -1);
				}else if (contentButton === 'en' || contentButton === 'ru') {
					changeLang(buttons, contentButton);
				}
				// выводим все нажатые буквы кроме backspace
				else if (!target.getAttribute('data-backspace')) {
					searchInput.value += contentButton;
				} 
			}
		};

		keyboardButton.addEventListener('click', toggleKeyboard);
		closeKeyboard.addEventListener('click', toggleKeyboard);
		keyboard.addEventListener('click', typing);
	}


	// меню
	{
		const burger = document.querySelector('.spinner');
		const sidebarMenu = document.querySelector('.sidebarMenu');

		// функция показывающая (скрывающая) короткое меню
		burger.addEventListener('click', () => {
			burger.classList.toggle('active');
			sidebarMenu.classList.toggle('rollUp');
		});

		// функция переключающая активный класс при клине на элементы меню
		sidebarMenu.addEventListener('click', e => {
			let target = e.target;
			target = target.closest('a[href="#"]');

			if (target) {
				const parentTarget = target.parentElement;
				sidebarMenu.querySelectorAll('li')
					.forEach((elem) => {
						if (elem === parentTarget) {
							elem.classList.add('active');
						} else {
							elem.classList.remove('active');
						}
					});
			}
		});
	}

	// модальное окно
	{

		document.body.insertAdjacentHTML('beforeend', `
        <div class="youTuberModal">
            <div id="youtuberClose">&#215;</div>
            <div id="youtuberContainer"></div>
        </div>
        `);


		const youtuberItems = document.querySelectorAll('[data-youtuber]');
		const youTuberModal = document.querySelector('.youTuberModal');
		const youtuberContainer = document.getElementById('youtuberContainer');

		const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
		const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];


		const sizeVideo = () => {
			let ww = document.documentElement.clientWidth;
			let wh = document.documentElement.clientHeight;
			// console.log(wh);
			for (let i = 0; i < qw.length; i++) {
				if (ww > qw[i]) {
					youtuberContainer.querySelector('iframe').style.cssText = `
						width: ${qw[i]}px; 
						height: ${qh[i]}px;
				`;
					// `; 
					youtuberContainer.style.cssText = `
							width: ${qw[i]}px;
							height: ${qh[i]}px;
							top: ${(wh - qh[i]) / 2}px;
							left: ${(ww - qw[i]) / 2}px;
					`;
					break;
				}
			}
		};


		youtuberItems.forEach(elem => {
			elem.addEventListener('click', () => {
				const idVideo = elem.dataset.youtuber;
				youTuberModal.style.display = 'block';

				const youTuberFrame = document.createElement('iframe');
				youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
				youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);

				window.addEventListener('resize', sizeVideo);
				sizeVideo();
			});
		});

		youTuberModal.addEventListener('click', () => {
			youTuberModal.style.display = '';
			youtuberContainer.textContent = '';
			window.removeEventListener('resize', sizeVideo);
		});


	}

	{

		const API_KEY = 'AIzaSyCm5tVFRHULtxeeclgb-EvIZpAHvr5NVFM';
		const CLIENT_ID = '213640380517-hdggpi65skfqagt43pje27h44s415taf.apps.googleusercontent.com';



	}


});