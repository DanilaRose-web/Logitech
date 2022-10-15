/**
 * ! IMPORT 
 */
import LavaLamp  from "./modules/lavaLamp.js"; // импорт initLavaLamp из lavaLamp.js
import $ from "jquery"
import OpenClose from "./modules/openClose.js" 
import { AccordionAndTabs } from "./modules/accordionAndTabs.js"
import "./modules/scroll-animate.js"
import Validation from "./modules/validation.js"
import Swiper from 'swiper/bundle';




let validContact = new Validation(
   '#contact-form',
   '#contact-form [name=user_name]',
   '#contact-form [name=user_email]',
   null,
   null,
   '#contact-form [name=user_message]'
)

let validOrder = new Validation(
   '#order-form',
   '#order-form [name=user_name]',
   '#order-form [name=user_email]',
   '#order-form [name=user_phone]',
   '#order-form [name=user_communication]',
   '#order-form [name=user_message]'
)


// Кастомный palceholder
let inputs = document.querySelectorAll('form .form-item')

for (let i = 0; i < inputs.length; i++) {
   let placeholder = inputs[i].querySelector('.placeholder')
   let input = inputs[i].querySelector('.field')

   if (!!input) {
      input.addEventListener('blur', () => {
         setPlaceholderStyles(input, placeholder)

      })
   }
}




/**
 * Инициализация lava-lamp
 */
window.addEventListener('load', function() {
   // const lava = new LavaLamp('li.lava', 'li.swimming', 'click', 400, 'forwards', 'ease-out');
})


/**
 * Открытие/Закрытие мобильного меню
 */
const mobMenu = new OpenClose('menu', '', '', '.mobile-menu', '.overlay', '.burger', '.ui-close', '.m-menu li > a')

/**
 * TODO: Модальное окно оформления закакза (popup-order)
 */
const orderPopup = new OpenClose('popup', '#order-popup', '.ui-button.buy', '', '.popup-overlay', '', '.ui-close', '')

/**
 * Tabs in mobile menu
 */
// const mobilaTabs = new AccordionAndTabs('tabs', '.m-tab', '.m-content', false)

/**
 * Tabs in section recommendend
 */
// const recommendedTabs = new AccordionAndTabs('tabs', '.r-tabs li.lava', '.section-recommendend .swiper.recommendend-swiper', false)

/**
 * Accordion in mobile menu
 */
// const mobileAccordion = new AccordionAndTabs('accordion', '.mc-menu > li', '.mc-submenu')    

/**
 * Accordion in mobile menu
 */
// const asideTabs = new AccordionAndTabs('tabs', '.section-p-main .aside-tab', '.aside-catalog .row', true)  
// $('.section-p-main .aside-tab').on('click', function() {
//    $('.p-first-content').hide()
// })

/**
 * Tabs on page documents
 */
// const documentsTabs = new AccordionAndTabs('tabs', '.aside-tab', '.d-content', false)




const mainSwiper = new Swiper('.swiper.main-swiper', {
   speed: 800,
   loop: true,
   autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
   },
   effect: 'fade',
   pagination: {
      el: '.swiper-pagination.main-swiper-pagination',
      type: 'bullets',
      clickable: true
   },
   autoHeight: false,
   keyboard: {
      enabled: true,
      onlyInViewport: false
   },
   breakpoints: {
      // when window width is >= 0px
      1: {
         autoHeight: true,
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
         },
      },
      // when window width is >= 1000px
      1000: {
         autoHeight: false,
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
         },
      },
   }
});




const imgSwiper = new Swiper('.swiper.img-swiper', {
   slidesPerView: 1,
   slidesPerGroup: 1,
   autoHeight: true,
   speed: 400,
   loop: true,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   // autoplay: {
   //    delay: 4000,
   // },
   pagination: {
      el: ".swiper-pagination.img-swiper-pagination",
      type: "fraction",
   },
   effect: 'fade',
   fadeEffect: {
      crossFade: true
   }

});


mainSwiper.updateAutoHeight(800);
updateHeightImgSwiper()

window.addEventListener('resize', function () {
   mainSwiper.updateAutoHeight(800);
   updateHeightImgSwiper()
});

function updateHeightImgSwiper () {
   for (let i = 0; i < imgSwiper.length; i++) {
      imgSwiper[i].update();
   }
}


/**
 * Слайдер в секции Specifications
 */
const specificationsSwiper = new Swiper('.swiper.specifications-swiper', {
   speed: 800,
   centeredSlides: true,
   slidesPerView: 3,
   slidesPerGroup: 1,
   slideToClickedSlide: true,
   // autoHeight: true,
   loop: true,
   navigation: {
      nextEl: '.specifications-swiper .swiper-button-next',
      prevEl: '.specifications-swiper .swiper-button-prev',
   },
   // pagination: {
   //    el: '.swiper-pagination-specifications',
   //    type: 'bullets',
   //    clickable: true
   // },
   keyboard: {
      enabled: true,
      onlyInViewPort: false
   },
   breakpoints: {
      // when window width is >= 1px
      1: {
         slidesPerView: 1,
      },
      // when window width is >= 600px
      600: {
         slidesPerView: 2,
      },
      // when window width is >= 900px
      900: {
         slidesPerView: 3,
      },
   }
})





specificationsSwiper.on('slideNextTransitionStart', function () {
   tabs()
});
specificationsSwiper.on('slidePrevTransitionStart', function () {
   tabs()
});
window.addEventListener('load', function () {
   tabs()
});


/**
 * TODO: Включает в себя функционал вкладок и вызывается при событиях:
 * * 1: загрузка window (window.onload)
 * * 2: начало анимации предыдущего слайда (.swiper.onslidePrevTransitionStart)
 * * 3: начало анимации следующего слайда (.swiper.onslideNextTransitionStart)
 */
function tabs () {
   getCurrentSlideTab()
   showCurrentSlideContent()
   getCurrentDescrTab()
}





/**
 * TODO: Создание вкладок слайдер (swiper-specifications) - контент с характеристиками (.slides-tabs-content)
 * * getCurrentSlideTab() - получение текущей вкладки (.swiper-slide-visible)
 * * showCurrentSlideContent() - отображение контента текущей вкладки (.slides-tabs-content)
 */

/**
 * * Получение текущего активного слайда (слайды выступают в роли табов) по аттрибуту "rel"
 * @returns {string} slideTabsAttr - значение аттрибута rel
 */
function getCurrentSlideTab() {
   setIdenticalClass()
   let slideTabs = document.querySelectorAll('.specifications-swiper .swiper-slide-tab')
   
   for (let i = 0; i < slideTabs.length; i++) {
      
      if (slideTabs[i].classList.contains('swiper-slide-active')) {
         let slideTabsAttr = slideTabs[i].getAttribute('rel')
         return slideTabsAttr;
      }
   }
}

function setIdenticalClass() {
   let slidePrev = document.querySelector('.specifications-swiper .swiper-slide-prev')
   let slideNext = document.querySelector('.specifications-swiper .swiper-slide-next')
   let slideActive = document.querySelector('.specifications-swiper .swiper-slide-active')

   slidePrev.classList.add('swiper-slide-tab')
   slideNext.classList.add('swiper-slide-tab')
   slideActive.classList.add('swiper-slide-tab')
}

getCurrentSlideTab()

/**
 * * Получение и отображение контента (.slides-tabs-content) активного слайда(вкладки)
 * @returns {HTMLElement} slideContentNode - контент активной вкладки (Node)
 */
function showCurrentSlideContent() {
   let slideContentNode = document.querySelector('[data-rel="' + getCurrentSlideTab() + '"]')
   let slideContens = document.querySelectorAll('.specifications-content .slides-tabs-content')
   

   for (let i = 0; i < slideContens.length; i++) {
      slideContens[i].classList.remove('active')
   }
   if (slideContentNode) {
      
      
   }
   slideContentNode.classList.add('active')
   return slideContentNode;
}





/**
 * TODO: Создание вкладок (характеристики товара) в specifications
 * * getCurrentDescrTab() - получение текущей вкладки (.descr-tab)
 * * showCurrentDescrContentTabs() - отображение контента текущей вкладки (.inner-tabs-content)
 */


/**
 * * Получение текущей вкладки (.descr-tab)
 */
function getCurrentDescrTab() {
   let tabsEl = showCurrentSlideContent().querySelectorAll('.inner-tabs li')
   for (let i = 0; i < tabsEl.length; i++) {
      if (tabsEl[i].classList.contains('active')) {
         showCurrentDescrContentTabs(tabsEl[i].getAttribute('data-tab'))
      }
   }
   
   for (let i = 0; i < tabsEl.length; i++) {
      tabsEl[i].addEventListener('click', function () {
         for (let j = 0; j < tabsEl.length; j++) {
            tabsEl[j].classList.remove('active')
         }
         this.classList.add('active')
         showCurrentDescrContentTabs(this.getAttribute('data-tab'))
      })
   }
}; 

/**
 * * Отображение контента текущей вкладки (.inner-tabs-content)
 */
function showCurrentDescrContentTabs(attrActiveTab) {
   let contentEls = showCurrentSlideContent().querySelectorAll('.inner-tabs-content')
   let section = document.querySelector('.section-specifications')

   for (let i = 0; i < contentEls.length; i++) {
      contentEls[i].classList.remove('active')
   }
   
   if (attrActiveTab) {
      let contentCurrentEl = showCurrentSlideContent().querySelector('[data-content="' + attrActiveTab + '"]')
      contentCurrentEl.classList.add('active')
      // console.log(section.clientHeight, 'section height');
      // console.log(contentCurrentEl.clientHeight, 'contentCurrentEl height');
   }
   calcHeight()
}



function calcHeight() {
   let contentEl = document.querySelectorAll('.inner-tabs-content')
   let arr = []

   for (let i = 0; i < contentEl.length; i++) {
      // console.log(contentEl[i].clientHeight);
      arr.push(contentEl[i].clientHeight);
   }
   // console.log(arr);
}




/**
 * TODO: Переход между секциями при навигиции по .dots
 */
$(function () {
   $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $('.dots a').removeClass('active').filter(this).addClass('active');
      var selector = $(this).attr('href');
      var h = $(selector);

      $('html, body').animate({
         scrollTop: h.offset().top - 60
      }, 600);
   });
});




/**
 * Select
 */

initSelect()

function initSelect() {
   let select = document.querySelector('.ui-select')
   let optionItem = select.querySelectorAll('.options li')
   let selectedItem = select.querySelector('.ui-select input')
   let placeholder = select.querySelector('.ui-select .placeholder')
   let buyBtn = document.querySelectorAll('.ui-button.buy')

   for (let i = 0; i < buyBtn.length; i++) {
      buyBtn[i].addEventListener('click', function () {
         selectedItem.value = ''

         if (this.hasAttribute('data-product')) {
            selectedItem.value = this.getAttribute('data-product')
            setPlaceholderStyles(selectedItem, placeholder)
         }
      })
   }


   select.addEventListener('click', function () {
      this.classList.toggle('active')
   })


   for (let i = 0; i < optionItem.length; i++) {
      optionItem[i].addEventListener('click', function () {
         selectedItem.value = this.getAttribute('data-value');

         setPlaceholderStyles(selectedItem, placeholder)

         for (let j = 0; j < optionItem.length; j++) {
            optionItem[j].classList.remove('current')
         }
         this.classList.add('current')
      })
   }
}

function setPlaceholderStyles(el, placeholder) {
   if (el.value != '') {
      placeholder.style.fontSize = '12px'
      placeholder.style.top = '-15px'
   } else {
      placeholder.style.fontSize = ''
      placeholder.style.top = ''
   }
}


/**
 * Header scroll animation
 */
window.addEventListener('scroll', () => {
   headerScroll()
})
headerScroll()
function headerScroll() {
   let windowScroll = window.pageYOffset
   let header = document.querySelector('header.scroll')

   if (windowScroll >= header.clientHeight + 100)
      header.classList.add('active')
   else header.classList.remove('active')
}

/**
 * Маска для телефона
 */
var elements = document.querySelectorAll('input[type=tel]');
if (elements) {
   for (var i = 0; i < elements.length; i++) {
      new IMask(elements[i], {
         mask: '+{7}(000)000-00-00',
      });
   }
}