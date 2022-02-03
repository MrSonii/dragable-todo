function changeText(clonedNode, inputElement) {
  clonedNode.querySelector("p").innerHTML = inputElement.value;
}

function setValueToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function updateTaskCount() {
  const count = getValueFromLocalStorage("count") || 0;

  document.querySelector(".count").innerHTML = `(${count} tasks)`;
}

function updateTodoTasksToLS(newValue) {
  const todo = getValueFromLocalStorage("Todo") || [];

  let idCount = getValueFromLocalStorage("idCount") || 0;

  todo.push({
    content: newValue,
    id: idCount
  });

  setValueToLocalStorage("idCount", ++idCount);
  setValueToLocalStorage("Todo", todo);
}

function getValueFromLocalStorage(key) {
  const value = localStorage.getItem(key);

  if (value !== null || value !== undefined) {
    return JSON.parse(value);
  }

  return null;
}

function appendNewTask(clonedNode, inputValue) {
  if (inputValue !== "") {
    const todo = document.querySelector(".todo");
    const count = getValueFromLocalStorage("count") || 0;

    setValueToLocalStorage("count", count + 1);
    updateTaskCount();
    updateTodoTasksToLS(inputValue);
    clonedNode.classList.remove("hidden");
    clonedNode.setAttribute("data-id", getValueFromLocalStorage("idCount") - 1);
    todo.appendChild(clonedNode);
  } else {
    alert("Task Cannot be Empty");
  }
}

function handleOldTask(taskList, tasksInLS) {
  if (tasksInLS.length > 0) {
    for (const task of tasksInLS) {
      const clonedNode = document
        .querySelector(".list-item-style")
        .cloneNode(true);

      clonedNode.setAttribute("data-id", task.id);
      clonedNode.querySelector("p").innerHTML = task.content;
      clonedNode.classList.remove("hidden");
      taskList.appendChild(clonedNode);

      deleteTask(clonedNode);
    }
  }
}

function loadOldTasks() {
  const todoList = document.querySelector(".todo");
  const todoTasksInLS = getValueFromLocalStorage("Todo") || [];

  const inProgressList = document.querySelector(".in-progress");
  const inProgressTasksInLS = getValueFromLocalStorage("In-Progress") || [];

  const doneList = document.querySelector(".done");
  const doneTasksInLS = getValueFromLocalStorage("Done") || [];

  handleOldTask(todoList, todoTasksInLS);
  handleOldTask(inProgressList, inProgressTasksInLS);
  handleOldTask(doneList, doneTasksInLS);
}

function createNewTask() {
  const buttonElem = document.querySelector(".button-style");
  const inputElement = document.querySelector(".input-style");

  updateTaskCount();
  loadOldTasks();

  function handleAppendTask() {
    const clonedNode = document
      .querySelector(".list-item-style")
      .cloneNode(true);

    changeText(clonedNode, inputElement);
    appendNewTask(clonedNode, inputElement.value);
    deleteTask(clonedNode);

    inputElement.value = "";
  }

  inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleAppendTask();
    }
  });

  buttonElem.addEventListener("click", handleAppendTask);

  handleDragEvent();
}

function dltTaskFromLS(e, task, dltIconGrandParent) {
  const contentToBeDeleted = e.target.parentElement.querySelector("p")
    .innerHTML;
  const taskId = parseInt(task.dataset.id);
  const keyToBeChanged = dltIconGrandParent.querySelector("h2").innerHTML;
  let keysValueInLS = getValueFromLocalStorage(keyToBeChanged);

  for (let obj of keysValueInLS) {
    if (obj.content === contentToBeDeleted && obj.id === taskId) {
      const value = obj;
      keysValueInLS = keysValueInLS.filter((item) => {
        return item !== value;
      });
    }
  }

  setValueToLocalStorage(keyToBeChanged, keysValueInLS);
  setValueToLocalStorage("count", getValueFromLocalStorage("count") - 1);
  setValueToLocalStorage("idCount", getValueFromLocalStorage("idCount") - 1);
  updateTaskCount();
}

function deleteTask(task) {
  const dltIcon = task.querySelector(".times");

  dltIcon.addEventListener("click", (e) => {
    const dltIconGrandParent = dltIcon.parentNode.parentNode;
    task.remove();
    dltTaskFromLS(e, task, dltIconGrandParent);
  });
}

function handleDragEvent() {
  let task, deletedValue;
  const taskSlots = document.querySelectorAll(".list-tile");

  for (const taskSlot of taskSlots) {
    taskSlot.addEventListener("dragstart", (event) => {
      const { target } = event;

      if (target && target.className.includes("list-item-style")) {
        task = target;
      }

      deletedValue = deleteDraggedTaskFromLS(taskSlot, event, deletedValue);
    });

    taskSlot.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    taskSlot.addEventListener("dragenter", () => {
      taskSlot.classList.add("border");
    });

    taskSlot.addEventListener("dragleave", () => {
      taskSlot.classList.remove("border");
    });

    taskSlot.addEventListener("drop", (e) => {
      taskSlot.classList.remove("border");
      taskSlot.appendChild(task);

      updateDroppedTaskToLS(e, deletedValue);
    });
  }
}

function deleteDraggedTaskFromLS(taskSlot, event, deletedValue) {
  const keyName = taskSlot.querySelector("h2").innerHTML;
  const taskContent = event.target.querySelector("p").innerHTML;
  const idAttrVal = parseInt(event.target.dataset.id);
  let keyNameValueInLS = getValueFromLocalStorage(keyName);

  for (const obj of keyNameValueInLS) {
    if (obj.content === taskContent && obj.id === idAttrVal) {
      deletedValue = keyNameValueInLS[keyNameValueInLS.indexOf(obj)];
      keyNameValueInLS = keyNameValueInLS.filter((item) => {
        return item !== deletedValue;
      });

      setValueToLocalStorage(keyName, keyNameValueInLS);
    }
  }

  return deletedValue;
}

function updateDroppedTaskToLS(e, deletedValue) {
  const keyName = e.currentTarget.querySelector("h2").innerHTML;
  const keyNameValue = getValueFromLocalStorage(keyName) || [];

  keyNameValue.push(deletedValue);
  setValueToLocalStorage(keyName, keyNameValue);
}

createNewTask();
