let addButton = document.querySelector('.add-button-container');

addButton.addEventListener('click', insertRow);

function insertRow() {
    let tasksContainer = document.querySelector('.tasks-container');

    let task = document.createElement('div');
    task.classList.add('task');
    let grabPlace = document.createElement('div');
    grabPlace.classList.add('grab-place');
    let inputTask = document.createElement('input');
    inputTask.classList.add('input-task');
    let deleteButton = document.createElement('delete-button');
    deleteButton.classList.add('delete-button');
    
    tasksContainer.appendChild(task);
    task.appendChild(grabPlace);
    task.appendChild(inputTask);
    task.appendChild(deleteButton);

    readContainer();
}

function readContainer() {
    let deleteButtons = document.querySelectorAll('.task .delete-button');
    console.log(deleteButtons);
    deleteButtons.forEach((button) => {
        button.addEventListener('click', removeRow);
    })
}

function removeRow(e) {
    e.target.parentElement.remove();
}




const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

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