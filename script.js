function onDrag(e) {
    const willDragged = document.querySelector('.to-be-dragged');
    
    willDragged.style.left = `${e.clientX}px`;
    willDragged.style.top = `${e.clientY}px`;
}

function handleDragEvent() {
    const willDragged = document.querySelector('.to-be-dragged');

    willDragged.addEventListener("mousedown", () => {
        willDragged.addEventListener("mousemove", onDrag)
    });
    willDragged.addEventListener("mouseup", () => {
        willDragged.removeEventListener("mousemove", onDrag)
    });
}

handleDragEvent();