let addButton = document.querySelector('.add-button-container');

let firstTask = document.getElementById('first-task');
let firstGrabPlace = document.querySelector('.grab-place');
firstGrabPlace.draggable = true;

addButton.addEventListener('click', insertRow);

let sortAlph = document.querySelector('.up');
sortAlph.addEventListener('click', sortAlphabetically);
let sortReverse = document.querySelector('.down');
sortReverse.addEventListener('click', sortInReverse);

function sortAlphabetically() {
    let tasks = document.querySelectorAll('.task .input-task');
    let arrayOfValues = [];
    tasks.forEach((task) => {
        arrayOfValues.push(task.value);
    })
    arrayOfValues.sort();
    for(let i = 0; i < tasks.length; i++) {
        tasks[i].value = arrayOfValues[i];
    }

    sortAlph.style.display = 'none';
    sortReverse.style.display = 'block';
}

function sortInReverse() {
    let tasks = document.querySelectorAll('.task .input-task');
    let arrayOfValues = [];
    tasks.forEach((task) => {
        arrayOfValues.push(task.value);
    })

    arrayOfValues.sort().reverse();
    for(let i = 0; i < tasks.length; i++) {
        tasks[i].value = arrayOfValues[i];
    }

    sortAlph.style.display = 'block';
    sortReverse.style.display = 'none';
}

function insertRow() {
    let tasksContainer = document.querySelector('.tasks-container');

    let task = document.createElement('div');
    task.classList.add('task');
    task.classList.add('draggable');

    let grabPlace = document.createElement('div');
    grabPlace.classList.add('grab-place');
    let grabImage = document.createElement('img');
    grabImage.src = 'images/grab.svg';
    grabImage.classList.add('grab');
    grabPlace.appendChild(grabImage);
    grabPlace.draggable = true;

    let inputTask = document.createElement('input');
    inputTask.classList.add('input-task');
    let deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-button', 'w3-xlarge');
    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('glyphicon', 'glyphicon-remove', 'delete');
    deleteButton.appendChild(deleteIcon);

    tasksContainer.appendChild(task);
    task.appendChild(grabPlace);
    task.appendChild(inputTask);
    task.appendChild(deleteButton);

    readContainer();
    dragAndDrop();
}

function readContainer() {
    let deleteButtons = document.querySelectorAll('.task .delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', removeRow);
    })
}

function removeRow(e) {
    e.target.parentElement.parentElement.remove();
}

/// Thanks to Javid and his video from youtube xDDDD
function dragAndDrop() {
    const grabPlaces = document.querySelectorAll('.grab-place');
    const containers = document.querySelectorAll('.tasks-container');

    grabPlaces.forEach(grabPlace => {
        grabPlace.addEventListener('dragstart', () => {
            grabPlace.parentElement.classList.add('dragging');
            grabPlace.nextElementSibling.classList.add('dragging');
        })

        grabPlace.addEventListener('dragend', () => {
            grabPlace.parentElement.classList.remove('dragging');
            grabPlace.nextElementSibling.classList.remove('dragging');
        })
    })

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging');
            if(draggable == null) {
                return;
            }
            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
        })
    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
}