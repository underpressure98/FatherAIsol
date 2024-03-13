var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/index.html") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
    document.querySelector('body').classList.add('_touch');
}

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function() {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function(support) {
    if (support == true) {
        document.querySelector('body').classList.add('_webp');
    } else {
        document.querySelector('body').classList.add('_no-webp');
    }
});

function ibg() {
    if (isIE()) {
        let ibg = document.querySelectorAll("._ibg");
        for (var i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
                ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
            }
        }
    }
}
ibg();

if (document.querySelector('.wrapper')) {
    document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;


//BodyLock
function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, delay);

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}

function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add("_lock");

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}


//Menu
let iconMenu = document.querySelector(".menu__icon");
let menulist = document.querySelector(".menu__list");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");

function clickOff(event) {
    console.log(event);
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
    html.classList.remove("lock");
}

if (iconMenu) {
    iconMenu.addEventListener("click", function() {
        iconMenu.classList.toggle("_active");
        html.classList.toggle("lock");
        menuBody.classList.toggle("_active");
    });
    menulist.addEventListener("mouseup", clickOff);

    document.addEventListener('click', function(e) {
        var target = e.target;
        var its_menu = target == menuBody || menuBody.contains(target);
        var its_iconMenu = target == iconMenu || iconMenu.contains(target);
        var menu_is_active = menuBody.classList.contains('_active');

        if (!its_menu && !its_iconMenu && menu_is_active) {
            clickOff();
        }
    });
}

// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Создаем событие 
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty('height') : null;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Создаем событие 
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
}
let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            document.documentElement.classList.remove("lock");
        }, delay);
        bodyLockStatus = false;
        setTimeout(function() {
            bodyLockStatus = true;
        }, delay);
    }
}
let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        document.documentElement.classList.add("lock");

        bodyLockStatus = false;
        setTimeout(function() {
            bodyLockStatus = true;
        }, delay);
    }
}


//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// Получение хеша в адресе сайта
function getHash() {
    if (location.hash) {
        return location.hash.replace('#', '');
    }
}

// FLS (Full Logging System)
function FLS(message) {
    setTimeout(() => {
        if (window.FLS) {
            console.log(message);
        }
    }, 0);
}
// Получить цифры из строки
function getDigFromString(item) {
    return parseInt(item.replace(/[^\d]/g, ''))
}
// Форматирование цифр типа 100 000 000
function getDigFormat(item) {
    return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
function removeClasses(array, className) {
    for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
}
// Уникализация массива
function uniqArray(array) {
    return array.filter(function(item, index, self) {
        return self.indexOf(item) === index;
    });
}
// Функция получения индекса внутри родителя
function indexInParent(parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};
// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа запросами
    const media = Array.from(array).filter(function(item, index, self) {
        if (item.dataset[dataSetValue]) {
            return item.dataset[dataSetValue].split(",")[0];
        }
    });
    // Инициализация объектов с медиа запросами
    if (media.length) {
        const breakpointsArray = [];
        media.forEach(item => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });
        // Получаем уникальные брейкпоинты
        let mdQueries = breakpointsArray.map(function(item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mdQueries = uniqArray(mdQueries);
        const mdQueriesArray = [];

        if (mdQueries.length) {
            // Работаем с каждым брейкпоинтом
            mdQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                // Объекты с нужными условиями
                const itemsArray = breakpointsArray.filter(function(item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia
                })
            });
            return mdQueriesArray;
        }
    }
}
//================================================================================================================================================================================================================================================================================================================
// Модуль попапов

// Класс Popup
class Popup {
    constructor(options) {
        let config = {
            logging: true,
            init: true,
            // Для кнопок 
            attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
            attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
            // Для сторонних объектов
            fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
            // Для объекта попапа
            youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
            youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
            setAutoplayYoutube: true,
            // Изменение классов
            classes: {
                popup: 'popup',
                // popupWrapper: 'popup__wrapper',
                popupContent: 'popup__content',
                popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
                bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
            },
            focusCatch: true, // Фокус внутри попапа зациклен
            closeEsc: true, // Закрытие по ESC
            bodyLock: true, // Блокировка скролла
            hashSettings: {
                location: true, // Хэш в адресной строке
                goHash: true, // Переход по наличию в адресной строке
            },
            on: { // События
                beforeOpen: function() {},
                afterOpen: function() {},
                beforeClose: function() {},
                afterClose: function() {},
            },
        }
        this.youTubeCode;
        this.isOpen = false;
        // Текущее окно
        this.targetOpen = {
            selector: false,
            element: false,
        }
        // Предыдущее открытое
        this.previousOpen = {
            selector: false,
            element: false,
        }
        // Последнее закрытое
        this.lastClosed = {
            selector: false,
            element: false,
        }
        this._dataValue = false;
        this.hash = false;

        this._reopen = false;
        this._selectorOpen = false;

        this.lastFocusEl = false;
        this._focusEl = [
            'a[href]',
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            'button:not([disabled]):not([aria-hidden])',
            'select:not([disabled]):not([aria-hidden])',
            'textarea:not([disabled]):not([aria-hidden])',
            'area[href]',
            'iframe',
            'object',
            'embed',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        //this.options = Object.assign(config, options);
        this.options = {
            ...config,
            ...options,
            classes: {
                ...config.classes,
                ...options ? .classes,
            },
            hashSettings: {
                ...config.hashSettings,
                ...options ? .hashSettings,
            },
            on: {
                ...config.on,
                ...options ? .on,
            }
        }
        this.bodyLock = false;
        this.options.init ? this.initPopups() : null
    }
    initPopups() {
        this.popupLogging(`Проснулся`);
        this.eventsPopup();
    }
    eventsPopup() {
        // Клик на всем документе
        document.addEventListener("click", function(e) {
            // Клик по кнопке "открыть"
            const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (buttonOpen) {
                e.preventDefault();
                this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
                    buttonOpen.getAttribute(this.options.attributeOpenButton) :
                    'error';
                this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ?
                    buttonOpen.getAttribute(this.options.youtubeAttribute) :
                    null;
                if (this._dataValue !== 'error') {
                    if (!this.isOpen) this.lastFocusEl = buttonOpen;
                    this.targetOpen.selector = `${this._dataValue}`;
                    this._selectorOpen = true;
                    this.open();
                    return;

                } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);

                return;
            } else {

                if (e.target.hash) {
                    let addr = e.target.hash.split('-');
                    let tabsc = document.querySelectorAll('.tabs__content')
                    if (tabsc[addr[1]]) {
                        for (let child of tabsc[addr[1]].children) {
                            child.hidden = 1;
                        }
                        tabsc[addr[1]].children[addr[2]].hidden = 0
                    }
                }
            }

            // Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
            const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
            if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                e.preventDefault();
                this.close();
                return;
            }
        }.bind(this));
        // Закрытие по ESC
        document.addEventListener("keydown", function(e) {
            if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
                e.preventDefault();
                this.close();
                return;
            }
            if (this.options.focusCatch && e.which == 9 && this.isOpen) {
                this._focusCatch(e);
                return;
            }
        }.bind(this))

        // Открытие по хешу
        if (this.options.hashSettings.goHash && !window.location.hash.includes('#tab')) {
            // Проверка изменения адресной строки
            window.addEventListener('hashchange', function() {
                if (window.location.hash) {
                    this._openToHash();
                } else {
                    this.close(this.targetOpen.selector);
                }
            }.bind(this))

            window.addEventListener('load', function() {
                if (window.location.hash) {
                    this._openToHash();
                }
            }.bind(this))
        }
    }
    open(selectorValue) {
        if (bodyLockStatus) {

            // -------------------- [
            //this.bodyLock = document.documentElement.classList.contains('lock') ? true : false;
            // -------------------- ]

            // Если ввести значение селектора (селектор настраивается в options)
            if (selectorValue && typeof(selectorValue) === "string" && selectorValue.trim() !== "") {
                this.targetOpen.selector = selectorValue;
                this._selectorOpen = true;
            }
            if (this.isOpen) {
                this._reopen = true;
                this.close();
            }
            // -------------------- [
            else
                // Если перед открытием попапа был режим lock
                this.bodyLock = document.documentElement.classList.contains('lock') ? true : false;
            // -------------------- ]

            if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
            if (!this._reopen) this.previousActiveElement = document.activeElement;

            this.targetOpen.element = document.querySelector(this.targetOpen.selector);

            if (this.targetOpen.element) {
                // YouTube
                if (this.youTubeCode) {
                    const codeVideo = this.youTubeCode;
                    const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
                    const iframe = document.createElement('iframe');
                    iframe.setAttribute('allowfullscreen', '');

                    const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
                    iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

                    iframe.setAttribute('src', urlVideo);

                    if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                        const youtubePlace = this.targetOpen.element.querySelector('.popup__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
                    }
                    this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                }
                if (this.options.hashSettings.location) {
                    // Получение хэша и его выставление 
                    this._getHash();
                    this._setHash();
                }

                // До открытия
                this.options.on.beforeOpen(this);
                // Создаем свое событие после открытия попапа
                document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                    detail: {
                        popup: this
                    }
                }));

                this.targetOpen.element.classList.add(this.options.classes.popupActive);
                document.documentElement.classList.add(this.options.classes.bodyActive);

                if (!this._reopen) {
                    !this.bodyLock ? bodyLock() : null;
                } else this._reopen = false;

                this.targetOpen.element.setAttribute('aria-hidden', 'false');

                // Запоминаю это открытое окно. Оно будет последним открытым
                this.previousOpen.selector = this.targetOpen.selector;
                this.previousOpen.element = this.targetOpen.element;

                this._selectorOpen = false;

                this.isOpen = true;

                setTimeout(() => {
                    this._focusTrap();
                }, 50);

                // После открытия
                this.options.on.afterOpen(this);
                // Создаем свое событие после открытия попапа
                document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                    detail: {
                        popup: this
                    }
                }));
                this.popupLogging(`Открыл попап`);

            } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
        }
    }
    close(selectorValue) {
        if (selectorValue && typeof(selectorValue) === "string" && selectorValue.trim() !== "") {
            this.previousOpen.selector = selectorValue;
        }
        if (!this.isOpen || !bodyLockStatus) {
            return;
        }
        // До закрытия
        this.options.on.beforeClose(this);
        // Создаем свое событие перед закрытием попапа
        document.dispatchEvent(new CustomEvent("beforePopupClose", {
            detail: {
                popup: this
            }
        }));

        // YouTube
        if (this.youTubeCode) {
            if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
                this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
        }
        this.previousOpen.element.classList.remove(this.options.classes.popupActive);
        // aria-hidden
        this.previousOpen.element.setAttribute('aria-hidden', 'true');
        if (!this._reopen) {
            document.documentElement.classList.remove(this.options.classes.bodyActive);
            !this.bodyLock ? bodyUnlock() : null;
            this.isOpen = false;
        }
        // Очищение адресной строки
        this._removeHash();
        if (this._selectorOpen) {
            this.lastClosed.selector = this.previousOpen.selector;
            this.lastClosed.element = this.previousOpen.element;

        }
        // После закрытия
        this.options.on.afterClose(this);
        // Создаем свое событие после закрытия попапа
        document.dispatchEvent(new CustomEvent("afterPopupClose", {
            detail: {
                popup: this
            }
        }));

        setTimeout(() => {
            this._focusTrap();
        }, 50);

        this.popupLogging(`Закрыл попап`);
    }
    // Получение хэша 
    _getHash() {
        if (this.options.hashSettings.location) {
            this.hash = this.targetOpen.selector.includes('#') ?
                this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
        }
    }
    _openToHash() {
        let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
            document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
            null;

        const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);
        if (buttons && classInHash) this.open(classInHash);
    }
    // Утсановка хэша
    _setHash() {
        history.pushState('', '', this.hash);
    }
    _removeHash() {
        history.pushState('', '', window.location.href.split('#')[0])
    }
    _focusCatch(e) {
        const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
        const focusArray = Array.prototype.slice.call(focusable);
        const focusedIndex = focusArray.indexOf(document.activeElement);

        if (e.shiftKey && focusedIndex === 0) {
            focusArray[focusArray.length - 1].focus();
            e.preventDefault();
        }
        if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
            focusArray[0].focus();
            e.preventDefault();
        }
    }
    _focusTrap() {
        const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
        if (!this.isOpen && this.lastFocusEl) {
            this.lastFocusEl.focus();
        } else {
            focusable[0].focus();
        }
    }
    // Функция вывода в консоль
    popupLogging(message) {
        this.options.logging ? FLS(`[Попап]: ${message}`) : null;
    }
}

const flsModules = {}

// Запускаем и добавляем в объект модулей
setTimeout(() => {
    var popup = new Popup({});
    flsModules.popup = new Popup({});
}, 100);


//======================================== Scroll To Top Button + Fixed Header
var html, scrollToTopButton;
window.onload = function() {
    html = document.documentElement;
    body = document.body;
    scrollToTopButton = document.getElementById("scrollToTopButton");

    window.onscroll = function() {
        windowScroll();
        controlScrollToTopButton();
    };
};

function scrollToTop(totalTime, easingPower) {
    //console.log("here");
    var timeInterval = 1; //in ms
    var scrollTop = Math.round(body.scrollTop || html.scrollTop);
    //var by=- scrollTop;
    var timeLeft = totalTime;
    var scrollByPixel = setInterval(function() {
        var percentSpent = (totalTime - timeLeft) / totalTime;
        if (timeLeft >= 0) {
            var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
            body.scrollTop = newScrollTop;
            html.scrollTop = newScrollTop;
            //console.log(easeInOut(percentSpent,easingPower));
            timeLeft--;
        } else {
            clearInterval(scrollByPixel);
            //Add hash to the url after scrolling
            //window.location.hash = hash;
        }
    }, timeInterval);
}

function easeInOut(t, power) {
    if (t < 0.5) {
        return 0.5 * Math.pow(2 * t, power);
    } else {
        return 0.5 * (2 - Math.pow(2 * (1 - t), power));
    }
}

//window.onscroll = controlScrollToTopButton;

function controlScrollToTopButton() {

    if (!scrollToTopButton) return;
    var windowInnerHeight = 2 * window.innerHeight;
    if (
        body.scrollTop > windowInnerHeight ||
        html.scrollTop > windowInnerHeight
    ) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
}


var mainNav = document.querySelector('.header');

function windowScroll() {
    if (!mainNav) return;
    mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 ||
        document.documentElement.scrollTop > 50);
}


var mainNav = document.querySelector('.header');

window.onscroll = function() {
    windowScroll();
};

function windowScroll() {
    mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50);
}