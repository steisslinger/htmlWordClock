/**
 * Defines the javascript for Wordclock
 *
 * This file is part of Wordclock.
 */



/* Guest handling */
let timelyGuests        = 1;
let alwaysGuests1       = 0;
let alwaysGuests2       = 0;


let eva1                = 1;
let frank1              = 1;
let heike1              = 1;
let hannah1             = 1;

let eva2                = 0;
let frank2              = 0;
let heike2              = 0;
let hannah2             = 0;


let evaName1            = "EVA";
let frankName1          = "FRANK";
let heikeName1          = "HEIKE";
let hannahName1         = "HANNAH";

let evaName2            = "EVA";
let frankName2          = "FRANK";
let heikeName2          = "HEIKE";
let hannahName2         = "HANNAH";


let showGuests1         = 0;
let showGuests2         = 0;



$(document).ready(function() {
   updateTime();
   var timer     = setInterval("updateTime()", 5000);
   updateIndoorTemperature();
   var timerTemp = setInterval("updateIndoorTemperature()",  300000);
   updateOutdoorTemperature();
   var timerTemp = setInterval("updateOutdoorTemperature()", 300000);
});


function updateIndoorTemperature() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseIndoorXML(this);
    }
  };
  xmlhttp.open("GET", "http://192.168.1.24:8080/rest/items/Temp_EG_Living", true);
  xmlhttp.send();
}

function parseIndoorXML(xml) {
  var x, i, xmlDoc;
  xmlDoc = xml.responseXML;
  indoorTemp = "";
  x = xmlDoc.getElementsByTagName("state");
  for (i = 0; i< x.length; i++) {
    indoorTemp += x[i].childNodes[0].nodeValue;
    indoorTemp += "0";
  }
  var indoorTempFrac  = indoorTemp.slice(-2, -1)
  var indoorTempInt1  = indoorTemp.slice(-4, -3)
  var indoorTempInt2  = indoorTemp.slice(-5, -4)
  if (indoorTempInt2 == "") {
	  indoorTempInt2  = "K";
	  $('#wordclock div:is(#indoorTemperatureInt2)').removeClass('in');
  } else {
	  $('#wordclock div:is(#indoorTemperatureInt2)').addClass('in');
  }
  $('#wordclock div:is(#indoorTemperatureInt1)').addClass('in');
  $('#wordclock div:is(#indoorTemperatureFrac)').addClass('in');

  document.getElementById('indoorTemperatureFrac').innerText = indoorTempFrac;
  document.getElementById('indoorTemperatureInt1').innerText = indoorTempInt1;
  document.getElementById('indoorTemperatureInt2').innerText = indoorTempInt2;
}


function updateOutdoorTemperature() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseOutdoorXML(this);
    }
  };
  xmlhttp.open("GET", "http://192.168.1.24:8080/rest/items/Local_Temperature", true);
  xmlhttp.send();
}

function parseOutdoorXML(xml) {
  var x, i, xmlDoc;
  xmlDoc = xml.responseXML;
  outdoorTemp = "";
  x = xmlDoc.getElementsByTagName("state");
  for (i = 0; i< x.length; i++) {
    outdoorTemp += x[i].childNodes[0].nodeValue;
  }
  var outdoorTempFrac  = outdoorTemp.slice(-2, -1)
  var outdoorTempInt1  = outdoorTemp.slice(-4, -3)
  var outdoorTempInt2  = outdoorTemp.slice(-5, -4)
  if (outdoorTempInt2 == "") {
	  outdoorTempInt2  = "K";
	  $('#wordclock div:is(#outdoorTemperatureInt2)').removeClass('out');
  } else {
	  $('#wordclock div:is(#outdoorTemperatureInt2)').addClass('out');
  }
  $('#wordclock div:is(#outdoorTemperatureInt1)').addClass('out');
  $('#wordclock div:is(#outdoorTemperatureFrac)').addClass('out');

  document.getElementById('outdoorTemperatureFrac').innerText = outdoorTempFrac;
  document.getElementById('outdoorTemperatureInt1').innerText = outdoorTempInt1;
  document.getElementById('outdoorTemperatureInt2').innerText = outdoorTempInt2;
}


function updateGuest(namePrefix, isActive, activeClass, activeText, defaultTextArray) {
    const firstElement = $('#' + namePrefix + '-1');

    // Set classes
    firstElement.removeClass('eva1 eva2 frank1 frank2 heike1 heike2 hannah1 hannah2'); // remove all classes
    if (isActive) {
        firstElement.addClass(activeClass);
    }

    // Set Text
    if (isActive) {
        document.getElementById(namePrefix + '-1').innerText = activeText;
        for (let i = 2; i <= defaultTextArray.length; i++) {
            document.getElementById(namePrefix + '-' + i).innerText = '';
        }
    } else {
        defaultTextArray.forEach((char, index) => {
            document.getElementById(namePrefix + '-' + (index + 1)).innerText = char;
        });
    }
}


function updateTime(){
    $('#wordclock div:not(#fanfare)').removeClass('active').addClass('passive');
    
    var theTime = new Date();
    var hour = theTime.getHours();
    var minute = theTime.getMinutes();
    var modHour = hour % 12;
    var modMinute = Math.floor(minute / 5);
    var adjMinute = modMinute * 5;
    var fiveMinutes = adjMinute;
    
    if (adjMinute == 0){
        $('[id^="oclock-"]').addClass('active');
    } else if (adjMinute == 15) {
        modHour += 1;
    } else if (adjMinute == 20) {
        modHour += 1;
        adjMinute = 10;
        $('[id^="to-"]').addClass('active');
        $('[id^="min-30-"]').addClass('active');
    } else if (adjMinute == 25) {
        modHour += 1;
        adjMinute = 5;
        $('[id^="to-"]').addClass('active');
        $('[id^="min-30-"]').addClass('active');
    } else if (adjMinute == 30) {
        modHour += 1;
    } else if (adjMinute == 35) {
        modHour += 1;
        adjMinute = 5;
        $('[id^="past-"]').addClass('active');
        $('[id^="min-30-"]').addClass('active');
    } else if (adjMinute == 40) {
        modHour += 1;
        adjMinute = 10;
        $('[id^="past-"]').addClass('active');
        $('[id^="min-30-"]').addClass('active');
    } else if (adjMinute == 45) {
        modHour += 1;
        $('[id^="min-15-"]').addClass('active');
        $('[id^="min-45-"]').addClass('active');
    } else if (adjMinute == 50) {
        modHour += 1;
        adjMinute = 10;
        $('[id^="to-"]').addClass('active');
    } else if (adjMinute == 55) {
        modHour += 1;
        adjMinute = 5;
        $('[id^="to-"]').addClass('active');
    } else {
        $('[id^="past-"]').addClass('active');
    }
    
    if (modHour == 0) {
        modHour = 12;
    }

    $('[id^="hour-' + modHour + '-"]').addClass('active');
        
    if (modHour == 1 && adjMinute != 0) {
        $('#hour-1s' + ".hour").addClass('active');
    }
    
    $('[id^="min-' + adjMinute + '-"]').addClass('active');

    $('#wordclock div:is(#clockMinute2)').addClass('mins');
    $('#wordclock div:is(#clockMinute1)').addClass('mins');
    if (minute < 10){
        document.getElementById('clockMinute2').innerText = "0"
        document.getElementById('clockMinute1').innerText = minute
    } else {
        document.getElementById('clockMinute2').innerText = Math.floor(minute / 10);
        document.getElementById('clockMinute1').innerText = minute - Math.floor(minute / 10)*10;
    }


    /* Guest handling */
    if (timelyGuests && (fiveMinutes == 0 || fiveMinutes == 10 || fiveMinutes == 20 || fiveMinutes == 30 || fiveMinutes == 40 || fiveMinutes == 50)){
        showGuests1 = 1;
        showGuests2 = 0;
    } else if (timelyGuests){
        showGuests1 = 0;
        showGuests2 = 1;
    }

    if (showGuests1 || alwaysGuests1) {
        updateGuest('eva',    eva1,    'eva1',    evaName1,    ['E', 'V', 'A']);
        updateGuest('frank',  frank1,  'frank1',  frankName1,  ['F', 'R', 'A', 'N', 'K']);
        updateGuest('heike',  heike1,  'heike1',  heikeName1,  ['H', 'E', 'I', 'K', 'E']);
        updateGuest('hannah', hannah1, 'hannah1', hannahName1, ['H', 'A', 'N', 'N', 'A', 'H']);

        if (eva1 || frank1 || heike1 || hannah1) {
            document.getElementById('hero-e').innerText = "H";
            document.getElementById('hero-s1').innerText = "A";
            document.getElementById('hero-h').innerText = "L";
            document.getElementById('hero-i').innerText = "L";
            document.getElementById('hero-s2').innerText = "O";
            $('[id^="hero-"]').addClass('hello');
            $('#hero-t').removeClass('hello').removeClass('active');
        } else {
            document.getElementById('hero-e').innerText = "E";
            document.getElementById('hero-s1').innerText = "S";
            document.getElementById('hero-h').innerText = "H";
            document.getElementById('hero-i').innerText = "I";
            document.getElementById('hero-s2').innerText = "S";
            $('[id^="hero-"]').addClass('active');
            $('#hero-h').removeClass('active').removeClass('hello');
        }

    } else if (showGuests2 || alwaysGuests2) {
        updateGuest('eva',    eva2,    'eva2',    evaName2,    ['E', 'V', 'A']);
        updateGuest('frank',  frank2,  'frank2',  frankName2,  ['F', 'R', 'A', 'N', 'K']);
        updateGuest('heike',  heike2,  'heike2',  heikeName2,  ['H', 'E', 'I', 'K', 'E']);
        updateGuest('hannah', hannah2, 'hannah2', hannahName2, ['H', 'A', 'N', 'N', 'A', 'H']);

        if (eva2 || frank2 || heike2 || hannah2) {
            document.getElementById('hero-e').innerText = "H";
            document.getElementById('hero-s1').innerText = "A";
            document.getElementById('hero-h').innerText = "L";
            document.getElementById('hero-i').innerText = "L";
            document.getElementById('hero-s2').innerText = "O";
            $('[id^="hero-"]').addClass('hello');
            $('#hero-t').removeClass('hello').removeClass('active');
        } else {
            document.getElementById('hero-e').innerText = "E";
            document.getElementById('hero-s1').innerText = "S";
            document.getElementById('hero-h').innerText = "H";
            document.getElementById('hero-i').innerText = "I";
            document.getElementById('hero-s2').innerText = "S";
            $('[id^="hero-"]').addClass('active');
            $('#hero-h').removeClass('active').removeClass('hello');
        }

    } else {        
        $('[id^="hero-"]').addClass('active');
        $('#hero-h').removeClass('active');
    }

}
