import { STORAGE_KEY } from '../constants/config.js';
import * as api from '../services/api.js';
import { eventBus } from '../events/eventBus.js';
import { DEFAULT_DATA } from '../data/defaultData.js';
import { uid } from '../utils/helpers.js';

let state = {
  categories: [],
  activeCatId: null,
};

export const getState = () => state;
export const getCategories = () => state.categories;
export const getActiveCatId = () => state.activeCatId;

export async function loadState() {
  let loadedData = null;
  let loadedQuestions = null;
  try {
    const data = await api.fetchData();
    if (Array.isArray(data) && data.length > 0) loadedData = data;
    loadedQuestions = await api.fetchQuestions();
  } catch (err) {
    console.warn('Python server not found, falling back to localStorage');
  }

  if (!loadedData) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { loadedData = JSON.parse(raw); } catch (_) {}
    }
  }

  if (!loadedData) {
    // deep copy
    loadedData = JSON.parse(JSON.stringify(DEFAULT_DATA));
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
  if (!state.activeCatId && state.categories.length > 0) {
    state.activeCatId = state.categories[0].id;
  }
  
  eventBus.emit('stateLoaded', state);
  saveState();
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.categories));
  
  api.saveData(state.categories).catch(err => console.error('Python Server is not running'));

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

  api.saveQuestions(questionsData).catch(err => console.error('Error saving questions'));
}

export function setActiveCatId(catId) {
  state.activeCatId = catId;
  eventBus.emit('categoryActivated', catId);
}

export function toggleItem(catId, itemId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;
  item.done = !item.done;
  saveState();
  eventBus.emit('itemToggled', { catId, itemId, done: item.done });
}

export function saveItem(catId, itemId, payload) {
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
  saveState();
  eventBus.emit('categoriesChanged', state.categories);
}

export function saveCategory(catId, payload) {
  if (catId) {
    const cat = state.categories.find(c => c.id === catId);
    if (cat) {
      cat.name = payload.name;
      cat.icon = payload.icon;
    }
  } else {
    state.categories.push({ id: uid(), name: payload.name, icon: payload.icon, items: [] });
  }
  saveState();
  eventBus.emit('categoriesChanged', state.categories);
}

export function deleteCategory(catId) {
  state.categories = state.categories.filter(c => c.id !== catId);
  if (state.activeCatId === catId) state.activeCatId = null;
  saveState();
  eventBus.emit('categoriesChanged', state.categories);
  if (!state.activeCatId) eventBus.emit('categoryActivated', null);
}

export function deleteItem(catId, itemId) {
  const cat = state.categories.find(c => c.id === catId);
  if (cat) cat.items = cat.items.filter(i => i.id !== itemId);
  saveState();
  eventBus.emit('categoriesChanged', state.categories);
}

export function addCustomTip(catId, itemId, question) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;

  if (!item.customQuestions) item.customQuestions = [];
  item.customQuestions.push(question);
  saveState();
  eventBus.emit('customTipChanged', { catId, itemId });
}

export function saveAnswer(catId, itemId, tipId, answerText) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;

  if (!item.answers) item.answers = {};
  item.answers[tipId] = answerText;
  saveState();
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
