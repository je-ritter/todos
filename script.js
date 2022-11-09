const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".task-box");

// getting localstorage todo-lists
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo() {
  let li = "";
  todos.forEach((todo, id) => {
    li += `
      <li class="task">
        <label for="${id}">
          <input onclick="updateStatus(this)" type="checkbox" id="${id}">
          <p>${todo.name}</p>
        </label>
        <div class="settings">
          <iconify-icon icon="ant-design:ellipsis-outlined"></iconify-icon>
          <ul class="task-menu">
            <li><iconify-icon icon="fluent-mdl2:pen-workspace"></iconify-icon>Edit</li>
            <li><iconify-icon icon="gg:trash"></iconify-icon>Delete</li>
          </ul>
        </div>
      </li>
    `
  });
  taskBox.innerHTML = li;
}
showTodo();

function updateStatus(selectedTask) {
  // getting paragraph that contains task name
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked) {
    taskName.classList.add("checked");
    // updating the status of selected task to completed
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    // updating the status of selected task to pending
    todos[selectedTask.id].status = "pending";

  }
  localStorage.setItem("todo-list", JSON.stringify(todos));

}

taskInput.addEventListener("keyup", e => {
  let userTask = taskInput.value.trim();
  if(e.key == "Enter" && userTask) {
    console.log(userTask)
    if(!todos) { // if todos don't exist, pass an empty array to todos.
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo); // adding new task to todos.
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});