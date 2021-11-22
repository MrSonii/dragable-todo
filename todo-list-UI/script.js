function changeText(clonedNode, inputElement) {
    clonedNode.querySelector("p").innerHTML = inputElement.value;
}

function appendTask(clonedNode, inputValue) {
    if (inputValue !== "") {
        const todo = document.querySelector(".todo-list");

        clonedNode.classList.remove("absolute-hidden");
        clonedNode.classList.add("task");
        todo.appendChild(clonedNode);
    } else {
        alert("Task Cannot be Empty");
    }
}

function createNewTask() {
    const buttonElem = document.querySelector(".button-style");
    const inputElement = document.querySelector(".input-style");

    buttonElem.addEventListener("click", () => {
        const clonedNode = document.querySelector(".list-item-style").cloneNode(true);

        changeText(clonedNode, inputElement);
        appendTask(clonedNode, inputElement.value);
        handleDragEvent();
    });

}

function handleDragEvent() {
    const tasks = document.querySelectorAll(".task");
    const taskSlots = document.querySelectorAll(".list-tile");
    
    let dragItem = null;

    for (task of tasks) {   
        task.addEventListener("dragstart", (e) => {
            dragItem = e.target;
        });
    }
    
    for (taskSlot of taskSlots) {
        taskSlot.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        taskSlot.addEventListener("drop", (e) => {
            e.target.appendChild(dragItem);
            dragItem = null;
        });
    }
}

createNewTask();