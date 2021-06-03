const formHandler = () => {
    window.addEventListener("DOMContentLoaded", function() {
      
        // get the form elements defined in your form HTML above
        
        var form = document.getElementById("my-form");
        var button = document.getElementById("my-form-button");
        var status = document.getElementById("my-form-status");

        status.style = "display: none; font-weight: bold; margin-bottom: 0";

        const overlay = document.querySelector(".js-overlay-modal");

        // Success and Error functions for after the form is submitted
        
        function success() {
          form.reset();
          button.style = "display: none ";
          status.style = "display: block; color: green;";
          status.innerHTML = "Сообщение отправлено";

          setTimeout(() => {
              overlay.classList.remove("active");
              document.querySelector(".modal.active").classList.remove("active");
              button.style = "display: block ";
              status.innerHTML = "";
              status.style = "display: none"
              document.body.style = "overflow: auto"
          }, 500)
        }
    
        function error() {
          status.innerHTML = "Введите верный адрес электронной почты";
          status.style = "color: red;";
        }
    
        // handle the form submission event
    
        form.addEventListener("submit", function(ev) {
          ev.preventDefault();
          var data = new FormData(form);
          ajax(form.method, form.action, data, success, error);
        });
      });
      
      // helper function for sending an AJAX request
    
      function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
          } else {
            error(xhr.status, xhr.response, xhr.responseType);
          }
        };
        xhr.send(data);
      }
}

export default formHandler;