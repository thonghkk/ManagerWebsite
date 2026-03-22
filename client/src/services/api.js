import { API_BASE_URL } from '../constants/config.js';
import { getActiveHubId } from '../data/hubs.js';

export async function fetchData() {
  const hub = getActiveHubId() || 'android';
  const res = await fetch(`${API_BASE_URL}/api/data?hub=${hub}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function saveData(categories) {
  const hub = getActiveHubId() || 'android';
  return fetch(`${API_BASE_URL}/api/data?hub=${hub}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categories),
  });
}

export async function fetchQuestions() {
  const hub = getActiveHubId() || 'android';
  const res = await fetch(`${API_BASE_URL}/api/questions?hub=${hub}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function saveQuestions(questionsData) {
  const hub = getActiveHubId() || 'android';
  return fetch(`${API_BASE_URL}/api/questions?hub=${hub}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionsData),
  });
}

export async function fetchHubs() {
  const res = await fetch(`${API_BASE_URL}/api/hubs`);
  if (!res.ok) throw new Error('Failed to fetch hubs');
  return res.json();
}

export async function saveHub(hubConfig) {
  return fetch(`${API_BASE_URL}/api/hubs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hubConfig),
  });
}
