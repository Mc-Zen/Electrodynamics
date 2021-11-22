

function toggle_viewer() {
    let vw = document.getElementById("viewer-wrapper");
    let cw = document.getElementById("content-wrapper");
    if (vw.style.display != "block") {
        vw.style.display = "block";
        cw.style.display = "none";
    } else {
        vw.style.display = "none";
        cw.style.display = "block";
    }
}

// get file modification date: https://gist.github.com/xdevmaycry/b0ef73f66d9847a980edbfab4c135a77

function ready(callback) {
    // in case the document is already rendered
    if (document.readyState != 'loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') callback();
    });
}

ready(function () {
    updateFileDate();
});

function fetchHeader(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var lastModified = xhr.getResponseHeader('Last-Modified');
                formatAndUpdateDate(lastModified);
                return;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

function formatAndUpdateDate(dateString) {
    var parsedTime = new Date(dateString).getTime();
    var a = new Date(parsedTime);
    // If you prefer non-numeric month:
    // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // var month = months[a.getMonth()];
    var year = a.getFullYear();
    var month = a.getMonth() < 9 ? '0' + Number(a.getMonth() + 1) : Number(a.getMonth() + 1);
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();

    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    var formattedDate = month + '/' + date + '/' + year + ' at ' + hour + ':' + min + ampm;

    var el = document.getElementsByClassName("last-updated-date")[0];

    if (el !== undefined) {
        el.textContent = formattedDate;
    }
}

function updateFileDate() {
    let url = "pdf/Theo_III_1_1_2_1.pdf";

    if (url !== undefined) {
        fetchHeader(url);
    }
}