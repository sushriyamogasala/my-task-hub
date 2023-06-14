window.addEventListener('load', () => {

    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
	const businessRadioButton = document.querySelector('#category1');
	const businessLabel = document.querySelector('.business');
    const personalRadioButton = document.querySelector('#category2');
	const personalLabel = document.querySelector('.personal');
	const othersRadioButton = document.querySelector('#category3');
	const othersLabel = document.querySelector('.others');
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    //even though the code doesn't explicitly mention the ID "name" as the username, it is inferred from the use of nameInput and the selection of the element with '#name' selector. The ID attribute is used as a way to uniquely identify the input field for the username.

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username',e.target.value);
    })
	businessRadioButton.addEventListener('change', () => {
		if (businessRadioButton.checked) {
			businessLabel.style.backgroundColor = 'rgba(58, 130, 238,0.5)';
			personalLabel.style.backgroundColor = '';
			othersLabel.style.backgroundColor = '';
			
		} else {
			businessLabel.style.backgroundColor = 'white'; // Reset the background color if unchecked
		}	
	});	
	personalRadioButton.addEventListener('change',() => {
		if(personalRadioButton.checked) {
			personalLabel.style.backgroundColor = 'rgba(234, 64, 164,0.5)';
			businessLabel.style.backgroundColor = '';
			othersLabel.style.backgroundColor = '';
		}
	})
	othersRadioButton.addEventListener('change', () => {
		if(othersRadioButton.checked) {
			othersLabel.style.backgroundColor = 'rgba(49, 49, 84,0.5)';
			businessLabel.style.backgroundColor = '';
			personalLabel.style.backgroundColor = '';
		}
	})

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done:false,
            createdAt: new Date().getDate()
        }
        todos.push(todo);

        localStorage.setItem('todos',JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })
    DisplayTodos();
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

        input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
        if (todo.category == 'personal') {
			span.classList.add('personal');
		} else if(todo.category == 'business'){
			span.classList.add('business');
		} else {
            span.classList.add('others');
        }
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
        input.addEventListener('change', e => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})
        edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
    })
}