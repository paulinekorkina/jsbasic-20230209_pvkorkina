import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.currentSlideNumber = 0;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    for (let slide of this.slides) {
      let slideElem = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}"
            class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      this.sub('inner').append(slideElem);
    }

    this.update();
  }

  addEventListeners() {
    this.elem.onclick = ({target}) => {
      let button = target.closest('.carousel__button');
  
      if (button) {
        let customEv = new CustomEvent('product-add', {
          detail: button.closest('[data-id]').dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(customEv);
      }

      if (target.closest('.carousel__arrow_right')) {
        this.next();
      }

      if (target.closest('.carousel__arrow_left')) {
        this.prev();
      }
    }
  }

  sub(ref) {
    return this.elem.querySelector(`.carousel__${ref}`);
  }

  next() {
    this.currentSlideNumber++;
    this.update();
  }

  prev() {
    this.currentSlideNumber--;
    this.update();
  }

  update() {
    let offset = -this.sub('inner').offsetWidth * this.currentSlideNumber;
    this.sub('inner').style.transform = `translateX(${offset}px)`;

    if (this.currentSlideNumber >= this.slides.length - 1) {
      this.sub('arrow_right').style.display = 'none';
    } else {
      this.sub('arrow_right').style.display = '';
    }

    if (this.currentSlideNumber <= 0) {
      this.sub('arrow_left').style.display = 'none';
    } else {
      this.sub('arrow_left').style.display = '';
    }
  }
}
