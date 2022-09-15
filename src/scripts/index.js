"use strict";

//Selectors 
const taskForm = document.getElementById("task");
const assignee = document.getElementById("assignee");
const addTask = document.getElementById("addTask");
const search = document.getElementById("search");
const tasksList = document.getElementById("tasks");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const clearSearch = document.getElementById("clearSearch");
let data = [];

//Events
document.addEventListener("DOMContentLoaded", getData);
addTask.addEventListener("click", addTaskClickHandler);
search.addEventListener("keyup", searchClickHandler);
clearCompleted.addEventListener("click", clearCompletedClickHandler);

//Event Handlers
function addTaskClickHandler(event) {
    event.preventDefault();
    let newTask = taskForm.value;
    let newAssignee = assignee.value;
    let newObj;
    if (newTask && newAssignee) {
        newObj = {
            id: data.length + 1,
            name: newTask,
            assignee: newAssignee,
            todo: false
        }
        data.push(newObj);
        saveNewData();
        render();
        emptyForm();
    }
}
function removeHandler(id) {
    const deleteTask = data.find(task => task.id === id);
    data = data.filter(task => task.id != deleteTask.id);
    saveNewData();
    render();

}
function markHandler(id) {
    data = data.map(task => {
        if (task.id == id) {
            task.todo = !task.todo;
        }
        return task
    })
    saveNewData();
    render();
}
function searchClickHandler(event) {
    renderFilteredData(event.target.value);
}

function clearCompletedClickHandler(event) {
    event.preventDefault();
    console.log("clearCompletedClickHandler");
    data = data.filter(task => task.todo == "available");

    render();
}

//Functions
function render() {
    tasksList.innerHTML = "";
    data.forEach(task => {
        tasksList.innerHTML += createHtmlTask(task);
    })
    taskCount.innerText = data.length || 0;
}

function renderFilteredData(input) {
    tasksList.innerHTML = "";
    const foundData = data.filter(task => task.name.toLowerCase().includes(input.toLowerCase()));
    foundData.forEach(task => {
        tasksList.innerHTML += createHtmlTask(task);
    });

}


function getData(event) {
    render();
}


function emptyForm() {
    task.value = '';
    assignee.value = '';
}

function createHtmlTask(taskData) {
    return `<li class="main_tasks-item" data-id="${taskData.id}" data-todo="${taskData.todo}">
                <div class="details">
                    <p class="details_name">${taskData.name}</p>
                    <p class="details_assignee">${taskData.assignee}</p>
                </div>
                <div class="control">
                    <button onClick="removeHandler(${taskData.id})" class="control_button-delete">❌</button>
                    <button onClick="markHandler(${taskData.id})" class="control_button-done">✔️</button>
                </div>
            </li> `
}

function saveNewData() {
    console.log(data);
}
