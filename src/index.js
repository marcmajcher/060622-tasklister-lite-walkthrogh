document
  .getElementById('create-task-form')
  .addEventListener('submit', handleSubmit);

const taskList = [
  { id: 1, description: 'wash the chickens', priority: 'medium', done: false },
  { id: 2, description: 'replace roof', priority: 'medium', done: false },
  { id: 3, description: 'shine socks', priority: 'medium', done: false },
];

renderTasks(taskList);

function handleSubmit(e) {
  e.preventDefault();
  const taskDescription = e.target['new-task-description'].value;
  taskList.push({
    description: taskDescription,
    priority: 'medium',
    id: Math.random().toString(),
    done: false,
  });
  renderTasks(taskList);
  e.target.reset();
}

function renderTasks(tasks) {
  document.getElementById('tasks').innerHTML = '';
  tasks.filter((e) => !e.done).forEach(renderTask);
}

function renderTask(task) {
  const taskListElement = document.getElementById('tasks');
  const newTaskElement = document.createElement('li');
  newTaskElement.textContent = task.description;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '[X]';

  deleteButton.addEventListener('click', (e) => {
    // taskList = taskList.filter((e) => e.id !== task.id);
    task.done = true;
    renderTasks(taskList);
  });

  const prioritySelect = document.createElement('select');
  prioritySelect.innerHTML = `
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
  `;
  prioritySelect.value = task.priority;
  prioritySelect.addEventListener('change', (e) => {
    task.priority = e.target.value;
    renderTasks(taskList);
  });

  newTaskElement.classList.add(task.priority);

  newTaskElement.append(deleteButton);
  newTaskElement.append(prioritySelect);
  taskListElement.append(newTaskElement);
}
