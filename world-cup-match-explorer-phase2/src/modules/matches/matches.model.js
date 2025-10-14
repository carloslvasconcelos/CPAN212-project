import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../data/matches.json');

async function readAll() {
  const raw = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(raw);
}

async function writeAll(list) {
  await fs.writeFile(dataPath, JSON.stringify(list, null, 2));
}

export async function getAllMatches() {
  return await readAll();
}

export async function getMatchById(id) {
  const list = await readAll();
  return list.find(m => m.id === id) || null;
}

export async function addNewMatch(data) {
  const list = await readAll();
  const id = data.id || `match_${Date.now()}`;
  const toSave = { id, ...data };
  list.push(toSave);
  await writeAll(list);
  return toSave;
}

export async function updateExistingMatch(id, data) {
  const list = await readAll();
  const idx = list.findIndex(m => m.id === id);
  if (idx === -1) return null;
  const updated = { ...list[idx], ...data, id };
  list[idx] = updated;
  await writeAll(list);
  return updated;
}

export async function deleteMatch(id) {
  const list = await readAll();
  const idx = list.findIndex(m => m.id === id);
  if (idx === -1) return false;
  list.splice(idx, 1);
  await writeAll(list);
  return true;
}
