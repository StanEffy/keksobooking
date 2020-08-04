'use strict';

let hostDescription = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

(function() {
	window.utils = {
    PIN_WIDTH: 46,
    PIN_HEIGHT: 46,
    IMAGE_WIDTH: 40,
    IMAGE_HEIGHT: 40,
    MAIN_PIN_HEIGHT: 78,
    MAIN_PIN_WIDTH: 65,
    MAX_ADS_COUNT: 5,
    CHECK_TIMES: ['12:00', '13:00', '14:00'],
    PRICE_LOW: 10000,
    PRICE_MIDDLE: 50000,
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27
	}
})();

let getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

let typeList = ["palace", "flat", "house", "bungalo"];
let maxRoom = 5;
let checkinList = ["12:00", "13:00", "14:00"];
let checkoutList = ["12:00", "13:00", "14:00"];
let featuresList = [ "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
let photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

let locationY = function() {
	let locY = getRandomInt(630);
	if (locY < 130) {
		locY == 130;
	}else{};
	return locY;
}

let numbers = [];
let currentNumInd = 0;

//This function create an array with random unique indexes for title
//and avatar
let getNumbers = function () {

	do {
	let num = getRandomInt(9);
	if(!numbers.includes(num)){
		numbers.push(num);
	}} while(numbers.length <= 8);
}

let newNum = 0;

let getAvatar = function() {
	newNum++;
	return 'img/avatars/user0' + `${newNum}` + '.png'
	
}

let getNums = function() {
let nums = [];
	for(let i = 0; nums.length < 8; i++){
		let j = getRandomInt(hostDescription.length);
		if(!nums.includes(j)){
			nums.push(j);
		} else {

		}
	}
	numbers = nums;
	return numbers;
};

getNums();

let getTitle = function() { 
	return hostDescription[numbers.pop()]
};

let getAddress = function () {
	return toString(location.x, location.y);
}

let getPrice = function() {
	let price = getRandomInt(1000000);
	if(price < 1000) {
		return 1000
	}else {
		return price
	}
}

let getType = function() {
	return typeList[getRandomInt(4)];
}

let getRoom = function(){
	let num = getRandomInt(maxRoom);
	if(num == 0) {
		return 1;
	} else {
		return num;
	}
	 
}

let getCapacity = function() {
	return getRandomInt(50);
}

let getCheckIn = function() {
	return checkinList[getRandomInt(checkinList.length)];
}
let getCheckOut = function() {
	return checkoutList[getRandomInt(checkoutList.length)]
}
let getFeatures = function() {
	return featuresList.slice([getRandomInt(featuresList.length)],)
}

let getDescription = function() {
	return '';
}
let getPhoto = function() {
	let photoNums = [];
	for(;photoNums.length <= 2;){
		let num = getRandomInt(3);
		if(!photoNums.includes(num)){
			photoNums.push(num);
		} else {}
	}
	return photoNums;
}

let getLocationY = function() {
	let num = getRandomInt(630);
	if(num < 130) {
		num = num + 130;
		return num;
	} else {
		return num;
	 }
	
}

let getLocationX = function() {
	return getRandomInt(1100);
}
/*List for randomly generated objects*/
let announcementList = [];

getNumbers();

let inputs = document.querySelectorAll('input');

let inputsFun = function() {
	inputs.forEach(input => {
		if(mapMain.classList.contains('map--faded')){
		 input.disabled = true;
	} else {
		 input.disabled = false;
		}
	});
}
let mapPins = document.querySelector('.map__pins');

let selects = document.querySelectorAll('select');

let selectsFun = function() {
	selects.forEach(select => {
			if(mapMain.classList.contains('map--faded')){
			 select.disabled = true;
		} else {
			 select.disabled = false;
			}
		});	
}

	
let textarea = document.querySelector('#description');

let textareaFun = function (){
	if(mapMain.classList.contains('map--faded')){
		 textarea.readOnly = true;
	} else {
		 textarea.removeAttribute('readonly');
		}
}

let mapMain = document.querySelector('.map')

let addressInput = document.getElementById('address');
let mapPinMain = document.querySelector('.map__pin--main');
let adForm = document.querySelector('.ad-form');
let getAddressInput = function() {
	addressInput.value = (parseInt(mapPinMain.style.left, 10) + 31 + ' px') + ' ' + (parseInt(mapPinMain.style.top, 10) + 31 + ' px'); 
}
let mainPinUp = mapPinMain.addEventListener('mouseup', function(evt) {
	evt.preventDefault();
	mapMain.classList.remove('map--faded');
	adForm.classList.remove('ad-form--disabled');
	textareaFun();
	selectsFun();
	inputsFun();
	getAddressInput();

});

let shiftX;
let shiftY;



let getMargin = function(){
	if(window.innerWidth > 1200){
		return (window.innerWidth - 1200) / 2; 
	} else {
		return 0;
	}
}

let mainPinDown = mapPinMain.addEventListener('mousedown', function(evt){
	if(!mapMain.classList.contains('map--faded')){
		shiftX = evt.offsetX;
    	shiftY = evt.offsetY;

	let mapPinMove = function(moveEvt) {
	moveEvt.preventDefault();

	mapPinMain.style.left = (moveEvt.pageX - getMargin() - shiftX) + 'px';
	mapPinMain.style.top = (moveEvt.pageY - shiftY) + 'px';
	if(moveEvt.pageX - getMargin() - shiftX < 0){
		mapPinMain.style.left = '0px'
	} else if(moveEvt.pageX - getMargin() - shiftX > 1150){
		mapPinMain.style.left = '1150px'};
	if(moveEvt.pageY - shiftY < 100) {
		mapPinMain.style.top = '100px';
	} else if(moveEvt.pageY - shiftY > 625){
		mapPinMain.style.top = '625px';
	}
		getAddressInput();
	};

	document.addEventListener('mousemove', mapPinMove);
	
	let upPinMove = function (upEvt) {
      upEvt.preventDefault();
      
      document.removeEventListener('mousemove', mapPinMove);
      document.removeEventListener('mouseup', upPinMove);
    };

    document.addEventListener('mouseup', upPinMove);
}});

(function() {

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

	let successHandler = function (pins) {
    let fragment = document.createDocumentFragment();
    
    for (let i = 0; i < pins.length - 1; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPins.appendChild(fragment);
    
    mapMain.classList.remove('hidden');
  };
  let errorHandler = function (errorMessage) {
    let node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
  };
  
  window.backend.load(successHandler, errorHandler);
})();

/*card*/

(function () {

  let template = document.querySelector('template').content;

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
  	console.log(array.length);
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
		}))

	let mapPinsArrayPseudo = document.querySelectorAll('.map__pin:not(.map__pin--main)');
	
	mapPinsArrayPseudo.forEach(function(elem, i, arr){
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




