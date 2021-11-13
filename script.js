function onDrag(e) {
    const willDragged = document.querySelector('.to-be-dragged');    
    const appliedStyles = window.getComputedStyle(willDragged);
    const left = parseInt(appliedStyles.left);
    const top = parseInt(appliedStyles.top);
    
    willDragged.style.left = `${e.clientX}`;
    willDragged.style.top = `${e.clientY}`;
}

function handleDragEvent() {
    const willDragged = document.querySelector('.to-be-dragged');

    willDragged.addEventListener("drag", onDrag);
}

handleDragEvent();