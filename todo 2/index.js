const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

document.addEventListener("DOMContentLoaded", function () {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    if (todos) {
        todos.forEach(todo => {
            add(todo);
        });
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
});

function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            if (confirm("このToDoを削除しますか？")) {
                li.remove();
                saveData();
            }
        });

        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        ul.appendChild(li);
        if (!todo) input.value = "";
        saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}