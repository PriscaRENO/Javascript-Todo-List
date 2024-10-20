// HTML ELEMENTS SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// EVENT LISTENERS
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)

// FUNCTIONS
// Function to add a new todo
function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = '';
}

// Function to delete or check a todo
function deleteCheck(e) {
    const item = e.target;
    // DELETE TODO
    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        todo.remove();
    }
    // CHECK MARK
    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}