function form () {

function submitForm(elem) {
  let message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: "Что-то пошло не так..."
  },
      form = document.querySelector(elem),
      input = document.getElementsByName('phone'),
      statuMessage = document.createElement('div'),
      inp = document.querySelectorAll('input');

  statuMessage.classList.add('status');

  // Проверка на правильность ввода телефона
  validPhone();

  form.addEventListener('submit', function (event) {
      event.preventDefault();
      form.appendChild(statuMessage);
      let formData = new FormData(form);

      function postData(data) {

          return new Promise(function (resolve, reject) {
              
              let request = new XMLHttpRequest();

              request.open('POST', 'server.php');

              request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

              request.addEventListener('readystatechange', function () {

                  if (request.readyState < 4) {
                      resolve()
                  } else if (request.readyState === 4 && request.status == 200) {
                      resolve()
                  } else {
                      reject()
                  }
              });
              let obj = {};
              data.forEach(function (value, key) {
                  obj[key] = value;
              });
              let json = JSON.stringify(obj);
              request.send(json);
          })

      } // End postData

      function clearInput() {

          for (let j = 0; j < inp.length; j++) {
              inp[j].value = '';
              // очистка всех инпутов
          }
      }
      postData(formData)
          .then(() => statuMessage.innerHTML = message.loading)
          .then(() => {
              statuMessage.innerHTML = message.success;
          })
          .catch(() => statuMessage.innerHTML = message.failure)
          .then(clearInput)
  });


  function validPhone() {
      for (let i = 0; i < input.length; i++) {
          input[i].addEventListener('keypress', (e) => {
              if (!e.charCode == 43 && e.charCode < 47 || e.charCode > 57) {
                  e.preventDefault();
              }
          });
      }
  }
} // end submitForm

submitForm('.main-form');

submitForm('#form');
};

module.exports = form;