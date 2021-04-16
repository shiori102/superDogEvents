var eventArray = [{
        name: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    }, {
        name: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    }, {
        name: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    }, {
        name: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    }, {
        name: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    }, {
        name: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    }, {
        name: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    }, {
        name: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    }, {
        name: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },


];

var filteredEvents = eventArray;

function buildDropDown() {
    var eventDD = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(eventArray.map((name) => name.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {

        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;


    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;




}

function getEvents(element) {

}

function displayStats() {

}

loadeventBook();

function loadeventBook() {
    let eventBook = [];
    eventBook = getData();
    displayData(eventBook);
}

function getData() {
    let eventBook = JSON.parse(localStorage.getItem("eventArray")) || [];

    if (eventBook.length == 0) {
        eventBook = eventArray;
        localStorage.setItem("eventArray", JSON.stringify(eventBook));
    }
    return eventBook;
}

function saveEvent() {
    let eventBook = JSON.parse(localStorage.getItem("eventArray")) || eventArray;

    let obj = {};
    obj["name"] = document.getElementById("newName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;

    eventBook.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(eventBook));

    displayData(eventBook);

}

function displayData(eventBook) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    resultsBody.innerHTML = "";
    for (let i = 0; i < eventBook.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("name").textContent = eventBook[i].name;
        dataRow.getElementById("city").textContent = eventBook[i].city;
        dataRow.getElementById("state").textContent = eventBook[i].state;
        dataRow.getElementById("attendance").textContent = eventBook[i].attendance;
        dataRow.getElementById("date").textContent = new Date(eventBook[i].date).toLocaleDateString();

        resultsBody.appendChild(dataRow);


    }
}