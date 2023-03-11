import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    
const getPosition = function (currentPosition) {
localStorage.setItem("videoplayer-current-time", JSON.stringify(currentPosition));
}

const playerON = player.on('timeupdate', throttle(getPosition, 1000))



const pausedTime = localStorage.getItem("videoplayer-current-time");
const startTime = JSON.parse(pausedTime);

player.setCurrentTime(startTime.seconds||0).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});