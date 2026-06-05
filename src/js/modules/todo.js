import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { au, db } from "../../firebase.js";

const CATEGORIES = [
  { key: 'daily', label: 'Daily', formId: 'daily-form', inputId: 'daily-input', listId: 'daily-list', storageKey: 'dailyTasks' },
  { key: 'weekly', label: 'Weekly', formId: 'weekly-form', inputId: 'weekly-input', listId: 'weekly-list', storageKey: 'weeklyTasks' },
  { key: 'monthly', label: 'Monthly', formId: 'monthly-form', inputId: 'monthly-input', listId: 'monthly-list', storageKey: 'monthlyTasks' },
  { key: 'yearly', label: 'Yearly', formId: 'yearly-form', inputId: 'yearly-input', listId: 'yearly-list', storageKey: 'yearlyTasks' }
];

const TASK_STORAGE_KEYS = new Set(CATEGORIES.map(source => source.storageKey));

let todoMode = 'local';
let currentUid = null;
let unsubscribeTodos = null;

function addLocalTask(list, text, done, storageKey) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  if (done) span.classList.add('todo-done');

  const doneBtn = document.createElement('button');
  doneBtn.type = 'button';
  doneBtn.textContent = '✔';
  doneBtn.onclick = () => {
    span.classList.toggle('todo-done');
    saveTasks(list, storageKey);
  };

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.textContent = '❌';
  delBtn.onclick = () => {
    li.remove();
    saveTasks(list, storageKey);
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  list.appendChild(li);
}

function saveTasks(list, storageKey) {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const done = li.querySelector('span').classList.contains('todo-done');
    tasks.push({ text, done });
  });
  localStorage.setItem(storageKey, JSON.stringify(tasks));
  updateHomeSummary();
}

function normalizeTask(task) {
  if (!task || typeof task.text !== 'string') return null;
  const text = task.text.trim();
  if (!text) return null;
  return { text, done: Boolean(task.done) };
}

function readTasksFromStorage(key) {
  const saved = localStorage.getItem(key);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(key, '[]');
      return [];
    }
    return parsed.map(normalizeTask).filter(Boolean);
  } catch (error) {
    localStorage.setItem(key, '[]');
    return [];
  }
}

export function getAllTasksFromStorage() {
  return CATEGORIES.flatMap(source =>
    readTasksFromStorage(source.storageKey).map(task => ({
      ...task,
      source: source.label
    }))
  );
}

function updateHomeSummary(tasksOverride) {
  const list = document.getElementById('home-quick-tasks');
  const totalEl = document.getElementById('home-task-total');
  const remainingEl = document.getElementById('home-task-remaining');

  if (!list || !totalEl || !remainingEl) return;

  const tasks = Array.isArray(tasksOverride) ? tasksOverride : getAllTasksFromStorage();
  const total = tasks.length;
  const remaining = tasks.filter(task => !task.done).length;

  totalEl.textContent = total.toString();
  remainingEl.textContent = `${remaining} remaining`;

  list.innerHTML = '';

  if (total === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'No tasks yet. Add one from To-Do.';
    list.appendChild(empty);
    return;
  }

  tasks.slice(0, 4).forEach(task => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const box = document.createElement('span');
    box.className = 'task-box';
    li.appendChild(box);

    li.appendChild(document.createTextNode(`${task.text} · ${task.source}`));
    list.appendChild(li);
  });
}

function loadLocalTodo(listId, storageKey) {
  const list = document.getElementById(listId);
  if (!list) return;
  readTasksFromStorage(storageKey).forEach(task => {
    addLocalTask(list, task.text, task.done, storageKey);
  });
}

function normalizeCategory(value) {
  const text = String(value || '').trim().toLowerCase();
  const byKey = CATEGORIES.find(category => category.key === text);
  if (byKey) return byKey.key;
  const byLabel = CATEGORIES.find(category => category.label.toLowerCase() === text);
  if (byLabel) return byLabel.key;
  return 'daily';
}

function categoryLabel(categoryKey) {
  return CATEGORIES.find(category => category.key === categoryKey)?.label || 'Daily';
}

function createTaskNode(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  const span = document.createElement('span');
  span.textContent = task.text;
  if (task.done) span.classList.add('todo-done');

  const doneBtn = document.createElement('button');
  doneBtn.type = 'button';
  doneBtn.textContent = '✔';
  doneBtn.onclick = async () => {
    if (!currentUid) return;
    const nextDone = !task.done;
    span.classList.toggle('todo-done', nextDone);
    await updateDoc(doc(db, 'users', currentUid, 'todos', task.id), {
      done: nextDone,
      updatedAt: serverTimestamp(),
      completedAt: nextDone ? serverTimestamp() : null
    });
  };

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.textContent = '❌';
  delBtn.onclick = async () => {
    if (!currentUid) return;
    li.remove();
    await deleteDoc(doc(db, 'users', currentUid, 'todos', task.id));
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  return li;
}

function renderFirestoreTasks(tasks) {
  const buckets = Object.fromEntries(CATEGORIES.map(category => [category.key, []]));

  tasks.forEach(task => {
    const key = normalizeCategory(task.category);
    buckets[key].push({
      id: task.id,
      text: task.text,
      done: Boolean(task.done),
      category: key
    });
  });

  CATEGORIES.forEach(category => {
    const list = document.getElementById(category.listId);
    if (!list) return;
    list.innerHTML = '';
    buckets[category.key].forEach(task => {
      list.appendChild(createTaskNode(task));
    });
  });

  const summaryTasks = tasks.map(task => ({
    text: task.text,
    done: Boolean(task.done),
    source: categoryLabel(normalizeCategory(task.category))
  }));
  updateHomeSummary(summaryTasks);
}

async function addFirestoreTask(categoryKey, text) {
  if (!currentUid) {
    alert('Please login to save tasks.');
    return;
  }

  const todosRef = collection(db, 'users', currentUid, 'todos');
  await addDoc(todosRef, {
    text,
    category: categoryKey,
    done: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    completedAt: null
  });
}

function attachFirestoreListener(uid) {
  if (unsubscribeTodos) unsubscribeTodos();

  const todosRef = collection(db, 'users', uid, 'todos');
  const q = query(todosRef, orderBy('createdAt', 'asc'));
  unsubscribeTodos = onSnapshot(q, snapshot => {
    const tasks = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    renderFirestoreTasks(tasks);
  });
}

function clearAllLists() {
  CATEGORIES.forEach(category => {
    const list = document.getElementById(category.listId);
    if (list) list.innerHTML = '';
  });
}

function enableLocalMode() {
  todoMode = 'local';
  currentUid = null;
  if (unsubscribeTodos) {
    unsubscribeTodos();
    unsubscribeTodos = null;
  }
  clearAllLists();
  CATEGORIES.forEach(category => {
    loadLocalTodo(category.listId, category.storageKey);
  });
  updateHomeSummary();
}

function enableFirestoreMode(uid) {
  todoMode = 'firestore';
  currentUid = uid;
  clearAllLists();
  attachFirestoreListener(uid);
}

function setupTodoForms() {
  CATEGORIES.forEach(category => {
    const form = document.getElementById(category.formId);
    const input = document.getElementById(category.inputId);
    const list = document.getElementById(category.listId);

    if (!form || !input || !list) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      if (todoMode === 'firestore') {
        await addFirestoreTask(category.key, text);
      } else {
        addLocalTask(list, text, false, category.storageKey);
        saveTasks(list, category.storageKey);
      }

      input.value = '';
    });
  });
}

export function initTodo() {
  setupTodoForms();
  enableLocalMode();

  onAuthStateChanged(au, (firebaseUser) => {
    if (firebaseUser?.uid) {
      enableFirestoreMode(firebaseUser.uid);
      return;
    }
    enableLocalMode();
  });

  window.addEventListener('storage', e => {
    if (todoMode !== 'local') return;
    if (e.key && TASK_STORAGE_KEYS.has(e.key)) updateHomeSummary();
  });

  document.addEventListener('visibilitychange', () => {
    if (todoMode !== 'local') return;
    if (!document.hidden) updateHomeSummary();
  });
}