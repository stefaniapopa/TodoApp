const objectList = [];

function addTodo(task, state, date) {
    objectList.push({
        task: task,
        state: state,
        date: date
    });
}

addTodo("finish project", "in progress", "today");
addTodo("finish project", "in progress", "today");
addTodo("finish project", "in progress", "today");

function getTableRows(listTable) {
    function getRowFromTodo(todo, index) {
        return `<tr data-id='${index}'>
        <td>${todo.task}</td>
        <td>${todo.state}</td>
        <td>${todo.date}</td>
        <td>
        <a href='#' class='delete-row' data-id='${index}'>&#10006;</a>
        <a href='#' class='edit-row' data-id='${index}'>&#9998;</a>
        </td>
        </tr>`;
    }
    return listTable.map(getRowFromTodo).reduce((acc, todoRow) => {
        return (acc += todoRow);
    }, "");
}

function saveRow() {
    const btn = document.querySelector("#addButton");
    btn.addEventListener("click", () => {
        const isEditMode = btn.dataset.editTodoId !== undefined;
        const inputValue = document.querySelector('#textArea').value;
        const statusBtn = document.querySelector('#status').value;
        const dateBtn = document.querySelector('#date input[name=date]').value;

        if (isEditMode) {
            const todoToUpdate = objectList[btn.dataset.editTodoId]
            todoToUpdate.task = inputValue
            todoToUpdate.state = statusBtn
            todoToUpdate.date = dateBtn

        } else {
            addTodo(inputValue, statusBtn, dateBtn)

        };

        generateTableRows()
    })
}

function editRow(id) {
    const objTodo = objectList[id]

    const inputValue = document.querySelector('#textArea');
    const statusBtn = document.querySelector('#status');
    const dateBtn = document.querySelector('#date input[name=date]');

    inputValue.value = objTodo.task
    statusBtn.value = objTodo.state
    dateBtn.value = objTodo.date
}

function addEventListeners() {
    const registerRemoveTodo = () => {
        const removeButton = document.querySelectorAll('.delete-row')

        removeButton.forEach(removeButtonElement => {
            removeButtonElement.addEventListener('click', () => {
                const todoId = removeButtonElement.dataset.id;
                objectList.splice(todoId, 1)
                generateTableRows()
            })
        })
    }

    const registerEditTodo = () => {
        const editButton = document.querySelectorAll('.edit-row')

        editButton.forEach(editButtonElements => {
            editButtonElements.addEventListener('click', () => {
                const todoId = editButtonElements.dataset.id;
                const todoToEdit = objectList[todoId]
                const textArea = document.querySelector('#textArea');
                const statusSelect = document.querySelector('#status');
                const dateInput = document.querySelector('#date input[name=date]');

                textArea.value = todoToEdit.task
                statusSelect.value = todoToEdit.state
                dateInput.value = todoToEdit.date

                const formSubmitButton = document.querySelector("#addButton")
                formSubmitButton.setAttribute('data-edit-todo-id', todoId);
                formSubmitButton.innerHTML = 'Edit task'
            })
        })
    }

    registerEditTodo()
    registerRemoveTodo()
}

saveRow()

function generateTableRows() {
    document.querySelector('#list tbody').innerHTML = getTableRows(objectList);
    addEventListeners()
}

generateTableRows()

console.log(objectList)