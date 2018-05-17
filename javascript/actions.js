let isFormVisible = false;
$(document).ready(function () {
    $('.form-container').hide();
    $('#error').hide();
    $('#form input[type="date"]').prop('min', function(){
        return new Date().toJSON().split('T')[0];
    });
    $('#form').submit((ev) => {
        ev.preventDefault();

        let date = $("#new-date").val();
        let time = $("#new-time").val();
        let desc = $("#new-desc").val();

        let data = {
            date: date,
            time: time,
            description: desc
        }
        console.log(data);
        addAppointment(data);
    });

    getAppointment();
});

toggleForm = () => {
    if(isFormVisible) {
        isFormVisible = false;
       $(".form-container").hide();
       $("form").trigger("reset");
       $("#newbtn").show();
    }
    else {
        isFormVisible = true;
        $(".form-container").show();
        $("#newbtn").hide();
    }
}

buildTable = (data) => {
    if (data.length > 0) {
        let content = "<tr><th>Date</th><th>Time</th><th>Description</th>";

        data.map(item => {
            content += "<tr>";
            content += "<td>" + item.date + "</td>";
            content += "<td>" + item.time + "</td>";
            content += "<td>" + item.description + "</td>";
            content += "</tr>";
        })
        $("#tablelist").empty().append(content);
    }
}

displayMessage = (text) => {
    $("#message").append(text).delay(500).fadeIn().delay(10000).fadeOut('normal', () => {
        $(this).empty();
    });
}

search = () => {
    console.log($("#search-text").val());
    if($("#search-text").val() !== "") {
        getAppointment($("#search-text").val());
    }
    else {
        getAppointment();
    }

}
addAppointment = (data) => {
    $.ajax({
        url: "/api/new",
        method: "post",
        data: data,
        error: displayMessage,
        dataType: "json",
        success: displaySuccess
    });
}
displaySuccess = (msg) => {
    displayMessage("Appointment added!");
}
getAppointment = (text) => {
    let url = '/api';

    if(text != null) {
        url += "/search/" + text;
    }

    $.get(url, (data) => {
        buildTable(data);
    });
}