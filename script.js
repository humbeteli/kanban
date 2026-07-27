const taskLists = {
  todo: document.querySelector('.task-list[data-status="todo"]'),
  doing: document.querySelector('.task-list[data-status="doing"]'),
  done: document.querySelector('.task-list[data-status="done"]'),
};

const counts = {
  todo: document.querySelector('[data-status="todo"] .count'),
  doing: document.querySelector('[data-status="doing"] .count'),
  done: document.querySelector('[data-status="done"] .count'),
};

let tasks = [];

let editingId = null;
let draggedId = null;

const priorityLabels = { low: "AŞAĞI", medium: "ORTA", high: "YÜKSƏK" };

function createTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("task-card");
  card.dataset.id = task.id;
  card.draggable = true;

  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
    draggedId = task.id;
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  const badge = document.createElement("span");
  badge.classList.add("badge", `badge--${task.priority}`);
  badge.textContent = priorityLabels[task.priority];

  const title = document.createElement("h3");
  title.classList.add("task-title");
  title.textContent = task.title;

  const desc = document.createElement("p");
  desc.classList.add("task-desc");
  desc.textContent = task.description;

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.setAttribute("aria-label", "Redaktə et");
  editBtn.setAttribute("title", "Redaktə et");
  editBtn.innerHTML = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4445 19.6875H20.9445M14.4443 5.68747L5.44587 14.6859C4.78722 15.3446 4.26719 16.1441 4.10888 17.062C3.94903 17.9888 3.89583 19.139 4.44432 19.6875C4.99281 20.236 6.14299 20.1828 7.0698 20.0229C7.98772 19.8646 8.78722 19.3446 9.44587 18.6859L18.4443 9.68747M14.4443 5.68747C14.4443 5.68747 17.4443 2.68747 19.4443 4.68747C21.4443 6.68747 18.4443 9.68747 18.4443 9.68747M14.4443 5.68747L18.4443 9.68747" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("aria-label", "Sil");
  deleteBtn.setAttribute("title", "Sil");
  deleteBtn.innerHTML = `<svg width="18px" height="18px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <title>Sil</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-259.000000, -203.000000)" fill="#ff0000"> <path d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z" id="trash" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>`;

  editBtn.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Tapşırığı Redaktə Et"; //edit etdikde modal basligi deyissin
    editingId = task.id;
    titleInput.value = task.title;
    descInput.value = task.description;
    priorityInput.value = task.priority;
    modal.hidden = false;
  });

  actions.appendChild(editBtn);

  deleteBtn.addEventListener("click", () => {
    const confirmed = confirm("Silmək istədiyinizə əminsiniz?");

    if (confirmed === true) {
      tasks = tasks.filter((t) => t.id !== task.id);

      renderTasks();
    }
  });
  actions.appendChild(deleteBtn);

  card.appendChild(badge);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(actions);

  return card;
}

function renderTasks() {
  Object.values(taskLists).forEach((list) => (list.innerHTML = ""));

  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedPriority = priorityFilter.value;

  ["todo", "doing", "done"].forEach((status) => {
    const columnTasks = tasks.filter((task) => {
      const sameStatus = task.status === status;

      const matchesSearch =
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue);

      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;

      return sameStatus && matchesSearch && matchesPriority;
    });

    if (columnTasks.length === 0) {
      const empty = document.createElement("p");
      empty.classList.add("empty-message");
      empty.textContent = "Burada tapşırıq yoxdur";
      taskLists[status].appendChild(empty);
    } else {
      columnTasks.forEach((task) => {
        taskLists[status].appendChild(createTaskCard(task));
      });
    }

    counts[status].textContent = columnTasks.length;
    taskLists[status].scrollTop = taskLists[status].scrollHeight;
  });

  saveTask();
}

const modal = document.getElementById("task-modal");
const addBtn = document.querySelector(".newtask");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const searchInput = document.getElementById("search-input");
const priorityFilter = document.getElementById("priority-filter");

addBtn.addEventListener("click", () => {
  editingId = null;
  form.reset();
  document.getElementById("modal-title").textContent = "Yeni Tapşırıq"; // yeni tapsiriq elave etdikde basliq deyissin
  modal.hidden = false;
});

cancelBtn.addEventListener("click", () => {
  editingId = null;
  form.reset();
  modal.hidden = true;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editingId === null) {
    const newTask = {
      id: Date.now(),
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      priority: priorityInput.value,
      status: "todo",
    };

    tasks.push(newTask);
  } else {
    const taskToEdit = tasks.find((t) => t.id === editingId);
    taskToEdit.title = titleInput.value.trim();
    taskToEdit.description = descInput.value.trim();
    taskToEdit.priority = priorityInput.value;
    editingId = null;
  }

  renderTasks();
  modal.hidden = true;
  form.reset();
});

searchInput.addEventListener("input", () => {
  renderTasks();
});

priorityFilter.addEventListener("change", () => {
  renderTasks();
});

Object.values(taskLists).forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    list.classList.add("drag-over");
  });

  list.addEventListener("dragleave", () => {
    list.classList.remove("drag-over");
  });

  list.addEventListener("drop", () => {
    list.classList.remove("drag-over");
    const task = tasks.find((t) => t.id === draggedId);
    task.status = list.dataset.status;
    renderTasks();
  });
});

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

loadTask();
renderTasks();
