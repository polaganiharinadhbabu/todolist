let todoList = [
    {
        id: 1,
        text: "Buy groceries",
        completed: false
    },
    {
        id: 2,
        text: "Finish JavaScript project",
        completed: true
    },
    {
        id: 3,
        text: "Walk the dog",
        completed: false
    }
];

const todoListUl = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const CreateTodoForm = document.querySelector(".todo-form");

function createTodoLi(todoItem) {
    const li = document.createElement("li");

    li.className = "text-xl py-2 text-gray-700";

    li.innerHTML = `
        <input
            type="checkbox"
            class="todo-box"
            ${todoItem.completed ? "checked" : ""}
        />
        <span class="todo-text">${todoItem.text}</span>
    `;

    const checkbox = li.querySelector(".todo-box");
    const todoText = li.querySelector(".todo-text");

    if (todoItem.completed) {
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "gray";
    }

    checkbox.addEventListener("change", (event) => {
        todoItem.completed = event.target.checked;

        if (todoItem.completed) {
            todoText.style.textDecoration = "line-through";
            todoText.style.color = "gray";
        } else {
            todoText.style.textDecoration = "none";
            todoText.style.color = "black";
        }
    });

    return li;
}

function showTodoList() {
    todoListUl.innerHTML = "";

    todoList.forEach((item) => {
        const todoItem = createTodoLi(item);
        todoListUl.appendChild(todoItem);
    });
}

showTodoList();

CreateTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formTodos = new FormData(event.target);
    const data = Object.fromEntries(formTodos.entries());

    const newTodoText = data["todo-input"];

    if (!newTodoText || !newTodoText.trim()) {
        alert("Please enter a valid todo!");
        return;
    }

    const newTodoItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
    };

    todoList.push(newTodoItem);

    const createItem = createTodoLi(newTodoItem);
    todoListUl.appendChild(createItem);

    event.target.reset();
});

addTaskBtn.addEventListener("click", () => {
    if (addTaskBtn.innerText.trim().toLowerCase() === "add todo") {
        CreateTodoForm.style.display = "flex";
        addTaskBtn.innerText = "Cancel";
    } else {
        CreateTodoForm.style.display = "none";
        addTaskBtn.innerText = "Add Todo";
    }
});
