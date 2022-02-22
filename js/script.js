;(function ($) {

  // Мобильное меню
  $('.nav__btn-field').on('click', function () {
    if (window.matchMedia('(max-width: 650px)').matches) {
      $('.nav__btn-icon').toggleClass('nav__btn-icon--active');
      $('.nav__btn-field').toggleClass('nav__btn-field--active');
      $('.nav__list').toggleClass('nav__list--active');
    }
  });

  $('.nav__item').on('click', function () {

    // Активное состояние пункта меню после его выбора
    $('.nav__menu-link').removeClass('nav__menu-link--active');
    $(this).find('.nav__menu-link').addClass('nav__menu-link--active');

    // Закрытие мобильного меню при выборе пункта меню
    if (window.matchMedia('(max-width: 650px)').matches) {
      $('.nav__btn-icon').toggleClass('nav__btn-icon--active');
      $('.nav__btn-field').toggleClass('nav__btn-field--active');
      $('.nav__list').toggleClass('nav__list--active');
    }
  });

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
        studentForm.find('.form__input').attr('required', true);
        studentForm.find('.form__select').attr('required', true);
        teacherForm.find('.form__input').removeAttr('required');
      } else if (teacherOption) {
        teacherForm.css('display', 'flex');
        teacherForm.find('.form__input').attr('required', true);
        studentForm.find('.form__input').removeAttr('required');
        studentForm.find('.form__select').removeAttr('required');
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

    // Отключение/включение поля ввода "Стоимость курса"
    // в зависимости от выбора радио-кнопки "Платно"/"Бесплатно"
    let costChecked = function () {
      let isFreeOption = $('.form__course-cost input[name="course-cost"][value="Бесплатный"]:checked').length,
          isPayOption = $('.form__course-cost input[name="course-cost"][value="Платный"]:checked').length,
          inputPrice = $('.form__course-price');
      if (isFreeOption) {
        inputPrice.attr('disabled', true).removeAttr('required');
      } else if (isPayOption) {
        inputPrice.removeAttr('disabled').attr('required', true);
      }
    };
    costChecked();

    $('.form__course-cost input[name="course-cost"]').on('click', costChecked);
  });

  // Сортировка таблицы "Курсы" с использованием плагина TableSorter
  $('.table-sorted').tablesorter({sortList: [[0, 0]]});

  $('.table-block__header th').on('click', function () {
    $(this)
        .find('.table-block__sort-icon')
        .toggleClass('active');
  });

  // Показать/скрыть полную информацию о курсе
  $('.teacher-courses-view__tab .block__btn').on('click', function () {
    $(this)
        .closest('.teacher-courses-view__block')
        .find('.teacher-courses-view__info')
        .fadeToggle();
  });

  // Показать/скрыть полную информацию о модуле
  $('.table-block__radiobutton').on('click', function () {
    $(this)
        .toggleClass('active')
        .closest('tr')
        .next('.table-inner')
        .fadeToggle();
    return false;
  });
  $('.teacher-courses-view .table-block__body-tab').on('click', function () {
    $(this).find('.table-block__radiobutton').trigger('click');
  });

  // Всплытие модального окна если форма не валидна
  let validateForm = function () {
    $('.invalid-validation').fadeIn();
    $(this).closest('form').addClass('validation');
  };

  $('button[type="submit"]').on('click', validateForm);

  // Всплытие модального окна если форма валидна - сообщение отправлено
  let sendMsg = function () {
    $('.message-success').fadeIn();
  };

  $('.feedback__form').on('submit', function (e) {
    e.preventDefault();
    $('.invalid-validation').hide();
    sendMsg();
  });

  // Всплытие модального окна если форма валидна - регистрация успешна
  let regSuccess = function () {
    $('.registration-success').fadeIn();
  };

  // Регистрация
  $('.sign-up__form').on('submit', function (e) {
    e.preventDefault();
    $('.invalid-validation').hide();
    regSuccess();
  });

  // Авторизация
  $('.sign-in__form').on('submit', function (e) {
    e.preventDefault();
    $('.invalid-validation').hide();
    window.location.href = 'teacher-courses.html';
  });

  // Создание курса
  $('.teacher-new-course__form').on('submit', function (e) {
    e.preventDefault();
    $('.invalid-validation').hide();
    window.location.href = 'teacher-courses-view.html';
  });

  // Закрытие модального окна
  let modalClose = function () {
    $('.modal').fadeOut();
  };

  $('.modal__close-btn').on('click', modalClose);
  $('.modal__btn').on('click', modalClose);
  $('.modal__mask').on('click', modalClose);
})(jQuery);