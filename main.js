let itemsArray = [];
let editedItem = null;

function addItem() {
    let inputElement = document.querySelector('.text-input');
    let inputValue = inputElement.value.trim();

    if (inputValue === '') {
        // alert("Please enter a non-empty value before adding.");
        return;
    }

    if (editedItem !== null) {
        itemsArray[editedItem.index].content = inputValue;
        itemsArray[editedItem.index].editing = false; // Set editing to false after saving
        editedItem = null;
    } else {
        let newItem = { content: inputValue, completed: false, editing: false };
        itemsArray.push(newItem);
    }

    inputElement.value = '';

    // Get the current filter and update the display accordingly
    let activeFilter = document.querySelector('input[name="filter"]:checked').value;
    displayItems(activeFilter);

    updateAddToListButtonText();
}




function handleDone(index) {
    itemsArray[index].completed = !itemsArray[index].completed;

    if (itemsArray[index].completed) {
        itemsArray[index].doneButtonText = 'Undone';
        itemsArray[index].editButtonText = 'Delete';
    } else {
        itemsArray[index].doneButtonText = 'Done';
        itemsArray[index].editButtonText = 'Edit';
    }

    // Check if there is a filter applied, and update the display accordingly
    let activeFilter = document.querySelector('input[name="filter"]:checked').value;
    displayItems(activeFilter);
    updateAddToListButtonText();
}



function handleEditOrDelete(index) {
    if (itemsArray[index].completed) {
        handleDelete(index);
    } else {
        handleEdit(index);
    }

    let activeFilter = document.querySelector('input[name="filter"]:checked').value;
    displayItems(activeFilter);
    updateAddToListButtonText();
}


function handleDelete(index) {
    itemsArray.splice(index, 1);
    displayItems();
    updateAddToListButtonText();
}

function handleEdit(index) {
    let inputElement = document.querySelector('.text-input');
    inputElement.value = itemsArray[index].content;
    editedItem = { index: index };
    displayItems();
    updateAddToListButtonText();
}

// ... (your existing code)

function displayItems(filter) {
    let itemsContainer = document.querySelector('.displayed-items-container');
    itemsContainer.innerHTML = '';

    for (let i = 0; i < itemsArray.length; i++) {
        let shouldDisplay = true;

        if (filter === 'completed' && !itemsArray[i].completed) {
            shouldDisplay = false; // Skip if filtering for completed and the item is not completed
        }

        if (filter === 'notcompleted' && itemsArray[i].completed) {
            shouldDisplay = false; // Skip if filtering for not completed and the item is completed
        }

        if (shouldDisplay) {
            let listItem = document.createElement('li');
            let textSpan = document.createElement('span');
            textSpan.textContent = itemsArray[i].content;

            if (itemsArray[i].completed) {
                textSpan.style.textDecoration = 'line-through';
            }

            let buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            let doneButton = document.createElement('button');
            doneButton.textContent = itemsArray[i].doneButtonText || 'Done';
            doneButton.classList.add('done');
            doneButton.addEventListener('click', () => handleDone(i));

            let editButton = document.createElement('button');
            editButton.textContent = itemsArray[i].editButtonText || 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => handleEditOrDelete(i));

            listItem.appendChild(textSpan);
            buttonContainer.appendChild(doneButton);
            buttonContainer.appendChild(editButton);
            listItem.appendChild(buttonContainer);
            itemsContainer.appendChild(listItem);
        }
    }
}

// ... (your existing code)


function updateAddToListButtonText() {
    let addToDoListButton = document.querySelector('.save-button');
    addToDoListButton.textContent = editedItem !== null ? 'Save to List' : 'Add to List';
}

function filterItems(filter) {
    displayItems(filter);
}

displayItems();
document.querySelector('.save-button').addEventListener('click', addItem);
