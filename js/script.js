;(function ($) {

  // Появление кнопки "Вверх" после прокрутки на 100px
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });

  // Работа кнопки "Вверх"
  $('.scrollToTop').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 100);
    return false;
  });

  // Слайдер курсов
  $('.courses__slider').slick({
    vertical: true,
    verticalSwiping: true,
    dots: false,
    arrows: true,
    prevArrow: '<svg class="courses__slider-arrow arrow-left" xmlns="http://www.w3.org/2000/svg" width="43" height="27" viewBox="0 0 43 27"><use xlink:href="#arrow-top"/></svg>',
    nextArrow: '<svg class="courses__slider-arrow arrow-right" xmlns="http://www.w3.org/2000/svg" width="43" height="27" viewBox="0 0 43 27"><use xlink:href="#arrow-top"/></svg>',
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $(document).ready(function () {

    // Смена блоков "Ученик" / "Педагог" при выборе опции радиокнопки
    // (страница "Регистрации")
    let userChecked = function () {
      let studentOption = $('.sign-up__form input[name="user-type"][value="Школьник"]:checked').length,
          teacherOption = $('.sign-up__form input[name="user-type"][value="Педагог"]:checked').length,
          studentForm = $('#student-form-sign-up'),
          teacherForm = $('#teacher-form-sign-up');
      studentForm.css('display', 'none');
      teacherForm.css('display', 'none');
      if (studentOption) {
        studentForm.css('display', 'flex');
      } else if (teacherOption) {
        teacherForm.css('display', 'flex');
      }
    };
    userChecked();
    $('.sign-up__form input[name="user-type"]').on('click', userChecked);

    // Отключение/включение поля ввода "Ф. И. О. родителя/законного представителя"
    // в зависимости от выбора опции-ответа "Есть ли Вам 16 лет?"
    $('.form__select--question').change(function () {
      let selectedAnswerValue = $('.form__select--question option:selected').val();
      if (selectedAnswerValue === 'yes') {
        $('.form__input--parents').attr('disabled', true).removeAttr('required');
      } else if (selectedAnswerValue === 'no') {
        $('.form__input--parents').removeAttr('disabled').attr('required', true);
      }
    });
  })
})(jQuery);

let cellTableValue = (tr, i) => tr.children[i].textContent;
let toCompare = (i, asc) => (a, b) => ((v1, v2) => v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2))(cellTableValue(asc ? a : b, i), cellTableValue(asc ? b : a, i));

document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
  let table = th.closest('table');
  Array
      .from(table.querySelectorAll('tr:nth-child(n+2)'))
      .sort(toCompare(
          Array
              .from(th.parentNode.children)
              .indexOf(th), this.asc = !this.asc))
      .forEach(tr => table.appendChild(tr));
})))