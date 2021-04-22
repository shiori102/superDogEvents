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
    displayStats();
}


//get the events for the selected city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    curEvents = JSON.parse(localStorage.getItem("eventBook")) || eventArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });
    }
    displayStats();
}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

    }

    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString();
    undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }

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