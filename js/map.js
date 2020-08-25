'use strict';
let mapMain = document.querySelector('.map');
let mapPins = document.querySelector('.map__pins');

let getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

/*rendering pins and articles from server*/

(function () {
  let template = document.querySelector('template').content;

  let renderPin = function(pin) {

        let pinElement = document.createElement('button');
        pinElement.classList.add('map__pin');

        pinElement.dataset.type = pin.offer.type;
        pinElement.dataset.price = pin.offer.price;
        pinElement.dataset.rooms = pin.offer.rooms;
        pinElement.dataset.guests = pin.offer.guests;

        pinElement.style.left = pin.location.x + 'px';
        pinElement.style.top = pin.location.y + 'px';

        let img = document.createElement('img');
        img.src = pin.author.avatar;
        img.width = '40';
        img.height = '40';
        pinElement.appendChild(img);

        return pinElement;
    };

    let renderServerPins = function(pins){
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < pins.length - 1; i++) {
            fragment.appendChild(renderPin(pins[i]));
        }
        mapPins.appendChild(fragment);

        mapMain.classList.remove('hidden');
    }


  let renderFeatures = function (array) {
    let fragment = document.createDocumentFragment();
    array.forEach (function (elem) {
      let container = document.createElement('li');
      container.className = 'feature';
      container.classList.add('feature--' + elem);
      fragment.appendChild(container);
    });
    return fragment;
  };

  let renderPhotos = function (array) {
    let fragment = document.createDocumentFragment();
    array.forEach(function (elem) {
      let image = document.createElement('img');
      image.classList.add('popup__photo');
      image.style.width = '45px';
      image.style.height = '40px';

      image.src = elem;
      fragment.appendChild(image);
    });
    return fragment;
  };

  let createOffers = function (array) {

    let mapFiltersContainer = document.querySelector('.map__filters-container');
    let cardTemplate = template.querySelector('.map__card');
    for (let i = 0; i < array.length; i++) {
      let cardTemplateItem = cardTemplate.cloneNode(true);

      let addTitle = cardTemplateItem.querySelector('h3');
      let addAdress = cardTemplateItem.querySelector('p small');
      let addPrice = cardTemplateItem.querySelector('.popup__price');
      let addType = cardTemplateItem.querySelector('h4');
      let addRoomGuest = cardTemplateItem.querySelector('p:nth-of-type(3)');
      let addCheck = cardTemplateItem.querySelector('p:nth-of-type(4)');
      let addFeatures = cardTemplateItem.querySelector('.popup__features');
      let addDescription = cardTemplateItem.querySelector('p:nth-of-type(5)');
      let addAvatar = cardTemplateItem.querySelector('.popup__avatar');
      let addImages = cardTemplateItem.querySelector('.popup__photos');

      addTitle.textContent = array[i].offer.title;
      addAdress.textContent = array[i].offer.adress;
      addPrice.innerHTML = array[i].offer.price + '&#x20bd;/ночь';

      if (array[i].offer.type === 'flat') {
        addType.textContent = 'Квартира';
      } else if (array[i].offer.type === 'bungalo') {
        addType.textContent = 'Бунгало';
      } else {
        addType.textContent = 'Дом';
      }

      addRoomGuest.textContent = array[i].offer.rooms + ' комнаты ' + 'для ' + array[i].offer.guests + ' гостей';
      addCheck.textContent = 'Заезд после ' + array[i].offer.checkin + ', выезд до ' + array[i].offer.checkout;
      addFeatures.innerHTML = '';
      addFeatures.appendChild(renderFeatures(array[i].offer.features));
      addImages.innerHTML = '';
      
      addImages.appendChild(renderPhotos(array[i].offer.photos));
      addDescription.textContent = array[i].offer.description;
      addAvatar.setAttribute('src', array[i].author.avatar);
       cardTemplateItem.classList.add('hidden');
      mapMain.insertBefore(cardTemplateItem, mapFiltersContainer);
    }
    let popupClose = document.querySelectorAll('.popup__close');
	let popup = document.querySelectorAll('.popup');

	popupClose.forEach(elem => elem.addEventListener('click', function(evt){
			evt.preventDefault();
			this.parentNode.classList.add('hidden');
		}));
    renderServerPins(array);
	let mapPinsArray = document.querySelectorAll('.map__pin:not(.map__pin--main)');
	
	mapPinsArray.forEach(function(elem, i, arr){
		elem.addEventListener('click', function(evt){
			evt.preventDefault();
				if(popup[i].classList.contains('hidden')){
					popup[i].classList.remove('hidden');
					} else {
					popup[i].classList.add('hidden');
					}
		})
	});

  };
 window.backend.load(createOffers, window.errorHandler);
})();




