"use strict"; //Selectors 

var taskForm = document.getElementById("task");
var assignee = document.getElementById("assignee");
var addTask = document.getElementById("addTask");
var search = document.getElementById("search");
var tasksList = document.getElementById("tasks");
var taskCount = document.getElementById("taskCount");
var clearCompleted = document.getElementById("clearCompleted");
var clearSearch = document.getElementById("clearSearch");
var data = []; //Events

document.addEventListener("DOMContentLoaded", getData);
addTask.addEventListener("click", addTaskClickHandler);
search.addEventListener("keyup", searchClickHandler);
clearCompleted.addEventListener("click", clearCompletedClickHandler);
clearSearch.addEventListener("click", clearSearchClickHandler); //Event Handlers

function addTaskClickHandler(event) {
  event.preventDefault();
  var newTask = taskForm.value;
  var newAssignee = assignee.value;
  var newObj;

  if (newTask && newAssignee) {
    newObj = {
      id: data.length + 1,
      name: newTask,
      assignee: newAssignee,
      isDone: false
    };
    data.push(newObj);
    saveNewData();
    render();
    emptyForm();
    taskForm.focus();
  }
}

function removeHandler(id) {
  var deleteTask = data.find(function (task) {
    return task.id === id;
  });
  tasksList.innerHTML += createHtmlConfirm(deleteTask);
}

function deleteTaskHandler(id) {
  data = data.filter(function (task) {
    return task.id != id;
  });
  saveNewData();
  render();
}

function markHandler(id) {
  data = data.map(function (task) {
    if (task.id == id) {
      task.isDone = !task.isDone;
    }

    return task;
  });
  saveNewData();
  render();
}

function searchClickHandler(event) {
  renderFilteredData(event.target.value);
}

function clearSearchClickHandler(event) {
  event.preventDefault();
  search.value = '';
  render();
}

function clearCompletedClickHandler(event) {
  event.preventDefault();
  console.log("clearCompletedClickHandler");
  data = data.filter(function (task) {
    return task.isDone == "available";
  });
  render();
} //Functions


function render() {
  tasksList.innerHTML = "";
  data.forEach(function (task) {
    tasksList.innerHTML += createHtmlTask(task);
  });
  taskCount.innerText = data.length || 0;
}

function renderFilteredData(input) {
  tasksList.innerHTML = "";
  var foundData = data.filter(function (task) {
    return task.name.toLowerCase().includes(input.toLowerCase());
  });
  foundData.forEach(function (task) {
    tasksList.innerHTML += createHtmlTask(task);
  });
}

function getData(event) {
  data = JSON.parse(localStorage.getItem('tasksList'));
  render();
}

function emptyForm() {
  taskForm.value = '';
  assignee.value = '';
}

function createHtmlTask(taskData) {
  return "<li class=\"main_tasks-item\" data-id=\"".concat(taskData.id, "\" data-isDone=\"").concat(taskData.isDone, "\">\n                <div class=\"details\">\n                    <p class=\"details_name\">").concat(taskData.name, "</p>\n                    <p class=\"details_assignee\">").concat(taskData.assignee, "</p>\n                </div>\n                <div class=\"control\">\n                    <button onClick=\"removeHandler(").concat(taskData.id, ")\" class=\"control_button-delete\">\u274C</button>\n                    <button onClick=\"markHandler(").concat(taskData.id, ")\" class=\"control_button-done\">\u2714\uFE0F</button>\n                </div>\n            </li> ");
}

function createHtmlConfirm(taskData) {
  return "\n    <li class=\"tasks_delete\">\n        <p class=\"task_delete-title\">Are you sure you want to delete \"".concat(taskData.name, "\"?</p>\n        <div class=\"controls\">\n            <button onClick=\"deleteTaskHandler(").concat(taskData.id, ")\" class=\"controls-confirm\" >Confirm</button>\n            <button onClick=\"render()\" class=\"controls-decline\">Decline</button>\n        </div>\n    </li>\n    ");
}

function saveNewData() {
  localStorage.setItem('tasksList', JSON.stringify(data));
  console.log(localStorage.getItem('tasksList'));
}