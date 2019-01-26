$(document).ready(function() {
      // Initialize Firebase
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

  $("#add-employee").on("click", function(event) {
    event.preventDefault();

    employee = $("#employee-input").val().trim();
    startDate = $("#startdate-input").val().trim();
    role = $("#role-input").val().trim();
    rate = $("#rate-input").val().trim();

    database.ref().push({
        employee: employee,
        startDate: startDate,
        role: role,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  }

      // Firebase watcher .on("child_added"
      database.ref().on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var emp = snapshot.val();
  
        // Change the HTML to reflect
        $("#employee-display").append(emp.employee);
        $("#startdate-display").append(emp.startDate);
        $("#role-display").append(emp.role);
        $("#rate-display").append(emp.rate);
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
}