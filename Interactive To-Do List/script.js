document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage
  loadTasks();

  addTaskBtn.addEventListener("click", () => {
    const taskValue = taskInput.value.trim();
    if (taskValue) {
      addTask(taskValue);
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const taskValue = taskInput.value.trim();
      if (taskValue) {
        addTask(taskValue);
        taskInput.value = "";
      }
    }
  });

  function addTask(task) {
    const li = document.createElement("li");
    li.innerHTML = `
          <span>${task}</span>
          <button class="remove-btn">✖</button>
      `;

    // Toggle completed state
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    // Remove task
    const removeBtn = li.querySelector(".remove-btn");
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
      tasks.push({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
              <span>${task.text}</span>
              <button class="remove-btn">✖</button>
          `;
      if (task.completed) {
        li.classList.add("completed");
      }

      // Toggle completed state
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });

      // Remove task
      const removeBtn = li.querySelector(".remove-btn");
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
      });

      taskList.appendChild(li);
    });
  }
});
