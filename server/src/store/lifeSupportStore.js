const { randomUUID } = require('crypto');
const { isDatabaseConnected } = require('../db');
const MoodLog = require('../models/MoodLog');
const JournalEntry = require('../models/JournalEntry');
const SafetyPlan = require('../models/SafetyPlan');

const memory = {
  moods: [],
  journal: [],
  safetyPlans: new Map()
};

function toObject(doc) {
  if (!doc) return null;
  if (typeof doc.toObject === 'function') {
    const data = doc.toObject();
    data.id = String(data._id);
    return data;
  }
  return doc;
}

async function logMood(userId, mood, note = '') {
  if (isDatabaseConnected()) {
    return toObject(await MoodLog.create({ userId, mood, note }));
  }
  const record = { id: randomUUID(), userId, mood, note, date: new Date().toISOString(), createdAt: new Date().toISOString() };
  memory.moods.unshift(record);
  return record;
}

async function getMoodHistory(userId, limit = 30) {
  if (isDatabaseConnected()) {
    const logs = await MoodLog.find({ userId }).sort({ createdAt: -1 }).limit(limit);
    return logs.map(toObject);
  }
  return memory.moods.filter((m) => m.userId === userId).slice(0, limit);
}

async function createJournalEntry(userId, { prompt, promptVoice, text, mood }) {
  const reflection = buildReflection(text, promptVoice);
  if (isDatabaseConnected()) {
    return toObject(await JournalEntry.create({ userId, prompt, promptVoice, text, mood, aiReflection: reflection }));
  }
  const record = { id: randomUUID(), userId, prompt, promptVoice, text, mood, aiReflection: reflection, createdAt: new Date().toISOString() };
  memory.journal.unshift(record);
  return record;
}

async function getJournalEntries(userId, limit = 20) {
  if (isDatabaseConnected()) {
    const entries = await JournalEntry.find({ userId }).sort({ createdAt: -1 }).limit(limit);
    return entries.map(toObject);
  }
  return memory.journal.filter((e) => e.userId === userId).slice(0, limit);
}

async function getSafetyPlan(userId) {
  if (isDatabaseConnected()) {
    return toObject(await SafetyPlan.findOne({ userId }));
  }
  return memory.safetyPlans.get(userId) || null;
}

async function upsertSafetyPlan(userId, patch) {
  if (isDatabaseConnected()) {
    return toObject(
      await SafetyPlan.findOneAndUpdate(
        { userId },
        { $set: { ...patch, userId } },
        { new: true, upsert: true }
      )
    );
  }
  const existing = memory.safetyPlans.get(userId) || { id: randomUUID(), userId, trustedContacts: [], warningSigns: [], copingStrategies: [], reasons: [] };
  const next = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  memory.safetyPlans.set(userId, next);
  return next;
}

// Build a simple TJ/Arlane styled reflection without requiring OpenAI
function buildReflection(text, voice) {
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 5) return '';
  if (voice === 'Arlane') {
    return "Arlane says: What you wrote took courage, whether it felt like it or not. Keep going, one honest word at a time.";
  }
  return "TJ says: Writing it down means you're facing it. That's more than most folks do. Keep that up.";
}

module.exports = { logMood, getMoodHistory, createJournalEntry, getJournalEntries, getSafetyPlan, upsertSafetyPlan };
