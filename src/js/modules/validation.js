/**
 * Валидация формы
 */

export default class Validation {
   constructor(form, name, email, phone, communication, message) {
      this.$form = document.querySelector(form)
      this.$name = document.querySelector(name)
      this.$email = document.querySelector(email)
      this.$phone = document.querySelector(phone)
      this.$communication = document.querySelector(communication)
      this.$message = document.querySelector(message)
      

      this.nameRegex = /^[A-zА-я\s_ ][^0-9]+$/; //'[\\w\s]+';
      this.phoneRegex = /^(\s*)?(\+)?([- _():+]?\d[- _():+]?){11,14}(\s*)?$/;
      this.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/     

      if (this.$form) this.$fields = this.$form.querySelectorAll(`${form} .field`)
      
      this.#setup()
   }

   #setup() {
      if (this.$form) 
         this.$form.addEventListener('submit', (event) => {
            let innerEvent = event
            this.valid(innerEvent)
         })
   }

   valid(innerEvent) {
      // TODO: Name
      if (this.$name) 
         if (this.$name.value.trim() == '')
            this.error(true, this.$name, 'Это обязательное поле', innerEvent)
               else if (!this.nameRegex.test(this.$name.value))
               this.error(true, this.$name, 'Укажите корректное имя', innerEvent)
                  else this.error(false, this.$name, '', innerEvent)

      // TODO: Email
      if (this.$email)
         if (this.$email.value.trim() == '')
            this.error(true, this.$email, 'Это обязательное поле', innerEvent)
               else if (!this.emailRegex.test(this.$email.value.trim()))
               this.error(true, this.$email, 'Укажите корректный email', innerEvent)
                  else this.error(false, this.$email, '', innerEvent)

      // TODO: Phone
      if (this.$phone)
         if (this.$phone.value.trim() == '')
            this.error(true, this.$phone, 'Это обязательное поле', innerEvent)
            else if (!this.phoneRegex.test(this.$phone.value.trim()))
               this.error(true, this.$phone, 'Введите корректный номер', innerEvent)
               else this.error(false, this.$phone, '', innerEvent)

      // TODO: Communication
      if (this.$communication)
         if (this.$communication.value == '')
            this.error(true, this.$communication, 'Выберите из списка ниже', innerEvent)
            else this.error(false, this.$communication, '', innerEvent)

      // TODO: Message
      if (this.$message)
         if (this.$message.value.trim().length > 3000)
            this.error(true, this.$message, 'Не более 3000 символов', innerEvent)
            else this.error(false, this.$message, '', innerEvent)
   }

   error(error, input, message, innerEvent) {
      let parent = input.parentNode
      let errorMessage = parent.querySelector('.error-message span')

      if (errorMessage)
         errorMessage.innerHTML = message

      // console.log(error);
      if (error) {
         innerEvent.preventDefault()
         parent.classList.add('error')
      } else {
         parent.classList.remove('error')
      }
   }
}