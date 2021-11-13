function onDrag({movementX, movementY}) {
    const appliedStyles = window.getComputedStyle(willDragged);
    const left = parseInt(appliedStyles.left);
    const top = parseInt(appliedStyles.top);
    
    willDragged.style.left = `${left + movementX}px`;
    willDragged.style.top = `${top + movementY}px`;
    console.log(movementX, movementY);
}

const willDragged = document.querySelector('.to-be-dragged');

willDragged.addEventListener("drag", onDrag);