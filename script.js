function onDrag(e) {
    const willDragged = document.querySelector('.to-be-dragged');
    
    willDragged.style.left = `${e.clientX}`;
    willDragged.style.top = `${e.clientY}`;

    e.preventDe
    console.log(e.clientX, e.clientY);
}

function handleDragEvent() {
    const willDragged = document.querySelector('.to-be-dragged');

    willDragged.addEventListener("drag", onDrag);
    willDragged.addEventListener("dragend", function (e) {
        e.preventDefault();
    });
}

handleDragEvent();