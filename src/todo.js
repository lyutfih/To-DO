const addTaskForm = document.getElementById('add-task-form');
const addTaskInput = document.getElementById('add-task-form');
const addTaskBtn = document.getElementById('add-task-btn');

const tasks = [];

const addTask = (e) => {
    vanillaToast.success('Task added successfuly!', {duration:1000, fadeDuration:500})
}

addTaskBtn.addEventListener('click', addTask)

