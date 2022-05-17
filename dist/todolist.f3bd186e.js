// timer
window.onload = function() {
    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens");
    var appendSeconds = document.getElementById("seconds");
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval;
    buttonStart.onclick = function() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    };
    buttonStop.onclick = function() {
        clearInterval(Interval);
    };
    buttonReset.onclick = function() {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    };
    function startTimer() {
        tens++;
        if (tens <= 9) appendTens.innerHTML = "0" + tens;
        if (tens > 9) appendTens.innerHTML = tens;
        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "00";
        }
        if (seconds > 9) appendSeconds.innerHTML = seconds;
    }
};
//   calendar
function generate_year_range(start, end) {
    var years = "";
    for(var year = start; year <= end; year++)years += "<option value='" + year + "'>" + year + "</option>";
    return years;
}
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
// createYear = generate_year_range(1970, 2050);
createYear = generate_year_range(1970, currentYear);
document.getElementById("year").innerHTML = createYear;
var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');
var months = "";
var days = "";
var monthDefault = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
var dayDefault = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
} else if (lang == "id") {
    months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];
    days = [
        "Ming",
        "Sen",
        "Sel",
        "Rab",
        "Kam",
        "Jum",
        "Sab"
    ];
} else if (lang == "fr") {
    months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ];
    days = [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi"
    ];
} else {
    months = monthDefault;
    days = dayDefault;
}
var $dataHead = "<tr>";
for(dhead in days)$dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
$dataHead += "</tr>";
//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;
monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}
function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}
function showCalendar(month, year) {
    var firstDay = new Date(year, month).getDay();
    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
    // creating all cells
    var date = 1;
    for(var i = 0; i < 6; i++){
        var row = document.createElement("tr");
        for(var j = 0; j < 7; j++){
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) break;
            else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) cell.className = "date-picker selected";
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
//Dictionary
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
btn.addEventListener("click", ()=>{
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`).then((response)=>{
        return response.json();
    }).then((data)=>{
        result.innerHTML = `
  <div class="word">
    <h3>${inpWord}</h3>
    <button onclick="playSound()"> <i class="fas fa-volume-up"></i></button>
  </div>
  <div class="details">
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p>/${data[0].phonetic}/</p>
  </div>
  <p class="word-meaning">
    ${data[0].meanings[0].definitions[0].definition}
  </p>
  <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>
  `;
        sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    }).catch((error)=>{
        result.innerHTML = `<h3 class="error">Couldn't Find The Word!</h3>`;
    });
});
function playSound() {
    sound.play();
}

//# sourceMappingURL=todolist.f3bd186e.js.map
