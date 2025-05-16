/**
 * Defines the javascript for Wordclock
 *
 * This file is part of Wordclock.
 */



$(document).ready(function() {
   // $('#wordclock>div div:first-child').css('text-align', 'left');
   // $('#wordclock>div div:last-child').css('text-align', 'right');
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
	  $('#wordclock div div:is(#indoorTemperatureInt2)').removeClass('in');
  } else {
	  $('#wordclock div div:is(#indoorTemperatureInt2)').addClass('in');
  }
  $('#wordclock div div:is(#indoorTemperatureInt1)').addClass('in');
  $('#wordclock div div:is(#indoorTemperatureFrac)').addClass('in');

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
	  $('#wordclock div div:is(#outdoorTemperatureInt2)').removeClass('out');
  } else {
	  $('#wordclock div div:is(#outdoorTemperatureInt2)').addClass('out');
  }
  $('#wordclock div div:is(#outdoorTemperatureInt1)').addClass('out');
  $('#wordclock div div:is(#outdoorTemperatureFrac)').addClass('out');

  document.getElementById('outdoorTemperatureFrac').innerText = outdoorTempFrac;
  document.getElementById('outdoorTemperatureInt1').innerText = outdoorTempInt1;
  document.getElementById('outdoorTemperatureInt2').innerText = outdoorTempInt2;
}



function updateTime(){
    $('#wordclock div div:not(#fanfare)').removeClass('active').addClass('passive');
    
    var theTime = new Date();
    var hour = theTime.getHours();
    var minute = theTime.getMinutes();
    var modHour = hour % 12;
    var modMinute = Math.floor(minute / 5);
    var adjMinute = modMinute * 5;
    
    if (adjMinute == 0){
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
    
    if (modHour == 0) {
        modHour = 12;
    }

    $('#hour-' + modHour + ".hour").addClass('active');
	if (modHour == 1 && adjMinute != 0) {
		$('#hour-1s' + ".hour").addClass('active');
	}
    
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

    $('#wordclock div div:is(#clockMinute2)').addClass('mins');
    $('#wordclock div div:is(#clockMinute1)').addClass('mins');
    if (minute < 10){
        document.getElementById('clockMinute2').innerText = "0"
		document.getElementById('clockMinute1').innerText = minute
    } else {
        document.getElementById('clockMinute2').innerText = Math.floor(minute / 10);
		document.getElementById('clockMinute1').innerText = minute - Math.floor(minute / 10)*10;
    }
}
