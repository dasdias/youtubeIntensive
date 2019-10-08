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

        // функция отслеживающая нажатия на виртуальную клавиатуру
        const typing = event => {
            const target = event.target;

            if (target.tagName.toLowerCase() === 'button') {

                // сделать backspace и пробел

                // Проверка нажатия пробела
                if (target.getAttribute('data-spacebar')) {
                    searchInput.value += target.textContent = ' ';
                }
                // удаляем последний символ при нажатии backspace
                if (target.getAttribute('data-backspace')) {
                    const str = searchInput.value;
                    searchInput.value = str.slice(0, -1);
                }
                // выводим все нажатые буквы кроме backspace
                if (!target.getAttribute('data-backspace')) {
                    searchInput.value += target.textContent.trim()
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




});