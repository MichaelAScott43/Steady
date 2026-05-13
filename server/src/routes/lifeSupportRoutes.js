const express = require('express');
const router = express.Router();
const store = require('../store/lifeSupportStore');
const svc = require('../services/lifeSupportService');

function userId(req) {
  return req.headers['x-user-id'] || 'anonymous';
}

// GET /api/life-support/tj-says
router.get('/tj-says', (_req, res) => {
  res.json({ quote: svc.getTJSays(), voice: 'TJ' });
});

// GET /api/life-support/arlane-says
router.get('/arlane-says', (_req, res) => {
  res.json({ quote: svc.getArlaneSays(), voice: 'Arlane' });
});

// GET /api/life-support/prompts
router.get('/prompts', (req, res) => {
  const { voice } = req.query;
  const prompt = voice ? svc.getPromptByVoice(voice) : svc.getTodayPrompt();
  res.json(prompt);
});

// GET /api/life-support/grounding
router.get('/grounding', (_req, res) => {
  res.json(svc.GROUNDING_TECHNIQUES);
});

// GET /api/life-support/crisis-resources
router.get('/crisis-resources', (_req, res) => {
  res.json(svc.CRISIS_RESOURCES);
});

// POST /api/life-support/checkin
router.post('/checkin', async (req, res, next) => {
  try {
    const { mood, note } = req.body || {};
    if (typeof mood !== 'number' || mood < 1 || mood > 5) {
      return res.status(400).json({ error: 'mood must be a number 1–5' });
    }
    const log = await store.logMood(userId(req), mood, note || '');
    return res.status(201).json({
      ...log,
      label: svc.getMoodLabel(mood),
      response: mood <= 2
        ? { tj: "TJ says: Real talk — that's a hard number. You don't have to go through it alone.", arlane: "Arlane says: I see you. That takes courage to be honest about. Let's find some support together." }
        : mood === 3
          ? { tj: "TJ says: Hanging in there is underrated. You're still in the game.", arlane: "Arlane says: Middle ground is a real place. You're doing okay, and that's enough right now." }
          : { tj: "TJ says: That's what I like to hear. Keep that going.", arlane: "Arlane says: A good day is worth celebrating, even quietly. You earned it." }
    });
  } catch (err) {
    return next(err);
  }
});

// GET /api/life-support/checkin/history
router.get('/checkin/history', async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '30', 10), 90);
    const logs = await store.getMoodHistory(userId(req), limit);
    const pattern = svc.analyzeMoodPattern(logs);
    res.json({ logs, pattern });
  } catch (err) {
    next(err);
  }
});

// POST /api/life-support/journal
router.post('/journal', async (req, res, next) => {
  try {
    const { prompt, promptVoice, text, mood } = req.body || {};
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'text is required' });
    }
    const entry = await store.createJournalEntry(userId(req), {
      prompt: prompt || '',
      promptVoice: promptVoice || 'TJ',
      text: text.trim(),
      mood: mood || null
    });
    return res.status(201).json(entry);
  } catch (err) {
    return next(err);
  }
});

// GET /api/life-support/journal
router.get('/journal', async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 50);
    const entries = await store.getJournalEntries(userId(req), limit);
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

// GET /api/life-support/safety-plan
router.get('/safety-plan', async (req, res, next) => {
  try {
    const plan = await store.getSafetyPlan(userId(req));
    res.json(plan || { trustedContacts: [], warningSigns: [], copingStrategies: [], reasons: [] });
  } catch (err) {
    next(err);
  }
});

// PUT /api/life-support/safety-plan
router.put('/safety-plan', async (req, res, next) => {
  try {
    const { trustedContacts, warningSigns, copingStrategies, reasons } = req.body || {};
    const plan = await store.upsertSafetyPlan(userId(req), {
      trustedContacts: trustedContacts || [],
      warningSigns: warningSigns || [],
      copingStrategies: copingStrategies || [],
      reasons: reasons || []
    });
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
