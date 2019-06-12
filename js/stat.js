'use strict';

// Константы для всплывающего облака
var COLOR_MAIN_CLOUD = 'rgba(255, 255, 255, 1)';
var COLOR_SHADOW_CLOUD = 'rgba(0, 0, 0, 0.7)';
var CLOUD_POS_X = 100;
var CLOUD_POS_Y = 10;
var WINDOW_HEIGHT = 270;
var WINDOW_WIDTH = 420;

// Константы для диаграмм
var BLUE_COLOR = 255;
var DEFAULT_COLOR = 'rgba(0, 0, 0, 1)';
var DIAGRAMM_HEIGHT = 150;
var DIAGRAMM_WIDTH = 40;
var DIAGRAMM_SPACE_BETWEEN = 50;
var FONT_GAP = 15;
var GAP = 10;
var CURRENT_PLAYER_NAME = 'Вы';
var CURRENT_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function getMaxElement(arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}


window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === CURRENT_PLAYER_NAME && i !== 0) {
      // После прохождения условия меняем местами элементы в массиве имен, потом в массиве времени
      var temp = names[i];
      names[i] = names[0];
      names[0] = temp;

      temp = times[i];
      times[i] = times[0];
      times[0] = temp;
      break;
    }
  }

  renderCloud(ctx, CLOUD_POS_X + GAP, CLOUD_POS_Y + GAP, COLOR_SHADOW_CLOUD);
  renderCloud(ctx, CLOUD_POS_X, CLOUD_POS_Y, COLOR_MAIN_CLOUD);

  ctx.fillStyle = DEFAULT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', WINDOW_WIDTH / 2, 30);
  ctx.fillText('Список результатов:', WINDOW_WIDTH / 2, 50);

  for (i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_POS_X + GAP * 2 + FONT_GAP + (GAP + DIAGRAMM_SPACE_BETWEEN + DIAGRAMM_WIDTH) * i, WINDOW_HEIGHT - CLOUD_POS_Y - GAP);

    // Отрисовка диаграммы
    ctx.fillStyle = 'rgba(0, 0,' + Math.round(Math.random() * BLUE_COLOR) + ')';
    if (names[i] === CURRENT_PLAYER_NAME) {
      ctx.fillStyle = CURRENT_PLAYER_COLOR;
    }
    ctx.fillRect(CLOUD_POS_X + GAP * 2 + FONT_GAP + (GAP + DIAGRAMM_SPACE_BETWEEN + DIAGRAMM_WIDTH) * i, WINDOW_HEIGHT - CLOUD_POS_Y - GAP - FONT_GAP, DIAGRAMM_WIDTH, -(DIAGRAMM_HEIGHT * times[i]) / maxTime);

    // Вывод времени, за которое игрок прошел игру
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.fillText(Math.round(times[i]), CLOUD_POS_X + GAP * 2 + FONT_GAP + (GAP + DIAGRAMM_SPACE_BETWEEN + DIAGRAMM_WIDTH) * i, WINDOW_HEIGHT - CLOUD_POS_Y - GAP * 2 - FONT_GAP - (DIAGRAMM_HEIGHT * times[i]) / maxTime);
  }
};
