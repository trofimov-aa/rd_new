const boxes = document.querySelectorAll('.box');

const checkBoxes = () => {
  const triger = (window.innerHeight / 5) * 4;
  for (const box of boxes) {
    const topOfBox = box.getBoundingClientRect().top;
    if (topOfBox < triger) {
      box.classList.add('show');
    // } else {
    //     box.classList.remove('show');
    } 
  }
}
setTimeout(()=> {
    checkBoxes();
}, 300);

window.addEventListener('scroll', checkBoxes);





document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector("header").classList.toggle("open")
        
    })
   
})

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.querySelector(".header").classList.remove("open")
  }
});
document.getElementById("navbar").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
  if (event._isClickWithInMenu) return;
  document.querySelector(".header").classList.remove("open")
});



let selector = document.querySelector("#tel")
let im = new Inputmask("+7(999) 999-99-99")
im.mask(selector)

let validation = new JustValidate("form")

validation.addField("#name", [
    {
        rule: "required",
        errorMessage: "Введите Ваше имя!"
    },
    {
        rule: "minLength",
        value: 2,
        errorMessage: "Минимум 2 символа!"
      }
]).addField("#tel", [
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length > 0)
      },
      errorMessage: 'Введите номер телефона!'
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Boolean(Number(phone) && phone.length === 10)
      },
      errorMessage: 'Введите телефон полностью'
    }
  ]).addField("#email", [
    {
        rule: "required",
        errorMessage: "Введите Вашу почту!"
    }
]).addField("#msg", [
    {
        rule: "required",
        errorMessage: "Введите сообщение!"
    },
    {
        rule: "minLength",
        value: 10,
        errorMessage: "Минимум 10 символов!"
      }
]).onSuccess(async function(){
    let data = {
        name: document.getElementById("name").value,
        tel: selector.inputmask.unmaskedvalue(),
        email: document.getElementById("email").value,
        msg: document.getElementById("msg").value
    }
    let response = await fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
    })
    let result = await response.text()
    alert(result)
})




const headerEl = document.getElementById("header")

window.addEventListener("scroll", function (e) {
  const scrollPos = window.scrollY

  if (scrollPos > 100) {
    headerEl.classList.add("header_mini")
  } else {
    headerEl.classList.remove("header_mini")
  }
})


