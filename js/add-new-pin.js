'use strict';

(function () {
    let createdPins = [];
    let createdArticle = [];
    let avatarImg = document.querySelector('.ad-form-header__preview img')

    let imgPin;
    let imgPin2;

    avatar.addEventListener('change', function (evt) {
        let file = avatar.files[0];

        let reader = new FileReader();
        avatarImg.file = file;

        let src = reader.readAsDataURL(file);


        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            };
        })(avatarImg);

        avatarImg.src = src;
        imgPin = avatarImg.cloneNode(false);
        imgPin2 = avatarImg.cloneNode(false);
    })
    let imagesFormCover = document.querySelector('.ad-form__photo');

    let images = document.querySelector('#images');
    images.addEventListener('change', function () {
        let addImg = document.createElement('img');
        addImg.classList.add('popup__photo');
        imagesFormCover.appendChild(addImg);
        imagesFormCover.style.width = 'auto';
        imagesFormCover.style.height = 'auto';
        imagesFormCover.style.maxWidth = '300px';

        let file = images.files[0];

        let reader = new FileReader();
        addImg.file = file;

        let src = reader.readAsDataURL(file);
        reader.onload = (function(img) {
            return function(e) {
                img.src = e.target.result;
            };
        })(addImg);
        addImg.src = src;
        addImg.style.height = '40px';
        addImg.style.width = '45px';

    })
    let makePin = function () {
        let title = document.querySelector('#title');
        let address = document.querySelector('#address');
        let type = document.querySelector('#type');
        let price = document.querySelector('#price');
        let timein = document.querySelector('#timein');
        let timeout = document.querySelector('#timeout');
        let roomNumber = document.querySelector('#room_number');
        let capacity = document.querySelector('#capacity');

        let description = document.querySelector('#description');
        let features = document.querySelector('.features');

        let mapCard = document.querySelector('.map__card');
        let newArticle = mapCard.cloneNode(true);
        let ava = newArticle.querySelector('.popup__avatar');
        ava.src = avatarImg.src;
        let addTitle = newArticle.querySelector('h3');
        addTitle.textContent = title.value;
        let addAddress = newArticle.querySelector('small');
        addAddress.textContent = address.value;
        let addPrice = newArticle.querySelector('.popup__price');
        addPrice.textContent = `${price.value}₽/ночь`;
        let addType = newArticle.querySelector('h4');
        if (type.value === 'flat') {
            addType.textContent = 'Квартира';
        } else if (type.value === 'bungalo') {
            addType.textContent = 'Бунгало';
        } else if (type.value === 'palace') {
            addType.textContent = 'Дворец';
        } else {
            addType.textContent = 'Дом';
        }

        let addRoomGuest = newArticle.querySelector('p:nth-of-type(3)');
        addRoomGuest.textContent = `${roomNumber.value} комнат для ${capacity.value} гостей`;
        let addCheck = newArticle.querySelector('p:nth-of-type(4)');
        addCheck.textContent = `Заезд после ${timein.value}, выезд до ${timeout.value} гостей`;
        let addFeatures = newArticle.querySelector('.popup__features');
        addFeatures.innerHTML = '';

        let featuresList = features.querySelectorAll('input');
        for(let i = 0; i < featuresList.length; i++){
            if(featuresList[i].checked){
                let classString = 'feature--' + featuresList[i].value;
                let featureLi = document.createElement('li');
                featureLi.classList.add(classString);
                featureLi.classList.add('feature');
                addFeatures.appendChild(featureLi);
            }
        }
        let addDescription = newArticle.querySelector('p:nth-of-type(5)');
        addDescription.textContent = description.value;

        let popupPics = newArticle.querySelector('.popup__photos');
        popupPics.innerHTML = '';
        let tempPics = imagesFormCover.querySelectorAll('.popup__photo');
        for(let j = 0; j < tempPics.length; j++){
            let newPic = tempPics[j].cloneNode();
            popupPics.appendChild(newPic);
        }
        imagesFormCover.innerHTML = '';


        let map = document.querySelector('.map');
        let popupClose = newArticle.querySelector('.popup__close');

        popupClose.addEventListener('click', function(evt){
            evt.preventDefault();
            this.parentNode.classList.add('hidden');
        })
        let mainPin = document.querySelector('.map__pin--main');

        let newPin = mainPin.cloneNode(false);
        newPin.classList.remove('map__pin--main');

        let pinAva = document.createElement('img');
        pinAva.width = '40';
        pinAva.height = '40';
        pinAva.src = avatarImg.src;
        newPin.appendChild(pinAva);
        newPin.style.left = mainPin.style.left;
        newPin.style.top = mainPin.style.top;

        let pins = document.querySelector('.map__pins');
        createdPins.push(newPin);

        newPin.dataset.type = type.value;
        newPin.dataset.price = price.value;
        newPin.dataset.rooms = roomNumber.value;
        newPin.dataset.guests = capacity.value;

        pins.appendChild(newPin);

        createdArticle.push(newArticle);
        map.appendChild(newArticle);

        mainPin.style.left = "601px";
        mainPin.style.top = "406px";

        title.value = '';
        address.value = '601 px 406px';
        type.value = 'flat';
        price.value = '';
        timein.value = '12:00';
        timeout.value = '12:00';
        roomNumber.value = '1';
        capacity.value = '3';
        description.value = '';
    }

    let appendArticle = document.querySelector('.ad-form__submit');
    appendArticle.addEventListener('click', function (evt) {
        evt.preventDefault();
        makePin();
        refreshPins();
    });

    let refreshPins = function(){
        for(let i = 0; i < createdPins.length; i++){
            createdPins[i].addEventListener('click', function(evt){
                evt.preventDefault();
                createdArticle[i].classList.remove('hidden');
            })
        }
    }

})()