import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../data/teams.json');

async function readAll() {
  const raw = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(raw);
}

async function writeAll(list) {
  await fs.writeFile(dataPath, JSON.stringify(list, null, 2));
}

export async function getAllTeams() {
  return await readAll();
}

export async function getTeamById(id) {
  const list = await readAll();
  return list.find(t => t.id === id) || null;
}

export async function addNewTeam(data) {
  const list = await readAll();
  const id = data.id || `team_${Date.now()}`;
  const toSave = { id, ...data };
  list.push(toSave);
  await writeAll(list);
  return toSave;
}

export async function updateExistingTeam(id, data) {
  const list = await readAll();
  const idx = list.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const updated = { ...list[idx], ...data, id };
  list[idx] = updated;
  await writeAll(list);
  return updated;
}

export async function deleteTeam(id) {
  const list = await readAll();
  const idx = list.findIndex(t => t.id === id);
  if (idx === -1) return false;
  list.splice(idx, 1);
  await writeAll(list);
  return true;
}
