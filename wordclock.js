/**
 * Defines the javascript for Wordclock
 *
 * This file is part of Wordclock.
 *
 * Wordclock is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wordclock is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @category   Wordclock
 * @package    Wordclock
 * @author     Mike Quinn <mikeqtoo@blueyonder.co.uk>
 * @copyright  2011 Mike Quinn
 * @license    http://www.gnu.org/licenses/ GNU General Public License
 */
$(document).ready(function() {
   $('#wordclock>div div:first-child').css('text-align', 'left');
   $('#wordclock>div div:last-child').css('text-align', 'right');
   updateTime();
   var timer = setInterval("updateTime()", 5000);
});

function updateTime(){
    $('#wordclock div div:not(#fanfare)').removeClass('active');
    
    var theTime = new Date();
    var hour = theTime.getHours();
    var minute = theTime.getMinutes();
    var modHour = hour % 12;
    var modMinute = Math.floor(minute / 5);
    var adjMinute = modMinute * 5;
    
    if (adjMinute === 0){ 
        $('#oclock').addClass('active');
    } else if (adjMinute == 15) {
        modHour += 1;
    } else if (adjMinute == 20) {
        modHour += 1;
        adjMinute = 10;
        $('#to').addClass('active');
        $('#min-30').addClass('active');
    } else if (adjMinute == 25) {
        modHour += 1;
        adjMinute = 5;
        $('#to').addClass('active');
        $('#min-30').addClass('active');
    } else if (adjMinute == 30) {
        modHour += 1;
    } else if (adjMinute == 35) {
        modHour += 1;
        adjMinute = 5;
        $('#past').addClass('active');
        $('#min-30').addClass('active');
    } else if (adjMinute == 40) {
        modHour += 1;
        adjMinute = 10;
        $('#past').addClass('active');
        $('#min-30').addClass('active');
    } else if (adjMinute == 45) {
        modHour += 1;
        $('#min-15, #min-45').addClass('active');
    } else if (adjMinute == 50) {
        modHour += 1;
        adjMinute = 10;
        $('#to').addClass('active');
    } else if (adjMinute == 55) {
        modHour += 1;
        adjMinute = 5;
        $('#to').addClass('active');
    } else {
        $('#past').addClass('active');
    }
    
    $('#hour-' + modHour + ".hour").addClass('active');
    
    switch (adjMinute) {
    case 0:
    case 15:
    case 30:
    case 45:
        $('#minute').removeClass('active');
        $('#past').removeClass('active');
        break;
    default:
        // $('#minute').addClass('active');
    }
    
    $('#min-' + adjMinute).addClass('active');
}