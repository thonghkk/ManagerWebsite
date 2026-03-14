import { API_BASE_URL } from '../constants/config.js';

export async function fetchData() {
  const res = await fetch(`${API_BASE_URL}/api/data`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function saveData(categories) {
  return fetch(`${API_BASE_URL}/api/data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categories),
  });
}

export async function fetchQuestions() {
  const res = await fetch(`${API_BASE_URL}/api/questions`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function saveQuestions(questionsData) {
  return fetch(`${API_BASE_URL}/api/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionsData),
  });
}
