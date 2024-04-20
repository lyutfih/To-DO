const addTaskForm = document.getElementById('add-task-form');
const addTaskInput = document.getElementById('add-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksDiv = document.getElementById('tasks');
const stats = document.getElementById('stats');
const statsTotal = document.getElementById('stats-total');
const statsCompleted = document.getElementById('stats-completed');
const searchInput = document.getElementById('search-task');
const tasksTop = document.getElementById('tasks-top');
const categoryDiv = document.getElementById('category');
const categorySearch = document.getElementById('categorySearch');
const addCategoryForm = document.getElementById('addCategory');
const modal = document.getElementById('crud-modal');

let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
let categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : 
[{'id':0,'name':'Urgent','color':'red'},{'id':1,'name':'Work','color':'blue'},{'id':2,'name':'Learning','color':'indigo'}]
localStorage.setItem('categories', JSON.stringify(categories));


const loadTasks = () => {
    tasksDiv.innerHTML = ""
    for(let i = 0;i < tasks.length; i++){
        if(!tasks[i].deleted) 
        tasksDiv.innerHTML += taskCreate(tasks[i].id,tasks[i].name,tasks[i].category,tasks[i].completed)
    }
    deleteListeners()
    updateListeners()
    completeListeners()
    loadStats()
}

const loadStats = () => {
        let completed = 0
        let totalStats = 0
        for(const task in tasks){
            if(!tasks[task].deleted) {
                totalStats++
                if(tasks[task].completed){
                    completed++
                }
            }
        }
        statsTotal.innerText = totalStats
        statsCompleted.innerText = completed
        if(totalStats > 0){
            stats.classList.contains('hidden') ? stats.classList.remove('hidden') : null;
            tasksTop.classList.contains('hidden') ? tasksTop.classList.remove('hidden') : null;
        } else {
            stats.classList.add('hidden');
            tasksTop.classList.add('hidden');
        }
   
}

const loadCategories = () => {
    categoryDiv.innerHTML = ''
    categorySearch.innerHTML = ''
    categories.forEach(cat => {
        categoryDiv.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
        categorySearch.innerHTML += `<div data-id="${cat.id}" class="category"><span class="h-2 w-2 bg-${cat.color}-600 mr-2 rounded-full"></span> <span class="truncate">${cat.name}</span></div>`
    })
    filterListeners()
}

const taskCreate = (id,task,category,completed = false) => {
    return `<div class="task ${ completed ? "completed" : ""}">
        <span class="truncate max-sm:text-clip">
            <input type="checkbox" class="update-checkbox mr-1 w-4 h-4 accent-blue-600 bg-gray-100 bg-gray-300 rounded checked:bg-blue-800 checked:border-0" data-id="${id}" ${ completed ? "checked" : ""}>
            <input type="text" class="update-input min-w-80" value="${task}">
         </span>
        <div class="buttons flex justify-center items-center gap-2">
            <span class="h-5 w-5 bg-${categories[category].color}-600 mr-2 rounded-full inline-flex"></span>
            <button class="update-button" data-id="${id}"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-button" data-id="${id}"><i class="fa-solid fa-trash"></i></button>
        </div>
</div>`
}

const addTask = (e) => {
    e.preventDefault();
    addTaskInput.value.trim() === '' ? vanillaToast.warning('Task can not be empty!', {duration:500, fadeDuration:500})
    : tasks.push({
        id: tasks.length,
        name: addTaskInput.value.trim(),
        category: categoryDiv.value,
        completed: false,
        deleted: false
    })
    vanillaToast.success(`Task <b>${addTaskInput.value.trim()}</b> added successfully!`, {duration:500, fadeDuration:500})
    localStorage.setItem('tasks', JSON.stringify(tasks))
    addTaskInput.value = ''
    loadTasks()
}

addTaskForm.addEventListener('submit', addTask)

const addCategory = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const color = data.get('color');
    name.trim() === '' ? vanillaToast.warning('Category name can not be empty!', {duration:500, fadeDuration:500})
    : categories.push({
        id: categories.length,
        name: name.trim(),
        color: color
    })
    vanillaToast.success(`Category <b>${name.trim()}</b> added successfully!`, {duration:500, fadeDuration:500})
    localStorage.setItem('categories', JSON.stringify(categories))
    addCategoryForm.reset()
    loadCategories()
}
addCategoryForm.addEventListener('submit', addCategory)

// Listeners
const deleteListeners = () => {
    let deleteBtn = document.querySelectorAll(".delete-button")
    deleteBtn.forEach((button) => {
      button.addEventListener("click", () => { deleteTask(button.dataset.id) })
    })
}

const updateListeners = () => {
    let updateBtn = document.querySelectorAll(".update-button")
    let updateInput = document.querySelectorAll(".update-input")
    updateInput.forEach((input, index) => {
        input.addEventListener("click", () => { 
            updateBtn[index].innerHTML = '<i class="fa-solid fa-check"></i>' 
            updateBtn[index].classList.add('active')
        })
      })
    updateBtn.forEach((button, index) => {
      button.addEventListener("click", () => { updateTask(button.dataset.id,updateInput[index].value) })
    })
}

const completeListeners = () => {
    let updateCheckbox = document.querySelectorAll(".update-checkbox")
    let taskArea = document.querySelectorAll(".task")
    updateCheckbox.forEach((update, index) => {
        update.addEventListener("click", () => { 
        taskArea[index].classList.toggle('completed')
        completeTask(update.dataset.id) })
    })
  }

const filterListeners = () => {
    let filterButton = document.querySelectorAll(".category")
    filterButton.forEach((button) => {
        button.addEventListener("click", () => { 
        if(button.classList.contains('active')){
            loadTasks()
            button.classList.toggle('active')
        } else{
            button.classList.toggle('active')
            filterCategory(button.dataset.id) 
        }
        })
    })
}

// -- Listeners

// Update Functions
const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const deleteTask = (index) => {
    vanillaToast.error(`Task <b>${tasks[index].name}</b> deleted successfully!`, {duration:500, fadeDuration:500})
    tasks[index].deleted = true;
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
// --Update Functions

const searchTask = (value) => {
   if (value.trim() === '') {
            loadTasks()
        } else {
            tasksDiv.innerHTML = ""
            for(let i = 0;i < tasks.length; i++){
                if(tasks[i].name.includes(value)){
                    if(!tasks[i].deleted) 
                    tasksDiv.innerHTML += taskCreate(tasks[i].id,tasks[i].name,tasks[i].category,tasks[i].completed)
                }
            }
            deleteListeners()
            updateListeners()
            completeListeners()
            loadStats()
        }
    }
searchInput.addEventListener('keyup', () => searchTask(searchInput.value))

const filterCategory = (value) => {
    tasksDiv.innerHTML = ""
    for(let i = 0;i < tasks.length; i++){
        if(tasks[i].category == value){
            if(!tasks[i].deleted) 
            tasksDiv.innerHTML += taskCreate(tasks[i].id,tasks[i].name,tasks[i].category,tasks[i].completed)
        }
    }
    deleteListeners()
    updateListeners()
    completeListeners()
    loadStats()
}


window.onload = () => {
    loadTasks()
    loadCategories()
}