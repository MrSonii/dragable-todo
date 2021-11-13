function onDrag({movementX, movementY}) {
    const appliedStyles = window.getComputedStyle(willDragged);
    const left = parseInt(appliedStyles.left);
    const top = parseInt(appliedStyles.top);
    
    willDragged.style.left = `${left + movementX}px`;
    willDragged.style.top = `${top + movementY}px`;
}

const willDragged = document.querySelector('.to-be-dragged');

willDragged.addEventListener("drag", () => {
    willDragged.addEventListener("mousemove", onDrag);
});

// willDragged.addEventListener("mouseup", () => {
//     willDragged.removeEventListener("mousemove", onDrag);
// });
