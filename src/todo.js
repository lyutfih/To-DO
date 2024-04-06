const addTaskForm = document.getElementById('add-task-form');
const addTaskInput = document.getElementById('add-task-form');
const tasks = [];

const addTask = (e) => {
    e.preventDefault;
    e.trim() === '' ? vanillaToast.warning('Task name can not be empty!', {duration:300, fadeDuration:1})
    : vanillaToast.success('Task added successfuly!', {duration:300, fadeDuration:1})
}

addTaskForm.addEventListener('submit', addTask)