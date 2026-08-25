import '../scss/style.scss'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

let swiperBrands
let swiperEquipments
let swiperPrices

function initSwiper(swiperInstance, selector) {
  const el = document.querySelector(selector)
  if (!el) return undefined

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
      })
    }
    return swiperInstance
  } else {
    if (swiperInstance) {
      swiperInstance.destroy(true, true)
    }
    return undefined
  }
}

function manageAllSwipers() {
  swiperBrands = initSwiper(swiperBrands, '.swiper-brands')
  swiperEquipments = initSwiper(swiperEquipments, '.swiper-equipments')
  swiperPrices = initSwiper(swiperPrices, '.swiper-prices')
}

function setupShowMore(cardSelector, btnSelector, imgPath) {
  const cards = document.querySelectorAll(cardSelector)
  const button = document.querySelector(btnSelector)

  if (!cards.length || !button) return

  const buttonText = button.querySelector('span')
  const buttonImage = button.querySelector('img')
  let isOpen = false

  function update() {
    if (window.innerWidth < 768) {
      cards.forEach((card) => card.classList.remove('hidden'))
      return
    }

    let visibleCards = 6
    if (window.innerWidth >= 1120) {
      visibleCards = 8
    }

    if (isOpen) {
      cards.forEach((card) => card.classList.remove('hidden'))
      if (buttonText) buttonText.textContent = 'Скрыть'
      if (buttonImage) buttonImage.src = `${imgPath}/ExpandUp.svg`
    } else {
      cards.forEach((card, index) => {
        if (index < visibleCards) {
          card.classList.remove('hidden')
        } else {
          card.classList.add('hidden')
        }
      })
      if (buttonText) buttonText.textContent = 'Показать всё'
      if (buttonImage) buttonImage.src = `${imgPath}/ExpandDown.svg`
    }
  }

  button.onclick = function () {
    isOpen = !isOpen
    update()
  }

  update()
  window.addEventListener('resize', update)
}

window.addEventListener('resize', function () {
  manageAllSwipers()
})

manageAllSwipers()

setupShowMore('.brands-slider__card', '.brands__btn', '../img/section-brands')
setupShowMore(
  '.equipments-slider__card',
  '.equipments__btn',
  '../img/section-equipments'
)
