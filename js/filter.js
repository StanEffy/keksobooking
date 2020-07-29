'use strict';

(function () {
    let selectType = document.querySelector('#housing-type');
    let selectPrice = document.querySelector('#housing-price');
    let selectRooms = document.querySelector('#housing-rooms');
    let selectGuests = document.querySelector('#housing-guests');
    let selectFeatures = document.querySelector('#housing-features');

    let mapPins = document.querySelector('.map__pins');
    let pinsArray = mapPins.querySelectorAll('.map__pin');

    let hidePin = function(pin, datatype, datavalue){
        if(datatype !== datavalue && !pin.classList.contains('map__pin--main') && !pin.classList.contains('visually-hidden')){
            pin.classList.add('visually-hidden');
        }
    };
    let showPins = function(array){
        pinsArray.forEach(pin => pin.classList.remove('visually-hidden'));
    }

    selectType.addEventListener('change', function (evt) {
        let value = evt.target.value;

        pinsArray = mapPins.querySelectorAll('.map__pin');

        switch (value) {
            case 'palace':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'flat':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'house':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'bungalo':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'any':
                showPins();
                break;

        }
    })
    selectPrice.addEventListener('change', function (evt) {
        let value = evt.target.value;

        pinsArray = mapPins.querySelectorAll('.map__pin');

        switch (value) {
            case 'high':
                pinsArray.forEach(pin => {
                    if(pin.dataset.price < '50000'){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case 'middle':
                pinsArray.forEach(pin => {
                    if(pin.dataset.price < '10000' || pin.dataset.price > '50000'){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case 'low':
                pinsArray.forEach(pin => {
                    if(pin.dataset.price > '9999'){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case 'any':
                showPins();
                break;

        }
    })
    selectRooms.addEventListener('change', function (evt) {
        let value = evt.target.value;

        pinsArray = mapPins.querySelectorAll('.map__pin');

        switch (value) {
            case 'palace':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'flat':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'house':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'bungalo':
                pinsArray.forEach(pin => {
                    hidePin(pin, pin.dataset.type, value)
                })
                break;
            case 'any':
                showPins();
                break;

        }
    })
})()

/*Что можно сделать: массив, в который пихаются ныне показываемые индексы пинов*/