'use strict';

// Константы
var QUANTITY_OF_PERSONS = 4;

// Массивы данных
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

similarListElement.appendChild(getDomElemets());

userDialog.querySelector('.setup-similar').classList.remove('hidden');
