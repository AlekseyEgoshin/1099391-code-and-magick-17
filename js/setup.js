'use strict';

// Константы
var QUANTITY_OF_PERSONS = 4;
var ESC_KEY = 27;
var ENTER_KEY = 13;

// Массивы данных
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Функция для получения случайного значения
function getIndex(length) {
  return Math.floor(Math.random() * length);
}

// Функция для получения объекта с данными магов
function getSimilarPerson(names, secondNames, coatColors, eyesColors) {
  var wizards = [];

  for (var i = 0; i < QUANTITY_OF_PERSONS; i++) {
    wizards[i] = {};
    wizards[i].name = names[getIndex(names.length)] + ' ' + secondNames[getIndex(secondNames.length)];
    wizards[i].coatColor = coatColors[getIndex(coatColors.length)];
    wizards[i].eyesColor = eyesColors[getIndex(eyesColors.length)];
  }

  return wizards;
}

// Функция для отрисовки мага
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
}

function getDomElemets() {
  // Получаем массив объектов с информацией по магам
  var wizards = getSimilarPerson(FIRST_NAMES, SECOND_NAMES, COAT_COLORS, EYES_COLORS);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < QUANTITY_OF_PERSONS; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
}

var Settings = document.querySelector('.setup');

var similarListElement = Settings.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

similarListElement.appendChild(getDomElemets());

Settings.querySelector('.setup-similar').classList.remove('hidden');


// Модуль 4, задание 1
var openSettings = document.querySelector('.setup-open');
var closeSettings = Settings.querySelector('.setup-close');
var userIcon = document.querySelector('.setup-open-icon');
userIcon.tabIndex = '0';
closeSettings.tabIndex = '0';

var coatColor = document.querySelector('.setup-wizard .wizard-coat');
var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var fireballColor = document.querySelector('.setup-fireball-wrap');
var saveButton = document.querySelector('.setup-submit');

// Блок для открытия/закрытия поп-апа
function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEY && !this.querySelector('.setup-user-name:focus')) {
    closePopup();
  }
}

function openPopup(){
  Settings.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

  coatColor.addEventListener('click', function () {
    coatColor.style.fill = COAT_COLORS[getIndex(COAT_COLORS.length)];
  })

  eyesColor.addEventListener('click', function () {
    eyesColor.style.fill = EYES_COLORS[getIndex(EYES_COLORS.length)];
  })

  fireballColor.addEventListener('click', function () {
    fireballColor.style.background = FIREBALL_COLORS[getIndex(FIREBALL_COLORS.length)];
    fireballColor.querySelector('input').value = FIREBALL_COLORS[getIndex(FIREBALL_COLORS.length)];
  })
};

function closePopup() {
  Settings.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

openSettings.addEventListener('click', function () {
  openPopup();
});

userIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    openPopup();
  }
});

closeSettings.addEventListener('click', function () {
  closePopup()
});

closeSettings.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    closePopup()
  }
});
