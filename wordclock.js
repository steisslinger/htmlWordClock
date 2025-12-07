/**
 * Defines the javascript for Wordclock
 *
 * This file is part of Wordclock.
 */



/* Guest handling */
let timelyGuests        = 0;
let alwaysGuests1       = 0;
let alwaysGuests2       = 0;


let eva1                = 0;
let frank1              = 0;
let heike1              = 0;
let hannah1             = 0;

let eva2                = 0;
let frank2              = 0;
let heike2              = 0;
let hannah2             = 0;

let evaNameDefault      = "EVA";
let frankNameDefault    = "FRANK";
let heikeNameDefault    = "HEIKE";
let hannahNameDefault   = "HANNAH";

let showGuests1         = 0;
let evaName1            = "ANDI";
let frankName1          = "SVEN";
let heikeName1          = "ROMAN";
let hannahName1         = "KATHRIN";

let showGuests2         = 0;
let evaName2            = "ROLF";
let frankName2          = "HANNES";
let heikeName2          = "HEIKE";
let hannahName2         = "SIBYLLE";


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



function updateTime(){
    $('#wordclock div div:not(#fanfare)').removeClass('active').addClass('passive');
    
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

    switch (adjMinute) {
        case 0:
        case 15:
        case 30:
        case 45:
            // $('[id^="min-"]').removeClass('active');
            $('[id^="past-"]').removeClass('active');
            break;
        default:
         // $('#minute').addClass('active');
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
    //} else if (showGuests == 1){
    //    window.location.reload();
    } else if (timelyGuests){
        showGuests1 = 0;
        showGuests2 = 1;
    }

    if (showGuests1 || alwaysGuests1){
        if (eva1){
            $('#eva').removeClass('evaDefault').addClass('eva');
            document.getElementById('eva').innerText = evaName1;
        } else {
            $('#eva').removeClass('eva').addClass('evaDefault');
            document.getElementById('eva').innerText = evaNameDefault;
        }
        if (frank1){
            $('#frank').removeClass('frankDefault').removeClass('frank2').addClass('frank1');
            document.getElementById('frank').innerText = frankName1;
        } else {
            $('#frank').removeClass('frank1').removeClass('frank2').addClass('frankDefault');
            document.getElementById('frank').innerText = frankNameDefault;
        }
        if (heike1){
            $('#heike').removeClass('heikeDefault').addClass('heike');
            document.getElementById('heike').innerText = heikeName1;
        } else {
            $('#heike').removeClass('heike').addClass('heikeDefault');
            document.getElementById('heike').innerText = heikeNameDefault;
        }
        if (hannah1){
            $('#hannah').removeClass('hannahDefault').addClass('hannah');
            document.getElementById('hannah').innerText = hannahName1;
        } else {
            $('#hannah').removeClass('hannah').addClass('hannahDefault');
            document.getElementById('hannah').innerText = hannahNameDefault;
        }

        if (eva1 || frank1 || heike1 || hannah1) {
            $('#e').removeClass('active').addClass('e');
            document.getElementById('e').innerText = "H";
            $('#s1').removeClass('active').addClass('s2');
            document.getElementById('s1').innerText = "A";
            $('#h').removeClass('active').addClass('h');
            document.getElementById('h').innerText = "L";
            $('#i').removeClass('active').addClass('i');
            document.getElementById('i').innerText = "L";
            $('#s2').removeClass('active').addClass('s2');
            document.getElementById('s2').innerText = "O";
            $('#t').removeClass('active');
        } else {
            $('#e').removeClass('e').addClass('active');
            document.getElementById('e').innerText = "E";
            $('#s1').removeClass('s1').addClass('active');
            document.getElementById('s1').innerText = "S";
            $('#h').removeClass('h');
            document.getElementById('h').innerText = "H";
            $('#i').removeClass('i').addClass('active');
            document.getElementById('i').innerText = "I";
            $('#s2').removeClass('s2').addClass('active');
            document.getElementById('s2').innerText = "S";
            $('#t').removeClass('t').addClass('active');
            document.getElementById('t').innerText = "T";
        }

    } else if (showGuests2 || alwaysGuests2){
        if (eva2){
            $('#eva').removeClass('evaDefault').addClass('eva')
            document.getElementById('eva').innerText = evaName2;
        } else {
            $('#eva').removeClass('eva').addClass('evaDefault');
            document.getElementById('eva').innerText = evaNameDefault;
        }
        if (frank2){
            $('#frank').removeClass('frankDefault').removeClass('frank1').addClass('frank2');
            document.getElementById('frank').innerText = frankName2;
        } else {
            $('#frank').removeClass('frank1').removeClass('frank2').addClass('frankDefault');
            document.getElementById('frank').innerText = frankNameDefault;
        }
        if (heike2){
            $('#heike').removeClass('heikeDefault').addClass('heike')
            document.getElementById('heike').innerText = heikeName2;
        } else {
            $('#heike').removeClass('heike').addClass('heikeDefault')
            document.getElementById('heike').innerText = heikeNameDefault;
        }
        if (hannah2){
            $('#hannah').removeClass('hannahDefault').addClass('hannah');
            document.getElementById('hannah').innerText = hannahName2;
        } else {
            $('#hannah').removeClass('hannah').addClass('hannahDefault');
            document.getElementById('hannah').innerText = hannahNameDefault;
        }

        if (eva2 || frank2 || heike2 || hannah2) {
            $('#e').removeClass('active').addClass('e');
            document.getElementById('e').innerText = "H";
            $('#s').removeClass('active').addClass('s');
            document.getElementById('s').innerText = "A";
            $('#h').removeClass('active').addClass('h');
            document.getElementById('h').innerText = "L";
            $('#i').removeClass('active').addClass('i');
            document.getElementById('i').innerText = "L";
            $('#s').removeClass('active').addClass('s');
            document.getElementById('s').innerText = "O";
            $('#t').removeClass('active');
        } else {
            $('#e').removeClass('e').addClass('active');
            document.getElementById('e').innerText = "E";
            $('#s').removeClass('s').addClass('active');
            document.getElementById('s').innerText = "V";
            $('#h').removeClass('h');
            document.getElementById('h').innerText = "A";
            $('#i').removeClass('i').addClass('active');
            document.getElementById('i').innerText = "Z";
            $('#s').removeClass('s').addClass('active');
            document.getElementById('s').innerText = "D";
            $('#t').removeClass('t').addClass('active');
            document.getElementById('t').innerText = "R";
        }

    } else {        
        $('[id^="hero-"]').addClass('active');
        $('#hero-h').removeClass('active');
    }

}
