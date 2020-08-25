'use strict';
(function () {
let inputs = document.querySelectorAll('input');

let inputsActivation = function() {
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
let textarea = document.querySelector('#description');

let selectsFun = function() {
    selects.forEach(select => {
        if(mapMain.classList.contains('map--faded')){
            select.disabled = true;
            textarea.readOnly = true;
        } else {
            select.disabled = false;
            textarea.removeAttribute('readonly');
        }
    });
}

let mapMain = document.querySelector('.map');
let mapPinMain = document.querySelector('.map__pin--main');
let addressInput = document.getElementById('address');

let adForm = document.querySelector('.ad-form');
let getAddressInput = function() {
    addressInput.value = (parseInt(mapPinMain.style.left, 10) + 31 + ' px') + ' ' + (parseInt(mapPinMain.style.top, 10) + 31 + ' px');
}

let mainPinUp = mapPinMain.addEventListener('mouseup', function(evt) {
    evt.preventDefault();
    mapMain.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    selectsFun();
    inputsActivation();
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
})()