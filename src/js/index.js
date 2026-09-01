import '../scss/style.scss';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

let swiperBrands;
let swiperEquipments;
let swiperPrices;

function initSwiper(swiperInstance, selector) {
  const el = document.querySelector(selector);
  if (!el) return undefined;

  if (window.innerWidth < 768) {
    if (!swiperInstance) {
      return new Swiper(selector, {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: `${selector} .swiper-pagination`,
          clickable: true
        }
      });
    }
    return swiperInstance;
  } else {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }
    return undefined;
  }
}

function manageAllSwipers() {
  swiperBrands = initSwiper(swiperBrands, '.swiper-brands');
  swiperEquipments = initSwiper(swiperEquipments, '.swiper-equipments');
  swiperPrices = initSwiper(swiperPrices, '.swiper-prices');
}

function setupShowMore(
  cardSelector,
  btnSelector,
  imgPath,
  limits = { tablet: 6, desktop: 8 }
) {
  const cards = document.querySelectorAll(cardSelector);
  const button = document.querySelector(btnSelector);

  if (!cards.length || !button) return;

  button.classList.add('btn-show-more');

  const buttonText = button.querySelector('span');
  let isOpen = false;

  function update() {
    if (window.innerWidth < 768) {
      cards.forEach((card) => card.classList.remove('hidden'));
      return;
    }

    let visibleCards = limits.tablet;
    if (window.innerWidth >= 1120) {
      visibleCards = limits.desktop;
    }

    if (isOpen) {
      cards.forEach((card) => card.classList.remove('hidden'));
      if (buttonText) buttonText.textContent = 'Скрыть';
      button.classList.add('btn-show-more--active');
    } else {
      cards.forEach((card, index) => {
        if (index < visibleCards) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
      if (buttonText) buttonText.textContent = 'Показать всё';
      button.classList.remove('btn-show-more--active');
    }
  }

  button.onclick = function () {
    isOpen = !isOpen;
    update();
  };

  update();
  window.addEventListener('resize', update);
}

function setupReadMore() {
  const readMoreBtn = document.querySelector('.btn-readmore');
  const secondParagraph = document.querySelector(
    '.info-container__paragraph--size--second'
  );

  if (!readMoreBtn || !secondParagraph) return;

  const btnText = readMoreBtn.querySelector('.btn-readmore__text');
  let isExpanded = false;

  readMoreBtn.addEventListener('click', function () {
    isExpanded = !isExpanded;

    if (isExpanded) {
      secondParagraph.style.display = 'block';
      if (btnText) btnText.textContent = 'Свернуть';
      readMoreBtn.classList.add('btn-readmore--expanded');
    } else {
      secondParagraph.style.display = 'none';
      if (btnText) btnText.textContent = 'Читать далее';
      readMoreBtn.classList.remove('btn-readmore--expanded');
    }
  });
}

manageAllSwipers();
window.addEventListener('resize', manageAllSwipers);

setupShowMore('.brands-slider__card', '.brands__btn', '../img/section-brands');
setupShowMore(
  '.equipments-slider__card',
  '.equipments__btn',
  '../img/section-equipments',
  { tablet: 3, desktop: 4 }
);

setupReadMore();
