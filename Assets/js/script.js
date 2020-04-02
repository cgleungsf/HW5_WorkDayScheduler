let $currentDay = $("#currentDay"); // header
let currentDate = moment().format("dddd, MMMM Do");
let currentHour = moment().format("H");
$currentDay.append(currentDate);
var $container = $(".container");
const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const visualHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

for (var i = 0; i < workHours.length; i++) {
  //creating the components of the rows with attributes and classes
  var rowBlocks = $("<div>").addClass("row time-block")
  const hour = $("<span>").text(visualHours[i]).addClass("hour").attr('data-index', i); // hour column
  let textArea = $("<textarea>").attr("hour", i).addClass("description").attr('type', 'text').attr('data-index', i); //text to do section
  let saveButton = $("<button>").addClass("saveBtn").attr("data-index", i).append('<i class="far fa-save"></i>') // save button

  if (workHours[i] > currentHour) {
    rowBlocks.addClass("future");
  }
  if (workHours[i] < currentHour) {
    rowBlocks.addClass("past");
  }
  if (workHours[i] == currentHour) {
    rowBlocks.addClass("present");
  }
  //creates sections for row, description, and the save button
  rowBlocks.append(hour).attr("data-index", i);
  rowBlocks.append(textArea);
  rowBlocks.append(saveButton);
  rowBlocks.appendTo($container);
}

var $saveBtn = $(".saveBtn");
var taskArr = [];
var $rowBlocks = $(".row");

function init() {
  $rowBlocks.each(function () {
    //gives each row a data inex
    var $thisRow = $(this);
    var thisHourRow = parseInt($thisRow.attr("data-index"));
    //creates an object for each row containing hour and text information
    var taskObj = {
      hour: thisHourRow,
      text: "",
    }
    // creates an object for each row
    taskArr.push(taskObj);
  });
  //stores the original array 
  localStorage.setItem("tasks", JSON.stringify(taskArr));

}

function storeTasks() {
  var hourUpdate = $(this).parent().attr("data-index");
  var taskAdded = (($(this).parent()).children("textarea")).val();
  //sets values to the object made in init function when save button is clicked.
  for (var j = 0; j < taskArr.length; j++) {
    if (taskArr[j].hour == hourUpdate) {
      taskArr[j].text = taskAdded;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  renderTasks();
}

function renderTasks() {
  taskArr = localStorage.getItem("tasks");
  taskArr = JSON.parse(taskArr);
  //retrieves any data that was stored in local storage
  for (var i = 0; i < taskArr.length; i++) {
    var taskHour = taskArr[i].hour;
    var taskText = taskArr[i].text;

    $("[data-index=" + taskHour + "]").children("textarea").val(taskText);
  }
}

$(document).ready(function () {
  // starts the page by checking if there is any information in the local storage, if there is not--> run initial function creating object in the array, if there is --> render stored information
  if (!localStorage.getItem("tasks")) {
    init();
  }
  renderTasks();
  //when a button is clicked, run storeTasks function
  $container.on("click", "button", storeTasks);
});