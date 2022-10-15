/**
 * ! Логика анимации плавающего элемента lava lamp
 * TODO ОПИСАНИЕ:
 * * 1. HTML class на элементы, которым будет применяться анимация, можно вешать любой
 * * 2. HTML class на элемент, который будет анимироваться, можно вешать любой
 * * 3. Параметр handlerEvent принимает только 2 параметра:
 *    ? click - событие клика
 *    ? mouseover - событие наведения курсора
 */

export default class LavaLamp {
   /**
    * 
    * @param {HTMLCollection} el el: селектор элементов, к которым будет применяться анимация ('.lava')
    * @param {HTMLElement} elSwimming elSwimming: селектор элемента, который будет анимироваться ('.swimming')
    * @param {Event} handlerEvent handlerEvent: событие, при котором будет применяться анимация ('click', 'mouseover')
    * @param {number} duration duration: длительность анимации (400)
    * @param {''} fill fill: финальная точка анимации ('forwards', 'both') 
    * @param {''} easing easing: кривая ускорения анимации ('ease-out')
    */
   constructor(el, elSwimming, handlerEvent, duration, fill, easing) {
      this.$el = document.querySelectorAll(el)
      if (this.$el && this.$el.length > 0) 
         this.$parent = this.$el[0].offsetParent
      this.$elSwimming = document.querySelector(elSwimming)
      this.handlerEvent = handlerEvent
      this.duration = duration
      this.fill = fill 
      this.easing = easing

      this.#setup()
   }

   #setup() {
      if (this.handlerEvent == 'mouseover') 
         this.$parent.addEventListener('mouseleave', this.removeSwimming.bind(this))
      
      this.onEvent()
      window.addEventListener('resize', this.getSwimming.bind(this))
   }

   /**
    * Скрытие плавающего элемента
    */
   removeSwimming() {
      this.animation(0, 'auto')
      for (let i = 0; i < this.$el.length; i++) {
         this.$el[i].classList.remove('active')
      }
   }

   /**
    * Появление плавающего элемента у элемента в фокусе
    * @param {HTMLElement} currentEl currentEl: элемент, который находится в фокусе - выбранный элемент 
    */
   setSwimming(currentEl) {
      if (currentEl) {
         this.animation(currentEl.offsetWidth, currentEl.offsetLeft)
         currentEl.classList.add('active')
      }
   }

   getSwimming() {
      let activeLavaEl = document.querySelector('.r-tabs li.lava.active')
      this.setSwimming(activeLavaEl)
   }

   /**
    * События, при которых срабатывает анимация 
    * ? click
    * ? mouseover
    */
   onEvent() {
      for (let i = 0; i < this.$el.length; i++) {
         if (
            this.handlerEvent == 'click' &&
            this.$el[i].classList.contains('active')
         ) this.animation(this.$el[i].offsetWidth, this.$el[i].offsetLeft)

         this.$el[i].addEventListener(this.handlerEvent, () => {
            for (let j = 0; j < this.$el.length; j++) {
               this.$el[j].classList.remove('active')
            }
            this.setSwimming(this.$el[i])
         })
      }
   }

   destroy() {
      console.log('destroy');
      this.$parent.removeEventListener('mouseleave', this.removeSwimming.bind(this))
      for (let i = 0; i < this.$el.length; i++) {
         this.$el[i].removeEventListener('click', this.onEvent)
         this.$el[i].removeEventListener('mouseover', this.onEvent)
      }
   }

   /**
    * Анимирование плавающего элемента
    * @param {number} width width: Ширина плавающего элемента
    * @param {number} left left: Положение плавающего элемента
    */
   animation(width, left) {
      if (this.$elSwimming)
         this.$elSwimming.animate(
            [{ width: width + 'px', left: left + 'px' }],
            {
               duration: this.duration,
               fill: this.fill,
               easing: this.easing
            }
         )
   }
}