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
clearSearch.addEventListener("click", clearSearchClickHandler);

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
            isDone: false
        }
        data.push(newObj);
        saveNewData();
        render();
        emptyForm();
        taskForm.focus();

    }
}
function removeHandler(id) {
    const deleteTask = data.find(task => task.id === id);
    tasksList.innerHTML += createHtmlConfirm(deleteTask);
}
function deleteTaskHandler(id) {
    data = data.filter(task => task.id != id);
    saveNewData();
    render();
}
function markHandler(id) {
    data = data.map(task => {
        if (task.id == id) {
            task.isDone = !task.isDone;
        }
        return task
    })
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
    data = data.filter(task => !task.isDone);
    saveNewData();
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
    data = JSON.parse(localStorage.getItem('tasksList'));
    render();
}


function emptyForm() {
    taskForm.value = '';
    assignee.value = '';
}

function createHtmlTask(taskData) {
    return `
    <li class="main_tasks-item" data-id="${taskData.id}" data-isDone="${taskData.isDone}">
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

function createHtmlConfirm(taskData) {
    return `
    <li class="tasks_delete">
        <p class="task_delete-title">Are you sure you want to delete "${taskData.name}"?</p>
        <div class="controls">
            <button onClick="deleteTaskHandler(${taskData.id})" class="controls-confirm" >Confirm</button>
            <button onClick="render()" class="controls-decline">Decline</button>
        </div>
    </li>
    `
}

function saveNewData() {
    localStorage.setItem('tasksList', JSON.stringify(data));
    console.log(localStorage.getItem('tasksList'));
}
