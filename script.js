const form = document.getElementById('todo_form');
const input = document.getElementById('todo_input');
const list = document.getElementById('todo_list');
const completedList = document.getElementById('completed_list');
const title = document.querySelector('h2');
title.style.display = 'none';


form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const text = input.value.trim();
    if (!text) return;

    createTodoItem(text);

    input.value = '';
    input.focus();
});

function createTodoItem(text, done = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  if (done) span.classList.add('done');

  const btnFeito = document.createElement('button');
  btnFeito.innerHTML = '<i class="fa-solid fa-check"></i>';
  btnFeito.addEventListener('click', function() {
    title.style.display = 'block';
    span.classList.toggle('done');

    if (span.classList.contains('done')) {
      completedList.appendChild(li);
    } else {
      list.appendChild(li);
    }

    saveTodos();
  });

  const btnEditar = document.createElement('button');
  btnEditar.innerHTML = '<i class="fa-solid fa-edit"></i>';
  btnEditar.addEventListener('click', function() {
    const novoTexto = prompt('Editar tarefa:', span.textContent);
    if (novoTexto !== null && novoTexto.trim() !== '') {
      span.textContent = novoTexto.trim();
      saveTodos();
    } else {
      alert('Texto inválido. A tarefa não foi editada.');
    }
  });

  const btnExcluir = document.createElement('button');
  btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
  btnExcluir.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      li.remove();
      saveTodos();
    }
  });

  li.appendChild(span);
  li.appendChild(btnFeito);
  li.appendChild(btnEditar);
  li.appendChild(btnExcluir);

  if (done) {
    completedList.appendChild(li);
  } else {
    list.appendChild(li);
  }
}

function saveTodos() {
  const todos = [];
  const allLis = [...list.querySelectorAll('li'), ...completedList.querySelectorAll('li')];

  allLis.forEach(li => {
    const span = li.querySelector('span');
    todos.push({
      text: span.textContent,
      done: span.classList.contains('done')
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todosJSON = localStorage.getItem('todos');
  if (!todosJSON) return;

  const todos = JSON.parse(todosJSON);
  todos.forEach(todo => {
    createTodoItem(todo.text, todo.done);
  });
}