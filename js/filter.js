'use strict';

(function () {
    let selectType = document.querySelector('#housing-type');
    let selectPrice = document.querySelector('#housing-price');
    let selectRooms = document.querySelector('#housing-rooms');
    let selectGuests = document.querySelector('#housing-guests');
    let selectFeatures = document.querySelector('#housing-features');

    let mapFilters = document.querySelector('.map__filters');
    let selectsAll = mapFilters.querySelectorAll('select');

    let mapPins = document.querySelector('.map__pins');
    let pinsArray = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    let wasFiltered = false;

    let filteredArray = [pinsArray];

    let wasItFiltered = function(){
        selectsAll.forEach(function (element) {
            if(element.value !== 'any'){
                wasFiltered = true;
            }
        })
    }

    let hidePin = function(pin, pinDataType, choosenFilterValue){
        if(pinDataType !== choosenFilterValue){
            pin.classList.add('visually-hidden');
        }
    };

    let showPins = function(array){
        pinsArray.forEach(pin => pin.classList.remove('visually-hidden'));
    }

    selectType.addEventListener('change', function (evt) {
        let value = evt.target.value;
        console.log(value);
        filteredArray = [pinsArray];
        console.log(filteredArray);
        pinsArray = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

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

        pinsArray = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

        switch (value) {
            case 'high':
                pinsArray.forEach(pin => {
                    if(pin.dataset.price < 50000){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case 'middle':
                pinsArray.forEach(pin => {
                    if(pin.dataset.price < 10000 || pin.dataset.price > 50000){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case 'low':
                pinsArray.forEach(pin => {
                    if(pin.dataset.price > 10000){
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

        pinsArray = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

        switch (value) {
            case '1':
                pinsArray.forEach(pin => {
                    if(pin.dataset.rooms != 1){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case '2':
                pinsArray.forEach(pin => {
                    if(pin.dataset.rooms != 2){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case '3':
                pinsArray.forEach(pin => {
                    if(pin.dataset.rooms != 3){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case 'any':
                showPins();
                break;
        }
    })
    selectGuests.addEventListener('change', function (evt) {
        let value = evt.target.value;

        pinsArray = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

        switch (value) {
            case '0':
                pinsArray.forEach(pin => {
                    if(pin.dataset.guests != 0){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case '1':
                pinsArray.forEach(pin => {
                    if(pin.dataset.guests != 1){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case '2':
                pinsArray.forEach(pin => {
                    if(pin.dataset.guests != 2){
                        pin.classList.add('visually-hidden');
                    }
                })
                break;
            case 'any':
                showPins();
                break;
        }
    })
})()

/*Что можно сделать: массив, в который пихаются ныне показываемые индексы пинов*/