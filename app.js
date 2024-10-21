// HTML ELEMENTS SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', displayLocalTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('input', filterTodo);
todoList.addEventListener('click', removeLocalTodos);

// FUNCTIONS
// Function to add a new todo
function addTodo(e) {
    e.preventDefault();

    // Create todo div and li
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    // Call the function to save the todo in the local storage
    saveLocalTodos(todoInput.value);

    // Create check and delete buttons
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append the todo div to the todo list
    todoList.appendChild(todoDiv);

    // Clear the input field
    todoInput.value = '';
}

// Function to delete or check a todo
function deleteCheck(e) {
    const item = e.target;

    // DELETE TODO
    if (item.classList.contains('trash-btn')) {
        // Get the parent element of the trash button
        const todo = item.parentElement;
        // Call the function to remove the todo from the local storage
        removeLocalTodos(todo);
        // Animation "fall" for the todo
        todo.classList.add('fall');
        // Remove the todo from the list after the animation
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    // CHECK MARK
    if (item.classList.contains('complete-btn')) {
        // Get the parent element of the check button
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        //  Change the color of check icon
        const checked = item.querySelector('.fa-check');
        checked.classList.toggle('checked');
    }
}

// Function to filter the todos
function filterTodo(e) {
    // Get the children of the todolist
    const todos = todoList.childNodes;

    // Loop through the todos
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break
        }
    });
}

// Function to save the todos in the local storage
function saveLocalTodos(task){
    // Check if there are todos in the local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // Add the new todo to the local storage
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to display the todos from the local storage
function displayLocalTodos(){
    // Check if there are todos in the local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // Loop through the todos and create the todo div and li
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        // Create check and delete buttons
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // Append the todo div to the todo list
        todoList.appendChild(todoDiv);
    });
}
// Function to remove the todos from the local storage
function removeLocalTodos(todo) {
    // Check if there are todos in the local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}