'use strict';

// Константы для всплывающего облака
var COLOR_MAIN_CLOUD = "rgba(255, 255, 255, 1)";
var COLOR_SHADOW_CLOUD = "rgba(0, 0, 0, 0.7)";
var CLOUD_POS_X = 100;
var CLOUD_POS_Y = 10;
var WINDOW_HEIGHT = 270;
var WINDOW_WIDTH = 420;

// Константы для диаграмм
var BLUE_COLOR = 255;
var DEFAULT_COLOR = "rgba(0, 0, 0, 1)";
var DIAGRAMM_HEIGHT = 150;
var DIAGRAMM_WIDTH = 40;
var DIAGRAMM_SPACE_BETWEEN = 50;
var FONT_GAP = 15;
var GAP = 10;
var CURRENT_PLAYER_COLOR = "rgba(255, 0, 0, 1)";

function renderCloud (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function getMaxElement (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }
    return maxElement;
}

window.renderStatistics = function(ctx, names, times) {

    renderCloud(ctx, CLOUD_POS_X + GAP, CLOUD_POS_Y + GAP, COLOR_SHADOW_CLOUD);
    renderCloud(ctx, CLOUD_POS_X, CLOUD_POS_Y, COLOR_MAIN_CLOUD);

    var maxTime = getMaxElement(times);

    ctx.fillStyle = DEFAULT_COLOR;
    ctx.font = '16px PT Mono black';
    ctx.fillText('Ура, вы победили!', WINDOW_WIDTH/2, 30);
    ctx.fillText('Список результатов:', WINDOW_WIDTH/2, 50);

    for (var i = 0; i < names.length; i++) {

        // Вывод имени игрока
        ctx.fillText(names[i], CLOUD_POS_X + GAP * 2 + FONT_GAP + (GAP + DIAGRAMM_SPACE_BETWEEN + DIAGRAMM_WIDTH) * i, WINDOW_HEIGHT - CLOUD_POS_Y - GAP);
        
        // Отрисовка диаграммы
        ctx.fillStyle = "rgba(0, 0," + (BLUE_COLOR - FONT_GAP * i * 5) + ", " + (1 - i/10) + ")";
        if (names[i] === 'Вы') {
            ctx.fillStyle = CURRENT_PLAYER_COLOR;
        }
        ctx.fillRect(CLOUD_POS_X + GAP * 2 + FONT_GAP + (GAP + DIAGRAMM_SPACE_BETWEEN + DIAGRAMM_WIDTH) * i, WINDOW_HEIGHT - CLOUD_POS_Y - GAP - FONT_GAP, DIAGRAMM_WIDTH, - (DIAGRAMM_HEIGHT * times[i]) / maxTime);

        // Вывод времени, за которое игрок прошел игру
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.fillText(Math.round(times[i]), CLOUD_POS_X + GAP * 2 + FONT_GAP + (GAP + DIAGRAMM_SPACE_BETWEEN + DIAGRAMM_WIDTH) * i, WINDOW_HEIGHT - CLOUD_POS_Y - GAP * 2 - FONT_GAP - (DIAGRAMM_HEIGHT * times[i]) / maxTime);
    }
}