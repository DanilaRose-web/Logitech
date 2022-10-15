export default class OpenClose {
   /**
    * 
    * @param {''} target target: Принимает значения: 'menu' и 'popup'
    * @param {HTMLElement} popup popup: Селектор модального окна '.popup-wrap'
    * @param {HTMLCollection} openPopupBtn openPopupBtn: Массив элементов для открытия модального окна
    * @param {HTMLElement} menu menu: HTMLElement селектор мобильного меню 
    * @param {HTMLElement} overlay overlay: HTMLElement селектор overlay
    * @param {HTMLElement} burger burger: HTMLElement селектор иконки мобильного меню
    * @param {HTMLElement} closebtn closebtn: HTMLElement селектор иконки закрытия мобильного меню
    * @param {HTMLCollection} menuLinks menuLinks: HTMLCollection элементы мобильного меню, при клике на которые, закрывается мобильное меню
    */
   
   constructor(target, popup, openPopupBtn, menu, overlay, burger, closebtn, menuLinks) {
      this.target = target

      if (this.target && this.target == 'popup') {
         this.$popup = document.querySelector(popup)
         this.$openPopupBtn = document.querySelectorAll(openPopupBtn)
      } else {
         this.$menu = document.querySelector(menu)
         this.$burger = document.querySelectorAll(burger)
         this.$menuLinks = document.querySelectorAll(menuLinks)
      }

      this.$overlay = document.querySelectorAll(overlay)
      this.$closebtn = document.querySelectorAll(closebtn)
      this.$body = document.body

      this.#setup()
   }

   #setup() {
      if (this.target == 'popup') {
         for (let i = 0; i < this.$openPopupBtn.length; i++) {
            this.$openPopupBtn[i].addEventListener('click', this.open.bind(this))
         }
      } else {  
         for (let i = 0; i < this.$burger.length; i++) {
            this.$burger[i].addEventListener('click', this.open.bind(this)) // переопределяем контекст this, как контекст класса, а не метода open
         }
         for (let j = 0; j < this.$menuLinks.length; j++) {
            this.$menuLinks[j].addEventListener('click', () => {
               this.close()
            })
         }
      }

      // Закрытие по крестику
      for (let i = 0; i < this.$closebtn.length; i++) {
         this.$closebtn[i].addEventListener('click', this.close.bind(this))
      }

      // Закрытие по overlay
      for (let i = 0; i < this.$overlay.length; i++) {
         this.$overlay[i].addEventListener('click', this.close.bind(this))
      }

      // Закрытие по Escape
      this.$body.addEventListener('keydown', (e) => {
         if (e.keyCode == 27) this.close()
      })

   }

   open() {
      if (this.target == 'popup') {
         if (this.$popup) this.$popup.classList.add('active')
      } else {
         if (this.$menu) this.$menu.classList.add('active')
      }
      this.$body.classList.add('hidden')
      for (let i = 0; i < this.$overlay.length; i++) {
         this.$overlay[i].classList.add('active')
      }
      
   }

   close(e) { 
      if (this.target == 'popup') {
         let inputs = document.querySelectorAll('form .field')
         if (this.$popup) {
            for (let i = 0; i < inputs.length; i++) {
               inputs[i].value = ''
            }
            this.$popup.classList.remove('active')
         }
      } else {
         if (this.$menu) this.$menu.classList.remove('active')
      }
      this.$body.classList.remove('hidden')
      for (let i = 0; i < this.$overlay.length; i++) {
         this.$overlay[i].classList.remove('active')
      }
   }
}