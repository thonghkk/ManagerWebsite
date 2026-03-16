import { STORAGE_KEY } from '../constants/config.js';
import * as api from '../services/api.js';
import { eventBus } from '../events/eventBus.js';
import { DEFAULT_DATA } from '../data/defaultData.js';
import { uid, showLoading, hideLoading } from '../utils/helpers.js';

let state = {
  categories: [],
  activeCatId: null,
};

export const getState = () => state;
export const getCategories = () => state.categories;
export const getActiveCatId = () => state.activeCatId;

export async function loadState() {
  showLoading('Đang tải dữ liệu...');
  let loadedData = null;
  let loadedQuestions = null;
  try {
    const [data, questions] = await Promise.all([
      api.fetchData(),
      api.fetchQuestions()
    ]);
    if (Array.isArray(data) && data.length > 0) loadedData = data;
    loadedQuestions = questions;
  } catch (err) {
    console.warn('Python server not found, falling back to localStorage');
  }

  // Artificial delay for smooth transition
  await new Promise(r => setTimeout(r, 600));

  if (!loadedData) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { loadedData = JSON.parse(raw); } catch (_) {}
    }
  }

  if (!loadedData) {
    // deep copy
    loadedData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  } else {
    // Merge logic: ensure any categories in DEFAULT_DATA that are missing in loadedData are added
    DEFAULT_DATA.forEach(defCat => {
      if (!loadedData.some(c => c.id === defCat.id)) {
        loadedData.push(JSON.parse(JSON.stringify(defCat)));
      }
    });
  }

  loadedQuestions = loadedQuestions || {};

  loadedData.forEach(cat => {
    cat.items.forEach(item => {
      const qData = loadedQuestions[item.id];
      if (qData) {
          item.customQuestions = qData.customQuestions || [];
          item.answers = qData.answers || {};
      } else {
          item.customQuestions = item.customQuestions || [];
          item.answers = item.answers || {};
      }
    });
  });

  state.categories = loadedData;
  const savedCatId = localStorage.getItem('android_knowledge_active_cat');
  if (savedCatId && state.categories.some(c => c.id === savedCatId)) {
    state.activeCatId = savedCatId;
  } else if (!state.activeCatId && state.categories.length > 0) {
    state.activeCatId = state.categories[0].id;
  }
  
  eventBus.emit('stateLoaded', state);
  await saveState(false); 
  hideLoading();
}

export async function saveState(showUI = true) {
  if (showUI) showLoading('Đang lưu...');

  // Update "completed" status for each category before saving to server
  state.categories.forEach(cat => {
    const total = cat.items.length;
    const done = cat.items.filter(i => i.done).length;
    cat.completed = total > 0 && total === done;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.categories));
  
  try {
    await api.saveData(state.categories);

    const questionsData = {};
    state.categories.forEach(cat => {
      cat.items.forEach(item => {
        if ((item.customQuestions && item.customQuestions.length > 0) || 
            (item.answers && Object.keys(item.answers).length > 0)) {
          questionsData[item.id] = {
            catId: cat.id,
            itemName: item.name,
            customQuestions: item.customQuestions || [],
            answers: item.answers || {}
          };
        }
      });
    });

    await api.saveQuestions(questionsData);
  } catch (err) {
    console.error('Python Server is not running or saving failed');
  } finally {
    if (showUI) hideLoading();
  }
}

export function setActiveCatId(catId) {
  state.activeCatId = catId;
  if (catId) {
    localStorage.setItem('android_knowledge_active_cat', catId);
  } else {
    localStorage.removeItem('android_knowledge_active_cat');
  }
  eventBus.emit('categoryActivated', catId);
}

export function toggleItem(catId, itemId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;
  item.done = !item.done;
  saveState(false); // Don't block UI for simple toggle
  eventBus.emit('itemToggled', { catId, itemId, done: item.done });
}

export async function saveItem(catId, itemId, payload) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;

  if (itemId) {
    // Edit
    const item = cat.items.find(i => i.id === itemId);
    if (item) {
      item.name = payload.name;
      item.note = payload.note;
    }
  } else {
    // Add
    cat.items.push({ id: uid(), name: payload.name, done: false, note: payload.note, customQuestions: [], answers: {} });
  }
  await saveState(true);
  eventBus.emit('categoriesChanged', state.categories);
}

export async function saveCategory(catId, payload) {
  if (catId) {
    const cat = state.categories.find(c => c.id === catId);
    if (cat) {
      cat.name = payload.name;
      cat.icon = payload.icon;
    }
  } else {
    state.categories.push({ id: uid(), name: payload.name, icon: payload.icon, items: [] });
  }
  await saveState(true);
  eventBus.emit('categoriesChanged', state.categories);
}

export async function deleteCategory(catId) {
  state.categories = state.categories.filter(c => c.id !== catId);
  if (state.activeCatId === catId) state.activeCatId = null;
  await saveState(true);
  eventBus.emit('categoriesChanged', state.categories);
  if (!state.activeCatId) eventBus.emit('categoryActivated', null);
}

export async function deleteItem(catId, itemId) {
  const cat = state.categories.find(c => c.id === catId);
  if (cat) cat.items = cat.items.filter(i => i.id !== itemId);
  await saveState(true);
  eventBus.emit('categoriesChanged', state.categories);
}

export async function addCustomTip(catId, itemId, question) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;

  if (!item.customQuestions) item.customQuestions = [];
  item.customQuestions.push(question);
  await saveState(true);
  eventBus.emit('customTipChanged', { catId, itemId });
}

export async function saveAnswer(catId, itemId, tipId, answerText) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;

  if (!item.answers) item.answers = {};
  item.answers[tipId] = answerText;
  await saveState(true);
  eventBus.emit('customTipChanged', { catId, itemId });
}

export function deleteTip(catId, itemId, indexStr) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;
  
  if (item && item.customQuestions && item.answers) {
     const index = parseInt(indexStr, 10);
     const ansKey = indexStr;
     delete item.answers[ansKey];
     item.customQuestions.splice(index, 1);
     
     const newAnswers = {};
     for (const [k, v] of Object.entries(item.answers)) {
        if (!isNaN(k)) {
           const numK = parseInt(k, 10);
           if (numK > index) {
              newAnswers[String(numK - 1)] = v;
           } else {
              newAnswers[k] = v;
           }
        } else {
           newAnswers[k] = v;
        }
     }
     item.answers = newAnswers;
     saveState();
     eventBus.emit('customTipChanged', { catId, itemId });
  }
}
