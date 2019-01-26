$( document ).ready(function() {

    var config = {
    apiKey: "AIzaSyDkG0vT9-BRgAl409N4OIkU82O8BG3i1ow",
    authDomain: "timesheet-6050c.firebaseapp.com",
    databaseURL: "https://timesheet-6050c.firebaseio.com",
    projectId: "timesheet-6050c",
    storageBucket: "",
    messagingSenderId: "653578073352"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    var employee;
    var startDate;
    var role;
    var rate;


    database.ref().on("child_added", function(snapshot) {

        employee = snapshot.val().employee;
        role = snapshot.val().role;
        startDate = snapshot.val().startDate;
        rate = snapshot.val().rate;
        date = snapshot.val().date;

        formattedDate = moment(startDate).format("X")
        console.log(formattedDate)
        months = moment().diff(moment(formattedDate, "X"), "months")
        billed = months * rate

        $("#employee-display").append(employee + "<br />");
        $("#startdate-display").append(startDate + "<br />");
        $("#role-display").append(role + "<br />");
        $("#rate-display").append(rate + "<br />");
        $("#months-display").append(months + "<br />");
        $("#billed-display").append(billed + "<br />");
    
        
    }, function(errorObject) {
    console.log("Error: " + errorObject.code);
    });

    $('#add-employee').click(function(event) {
        event.preventDefault()

        employee = $("#employee-input").val().trim();
        startDate = $("#startdate-input").val().trim();
        role = $("#role-input").val().trim();
        rate = $("#rate-input").val().trim();

        database.ref().push({
            employee : employee,
            role: role,
            startDate: startDate,
            rate: rate,
            date:firebase.database.ServerValue.TIMESTAMP
        })

    });
});