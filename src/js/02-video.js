import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//получаем доступ
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    
// получаем данные для хранилища
const getPosition = function (currentPosition) {
localStorage.setItem("videoplayer-current-time", JSON.stringify(currentPosition));
}

const playerON = player.on('timeupdate', throttle(getPosition, 1000))

//автовоспроизведение
const pausedTime = localStorage.getItem("videoplayer-current-time");
const startTime = JSON.parse(pausedTime);

player.setCurrentTime(startTime.seconds||0).then(function(seconds) {

}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
            default:
            break;
    }
});