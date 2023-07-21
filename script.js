let todosArray = [];

let userInput = document.querySelector(".user-input");
let userSearch = document.querySelector(".user-search");
let todoList = document.querySelector(".todo-list");
let btnAddTodo = document.querySelector(".btn-add-todo");
let btnEditTodo = document.querySelector(".btn-edit-todo");

const getLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todosArray = JSON.parse(storedTodos);
  }
};

btnAddTodo.addEventListener("click", () => {
  let userInputValue = userInput.value.trim();

  if (userInputValue !== "") {
    userInput.value = "";

    let newTodo = {
      id: todosArray.length + 1,
      title: userInputValue,
    };

    todosArray.push(newTodo);

    setLocalStorage(todosArray);

    renderTodos();
  }
});

btnEditTodo.addEventListener("click", () => {
  if (chosenTodoId !== null) {
    const id = parseInt(btnEditTodo.dataset.todoId);
    const index = todosArray.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      let newTodoInput = userInput.value.trim();
      if (newTodoInput !== "") {
        todosArray[index].title = newTodoInput;
        setLocalStorage(todosArray);
        renderTodos();
      }
    }
    chosenTodoId = null;
    userInput.value = "";
    btnEditTodo.classList.add("hidden");
  }
});

let chosenTodoId = null;

const renderTodos = () => {
  getLocalStorage();

  todoList.innerHTML = "";

  let searchQuery = userSearch.value.trim().toLowerCase();

  todosArray
    .filter((todo) => todo.title.toLowerCase().includes(searchQuery))
    .forEach((todo) => {
      let todoLi = document.createElement("li");
      todoLi.innerText = todo.title;
      todoLi.classList.add("todo-item");

      let deleteTodo = document.createElement("button");
      deleteTodo.innerText = "X";
      deleteTodo.classList.add("todo-delete");

      let editTodo = document.createElement("button");
      editTodo.innerText = "Edit";
      editTodo.classList.add("todo-edit");

      todoList.appendChild(todoLi);
      todoLi.appendChild(deleteTodo);
      todoLi.appendChild(editTodo);

      deleteTodo.addEventListener("click", () => {
        deleteTodoItem(todo.id);
      });

      editTodo.addEventListener("click", () => {
        editTodoItem(todo.id);
      });
    });
};

const deleteTodoItem = (id) => {
  const index = todosArray.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todosArray.splice(index, 1);
    setLocalStorage(todosArray);
    renderTodos();
  }
};

const editTodoItem = (id) => {
  chosenTodoId = id;
  btnEditTodo.classList.remove("hidden");

  btnEditTodo.dataset.todoId = id;
  const index = todosArray.findIndex((todo) => todo.id === id);
  userInput.value = todosArray[index].title;
};

userSearch.addEventListener("input", () => {
  renderTodos();
});

const setLocalStorage = (todosList) => {
  localStorage.setItem("todos", JSON.stringify(todosList));
};

renderTodos();
