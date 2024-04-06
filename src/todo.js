const addTaskForm = document.getElementById('add-task-form');
const addTaskInput = document.getElementById('add-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksDiv = document.getElementById('tasks');
const stats = document.getElementById('stats');
const statsTotal = document.getElementById('stats-total');
const statsCompleted = document.getElementById('stats-completed');

let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

const loadTasks = () => {
    tasksDiv.innerHTML = ""
    for(let i = 0;i < tasks.length; i++){
        tasksDiv.innerHTML += taskSuccess(tasks[i].name,tasks[i].completed)
    }
    deleteListeners()
    updateListeners()
    completeListeners()
    loadStats()
}

const taskSuccess = (task,completed = false) => {
    return `<div class="task ${ completed ? "completed" : ""}">
        <span class="truncate">
            <input type="checkbox" class="update-checkbox mr-1 border-none bg-brand-50" ${ completed ? "checked" : ""}>
            <input type="text" class="update-input min-w-80" value="${task}">
         </span>
        <div class="buttons">
            <button class="update-button"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
        </div>
</div>`
}

const loadStats = () => {
    if(tasks.length > 0){
        let completed = 0
        for(const task in tasks){
            tasks[task].completed ? completed++ : null
        }
        statsTotal.innerText = tasks.length
        statsCompleted.innerText = completed
        stats.classList.contains('hidden') ? stats.classList.remove('hidden') : null
    } else {
        stats.classList.add('hidden')
    }
}

const addTask = (e) => {
    e.preventDefault();
    addTaskInput.value.trim() === '' ? vanillaToast.warning('Task can not be empty!', {duration:500, fadeDuration:500})
    : tasks.push({
        name: addTaskInput.value.trim(),
        completed: false
    })
    vanillaToast.success(`Task <b>${addTaskInput.value.trim()}</b> added successfully!`, {duration:500, fadeDuration:500})
    localStorage.setItem('tasks', JSON.stringify(tasks))
    addTaskInput.value = ''
    loadTasks()
}

addTaskForm.addEventListener('submit', addTask)

const deleteListeners = () => {
    let deleteBtn = document.querySelectorAll(".delete-button")
    deleteBtn.forEach((button, index) => {
      button.addEventListener("click", () => { deleteTask(index) })
    })
}

const updateListeners = () => {
    let updateBtn = document.querySelectorAll(".update-button")
    let updateInput = document.querySelectorAll(".update-input")
    updateBtn.forEach((button, index) => {
      button.addEventListener("click", () => { updateTask(index,updateInput[index].value) })
    })
}

const completeListeners = () => {
    let updateCheckbox = document.querySelectorAll(".update-checkbox")
    let taskArea = document.querySelectorAll(".task")
    updateCheckbox.forEach((update, index) => {
        update.addEventListener("click", () => { 
        taskArea[index].classList.toggle('completed')
        completeTask(index) })
    })
  }

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const deleteTask = (index) => {
    vanillaToast.info(`Task <b>${tasks[index].name}</b> deleted successfully!`, {duration:500, fadeDuration:500})
    tasks.splice(index,1)
    updateLocal()
    loadTasks()
}

const updateTask = (index,value) => {
    vanillaToast.info(`Task <b>${tasks[index].name}</b> updated successfully!`, {duration:500, fadeDuration:500})
    tasks[index].name = value
    updateLocal()
    loadTasks()
}

const completeTask = (index) => {
    vanillaToast.info(`Task <b>${tasks[index].name}</b> updated successfully!`, {duration:500, fadeDuration:500})
    tasks[index].completed = !(tasks[index].completed)
    updateLocal()
    loadTasks()
}

window.onload = () => {
    loadTasks()
}