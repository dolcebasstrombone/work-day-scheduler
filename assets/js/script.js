//display current date and time at the top
var currentTime = moment();
$("#currentDay").text(currentTime.format("MMMM Do YYYY"));

//on click, turn p into textarea
$(".time-block").on("click", ".description", function () {
  var text = $(this).text().trim();
  var textHour = $(this)[0].dataset.hour;
  var textInputEl = $("<textarea>");
  textInputEl.addClass("descriptionInput flex-grow-1").val(text);
  textInputEl[0].setAttribute("data-hour", textHour);
  $(this).replaceWith(textInputEl);
  textInputEl.trigger("focus");
  textInputEl.select();
});

//on blur, turn back into p
$(".time-block").on("blur", ".descriptionInput", function () {
  var textToSave = $(this).val().trim();
  var inputHour = $(this)[0].dataset.hour;
  var textEl = $("<p>");
  textEl.addClass("description flex-grow-1").text(textToSave);
  textEl[0].setAttribute("data-hour", inputHour);
  $(this).replaceWith(textEl);
  timeColorCode();
});

// save to local storage
$(".row").on("click", ".saveBtn", saveChanges);
function saveChanges() {
  //get the array from storage
  var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
  //find this buttons row
  var rowNumber = this.dataset.row;
  //find matching text box
  var textBoxInRowEl = $(".description")[rowNumber];
  //set text as a variable to save in object
  var descriptionText = textBoxInRowEl.textContent;
  //save the text in a task object
  var taskObj = {
    description: descriptionText,
    row: rowNumber,
  };
  //get rid of objects that have a matching row
  savedTasks = savedTasks.filter(function (objects) {
    //return objects that have a row that matches textBoxInRowEl
    return objects.row !== rowNumber;
  });
  savedTasks.push(taskObj);
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
}

//retrive from local storage
function displaySavedChanges() {
  //get array from storage
  var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
  savedTasks.forEach(function (thisObject) {
    //find the row number
    rowAttr = thisObject.row;
    //find the matching text box
    var matchingTextBoxEl = $(".description")[rowAttr];
    //display the appropriate text in the textbox
    matchingTextBoxEl.textContent = thisObject.description;
  });
}
displaySavedChanges();

//color coding based on past, present, or future
function timeColorCode() {
  //array of each row element
  var textBoxElArray = Array.from($(".description"));
  //for each row, check the class and change it if necessary
  textBoxElArray.forEach(function (timeRow) {
    //pull the tasks assigned hour from the data class
    var taskMoment = moment().hour(timeRow.dataset.hour);
    //if task is in the past, change the class to past
    if (
      moment(currentTime, "hour").isAfter(taskMoment, "hour") &&
      !timeRow.classList.contains("past")
    ) {
      timeRow.setAttribute("class", "description past flex-grow-1");
    }
    //if task is now, change the class to present
    if (
      moment(currentTime, "hour").isSame(taskMoment, "hour") &&
      !timeRow.classList.contains("present")
    ) {
      timeRow.setAttribute("class", "description present flex-grow-1");
    }
    //if class is in the future, change the class to future
    if (
      moment(currentTime, "hour").isBefore(taskMoment, "hour") &&
      !timeRow.classList.contains("future")
    ) {
      timeRow.setAttribute("class", "description future flex-grow-1");
    }
  });
}
timeColorCode();
