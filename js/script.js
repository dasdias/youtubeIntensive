'use strict';
document.addEventListener('DOMContentLoaded', () => {

	// экранная клавиатура
	{
		let keyboardButton = document.querySelector('.search-form__keyboard');
		let keyboard = document.querySelector('.keyboard');
		let closeKeyboard = document.getElementById('close-keyboard');
		let searchInput = document.querySelector('.search-form__input');

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
				} else if (contentButton === 'en' || contentButton === 'ru') {
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



	const youtuber = () => {

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

	// модальное окно
	{

		document.body.insertAdjacentHTML('beforeend', `
        <div class="youTuberModal">
            <div id="youtuberClose">&#215;</div>
            <div id="youtuberContainer"></div>
        </div>
        `);
		youtuber();

	}

	{

		const API_KEY = 'AIzaSyCm5tVFRHULtxeeclgb-EvIZpAHvr5NVFM';
		const CLIENT_ID = '213640380517-hdggpi65skfqagt43pje27h44s415taf.apps.googleusercontent.com';

		const buttonAuth = document.getElementById('authorize');
		const authBlock = document.querySelector('.auth');

		const errorAuth = err => {
			console.error(err);
			authBlock.style.display = '';
		};

		gapi.load("client:auth2", () => gapi.auth2.init({
			client_id: CLIENT_ID
		}));

		const authenticate = () => gapi.auth2.getAuthInstance()
			.signIn({
				scope: "https://www.googleapis.com/auth/youtube.readonly"
			})
			.then(() => console.log("Sign-in successful"))
			.catch(errorAuth);


		const loadClient = () => {
			gapi.client.setApiKey(API_KEY);
			return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
				.then(() => console.log("GAPI client loaded for API"))
				.then(() => authBlock.style.display = 'none')
				.catch(errorAuth);
		}

		// authBlock.addEventListener('click' , () => {
		// 	console.log(event.target);
		// 	authBlock.style.display = 'none';
		// })

		buttonAuth.addEventListener('click', (event) => {
			// event.stopPropagation();
			authenticate().then(loadClient);
		});

	}

	// request
	{
		const gloTube = document.querySelector('.logo-academy');
		const trends = document.getElementById('yt_trend');
		const like = document.getElementById('yt_like');
		const searchForm = document.querySelector('.search-form');
		const subscriptions = document.getElementById('subscriptions');


		const request = options => gapi.client.youtube[options.method]
			.list(options)
			.then(response => response.result.items)
			.then(data => options.method === 'subscriptions' ? renderSub(data) : render(data))
			// .then(youtuber)
			.catch(err => console.error('Во время запроса произошла ошиба ' + err));

		const renderSub = data => {
			console.log(data);

			const ytWrapper = document.getElementById('yt-wrapper');
			ytWrapper.textContent = '';
			data.forEach(item => {
				try {
					const {
						snippet: {
							resourceId: {
								channelId
							},
							description,
							title,
							thumbnails: {
								high: {
									url
								}
							},
						}
					} = item;

					ytWrapper.innerHTML += `
					<div class="yt" data-youtuber = "${channelId}">
						<div class="yt-thumbnail"	style="--aspect-ratio:16/9;">
							<img src="${url}"	alt="thumbnail" class="yt-thumbnail__img">
						</div>
						<div class="yt-title">${title}</div>
						<div class="yt-channel">${description}</div>
					</div>
					`;
				} catch (err) {
					console.error(err);
				}
			});

			ytWrapper.querySelectorAll('.yt').forEach(item => {
				item.addEventListener('click', () => {
					request({
						method: 'search',
						part: 'snippet',
						channelId: item.dataset.youtuber,
						order: 'date',
						maxResults: 6,
					});
				});
			});


		};

		const render = data => {
			// console.log(data);

			const ytWrapper = document.getElementById('yt-wrapper');
			ytWrapper.textContent = '';
			data.forEach(item => {
				try {
					const {
						id,
						id: {
							videoId
						},
						snippet: {
							channelTitle,
							title,
							resourceId: {
								videoId: likedVideoId
							} = {},
							thumbnails: {
								high: {
									url
								}
							}
						}
					} = item;

					ytWrapper.innerHTML += `
					<div class="yt" data-youtuber = "${likedVideoId || videoId || id}">
						<div class="yt-thumbnail"	style="--aspect-ratio:16/9;">
							<img src="${url}"	alt="thumbnail" class="yt-thumbnail__img">
						</div>
						<div class="yt-title">${title}</div>
						<div class="yt-channel">${channelTitle}</div>
					</div>
					`;
				} catch (err) {
					console.error(err);
				}
			});

			youtuber();
		};

		gloTube.addEventListener('click', () => {
			request({
				method: 'search',
				part: 'snippet',
				channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
				order: 'date',
				maxResults: 6,
			});
		});

		trends.addEventListener('click', () => {
			request({
				method: 'videos',
				part: "snippet",
				chart: "mostPopular",
				maxResults: 6,
				regionCode: "RU",
			});
		});

		like.addEventListener('click', () => {
			request({
				method: 'playlistItems',
				part: "snippet",
				playlistId: 'LLMFKm3Uf3dHIJjOY8jDXORQ',
				maxResults: 6,
			});
		});

		subscriptions.addEventListener('click', () => {
			request({
				method: 'subscriptions',
				part: "snippet",
				mine: true,
				maxResults: 6,
			});
		});

		searchForm.addEventListener('submit', event => {
			// console.log(searchForm);
			event.preventDefault();
			const valueInput = searchForm.elements[0].value;
			if (!valueInput) {
				searchForm.style.border = '1px solid red';
				return;
			}
			searchForm.style.border = '';
			request({
				method: 'search',
				part: 'snippet',
				order: 'relevance',
				maxResults: 6,
				q: searchForm.elements[0].value,
			});

		});
	}

});