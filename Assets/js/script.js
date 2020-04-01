let $currentDay = $("#currentDay"); // header
let currentDate = moment().format("dddd, MMMM Do");
let currentHour = moment().format("H");
$currentDay.append(currentDate);
var $container = $(".container");
const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const visualHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]


for (var i = 0; i < workHours.length; i++) {
    var rowBlocks = $("<div>").addClass("row time-block")
    const hour = $("<span>").text(visualHours[i]).addClass("hour"); // hour column
    let textArea = $("<textarea>").attr("hour", i).addClass("description").attr('type', 'text').attr('data-index', i); //text to do section
    //    console.log(textArea);
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
    rowBlocks.append(hour).attr("data-index", i);
    rowBlocks.append(textArea).attr("data-index", i);
    rowBlocks.append(saveButton.attr("data-index", i));
    rowBlocks.appendTo($container).attr("data-index", i);
}
var hourRows = document.querySelector(".hour");
var textInput = document.querySelector(".description");
var saveBtn = document.querySelector(".saveBtn");
var tasks = [];

init();
function renderTasks() {
    var todo = tasks[i];
    textInput.textContent = todo;
  }

saveBtn.addEventListener('click', function (event) { 
    event.preventDefault();
    var todoInputVal = textInput.value.trim();
    tasks.push(todoInputVal);
    storeTasks();
    renderTasks();
    console.log(tasks);
})

function init() {
    var storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks !== null) {
      tasks = storedTasks
    }
    storeTasks();
    console.log(tasks);
    console.log(storedTasks);
  }
  function storeTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
  }