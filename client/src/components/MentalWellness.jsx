import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, BookOpen, ChevronDown, ChevronUp, Heart, Phone, Shield, Smile } from 'lucide-react';
import '../styles/mental-wellness.css';

const API = '/api/life-support';
const USER_ID = 'demo-user';
const headers = { 'Content-Type': 'application/json', 'x-user-id': USER_ID };

function ResourceActions({ r }) {
  return (
    <div className="mw-resource-actions">
      {r.dialable && (
        <a href={`tel:${r.dialable}`} className="mw-call-btn">📞 {r.contact}</a>
      )}
      {r.smsNumber && (
        <a
          href={`sms:${r.smsNumber}${r.smsPrefill ? `?body=${encodeURIComponent(r.smsPrefill)}` : ''}`}
          className="mw-call-btn sms"
        >
          💬 Text {r.smsNumber}
        </a>
      )}
      {r.url && (
        <a href={r.url} target="_blank" rel="noopener noreferrer" className="mw-call-btn web">
          🌐 Visit site
        </a>
      )}
    </div>
  );
}

const MOOD_OPTIONS = [
  { value: 1, emoji: '😔', label: 'Real rough' },
  { value: 2, emoji: '😟', label: 'Struggling' },
  { value: 3, emoji: '😐', label: 'Hanging in' },
  { value: 4, emoji: '🙂', label: 'Doing alright' },
  { value: 5, emoji: '😊', label: 'Feeling good' }
];

function Section({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mw-section">
      <button className="mw-section-header" onClick={() => setOpen((o) => !o)}>
        <span className="mw-section-title"><Icon size={16} /> {title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mw-section-body"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TJSaysBanner() {
  const [quote, setQuote] = useState('');
  const [voice, setVoice] = useState('TJ');

  const fetchQuote = useCallback(async () => {
    const endpoint = voice === 'TJ' ? `${API}/tj-says` : `${API}/arlane-says`;
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setQuote(data.quote);
    } catch {
      setQuote("Steady ain't fancy. Steady is what keeps you moving.");
    }
  }, [voice]);

  useEffect(() => { fetchQuote(); }, [fetchQuote]);

  return (
    <div className="mw-banner">
      <div className="mw-banner-tabs">
        <button className={voice === 'TJ' ? 'active' : ''} onClick={() => setVoice('TJ')}>TJ Says</button>
        <button className={voice === 'Arlane' ? 'active' : ''} onClick={() => setVoice('Arlane')}>Arlane Says</button>
      </div>
      <motion.p key={quote} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mw-banner-quote">
        "{quote}"
      </motion.p>
      <button className="mw-refresh" onClick={fetchQuote}>↻ New quote</button>
    </div>
  );
}

function MoodCheckin() {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const [pattern, setPattern] = useState(null);

  useEffect(() => {
    fetch(`${API}/checkin/history`, { headers })
      .then((r) => r.json())
      .then((d) => { setHistory(d.logs || []); setPattern(d.pattern); })
      .catch(() => {});
  }, [submitted]);

  const submit = async () => {
    if (!selected) return;
    try {
      const res = await fetch(`${API}/checkin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ mood: selected, note })
      });
      const data = await res.json();
      setResponse(data.response);
      setSubmitted(true);
      setNote('');
    } catch {
      setResponse({ tj: "TJ says: Couldn't save that — try again in a minute.", arlane: '' });
    }
  };

  const reset = () => { setSelected(null); setSubmitted(false); setResponse(null); };

  return (
    <div className="mw-checkin">
      {!submitted ? (
        <>
          <p className="mw-label">How are you feeling right now?</p>
          <div className="mw-mood-row">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m.value}
                className={`mw-mood-btn${selected === m.value ? ' selected' : ''}`}
                onClick={() => setSelected(m.value)}
                title={m.label}
              >
                <span className="mw-emoji">{m.emoji}</span>
                <span className="mw-mood-label">{m.label}</span>
              </button>
            ))}
          </div>
          <textarea
            className="mw-textarea"
            placeholder="Anything else on your mind? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          />
          <button className="mw-btn-primary" onClick={submit} disabled={!selected}>
            Check In
          </button>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mw-response">
          {response && (
            <>
              <p className="mw-voice tj">{response.tj}</p>
              {response.arlane && <p className="mw-voice arlane">{response.arlane}</p>}
            </>
          )}
          <button className="mw-btn-ghost" onClick={reset}>Check in again</button>
        </motion.div>
      )}

      {history.length > 0 && (
        <div className="mw-history">
          <p className="mw-label">Recent mood</p>
          <div className="mw-mood-dots">
            {history.slice(0, 14).reverse().map((log, i) => (
              <span
                key={i}
                className="mw-dot"
                style={{ '--mood': log.mood }}
                title={`${MOOD_OPTIONS[log.mood - 1]?.label} — ${new Date(log.createdAt).toLocaleDateString()}`}
              />
            ))}
          </div>
          {pattern && <p className="mw-pattern-comment">{pattern.tjComment}</p>}
        </div>
      )}
    </div>
  );
}

function Journal() {
  const [prompt, setPrompt] = useState(null);
  const [voice, setVoice] = useState('TJ');
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [reflection, setReflection] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchPrompt = useCallback(async (v) => {
    setPrompt(null);
    try {
      const res = await fetch(`${API}/prompts?voice=${v}`, { headers });
      const data = await res.json();
      setPrompt(data);
    } catch {
      setPrompt({ text: "What's on your mind today?", voice: v });
    }
  }, []);

  useEffect(() => { fetchPrompt(voice); }, [voice, fetchPrompt]);

  useEffect(() => {
    fetch(`${API}/journal`, { headers })
      .then((r) => r.json())
      .then(setEntries)
      .catch(() => {});
  }, [saved]);

  const submit = async () => {
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API}/journal`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ prompt: prompt?.text, promptVoice: voice, text })
      });
      const data = await res.json();
      setReflection(data.aiReflection || '');
      setSaved(true);
      setText('');
    } catch {
      setReflection("Couldn't save — try again.");
      setSaved(true);
    }
  };

  const reset = () => { setSaved(false); setReflection(''); fetchPrompt(voice); };

  return (
    <div className="mw-journal">
      <div className="mw-voice-toggle">
        <button className={voice === 'TJ' ? 'active' : ''} onClick={() => setVoice('TJ')}>TJ's prompt</button>
        <button className={voice === 'Arlane' ? 'active' : ''} onClick={() => setVoice('Arlane')}>Arlane's prompt</button>
      </div>

      {!saved ? (
        <>
          {prompt && (
            <motion.div key={prompt.text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mw-prompt mw-prompt-${prompt.voice.toLowerCase()}`}>
              <span className="mw-prompt-voice">{prompt.voice}:</span> {prompt.text}
            </motion.div>
          )}
          <button className="mw-btn-ghost small" onClick={() => fetchPrompt(voice)}>↻ Different prompt</button>
          <textarea
            className="mw-textarea"
            placeholder="Write whatever comes to mind. Nobody's grading this."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
          <button className="mw-btn-primary" onClick={submit} disabled={!text.trim()}>Save Entry</button>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mw-response">
          {reflection && <p className="mw-voice tj">{reflection}</p>}
          <button className="mw-btn-ghost" onClick={reset}>Write another</button>
        </motion.div>
      )}

      {entries.length > 0 && (
        <div className="mw-past-entries">
          <p className="mw-label">Past entries ({entries.length})</p>
          {entries.slice(0, 3).map((e, i) => (
            <div key={i} className="mw-entry-preview">
              <span className="mw-entry-date">{new Date(e.createdAt).toLocaleDateString()}</span>
              <p>{e.text.slice(0, 120)}{e.text.length > 120 ? '…' : ''}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HelpNow() {
  const [mode, setMode] = useState(null); // null | 'calm' | 'contact' | 'crisis'
  const [groundingIdx, setGroundingIdx] = useState(0);
  const [techniques, setTechniques] = useState([]);
  const [resources, setResources] = useState([]);
  const [safetyPlan, setSafetyPlan] = useState(null);

  useEffect(() => {
    fetch(`${API}/grounding`, { headers }).then((r) => r.json()).then(setTechniques).catch(() => {});
    fetch(`${API}/crisis-resources`, { headers }).then((r) => r.json()).then(setResources).catch(() => {});
    fetch(`${API}/safety-plan`, { headers }).then((r) => r.json()).then(setSafetyPlan).catch(() => {});
  }, []);

  const current = techniques[groundingIdx];

  return (
    <div className="mw-help-now">
      {!mode && (
        <div className="mw-help-options">
          <p className="mw-help-intro">TJ says: "Don't try to figure it all out at once. Just pick one."</p>
          <button className="mw-help-btn calm" onClick={() => setMode('calm')}>
            <span>🌬️</span> Calm Me Now
            <small>Quick grounding techniques from TJ and Arlane</small>
          </button>
          <button className="mw-help-btn contact" onClick={() => setMode('contact')}>
            <span>🤝</span> Contact Someone I Trust
            <small>Reach out to someone in your safety plan</small>
          </button>
          <button className="mw-help-btn crisis" onClick={() => setMode('crisis')}>
            <span>📞</span> Crisis Support Now
            <small>Free, confidential help available right now</small>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {mode === 'calm' && current && (
          <motion.div key="calm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mw-grounding">
            <button className="mw-back" onClick={() => setMode(null)}>← Back</button>
            <h4 className={`mw-grounding-title ${current.voice.toLowerCase()}`}>{current.name}</h4>
            <p className="mw-duration">About {current.duration}</p>
            <ol className="mw-steps">
              {current.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
            <p className="mw-grounding-quote">{current.quote}</p>
            <div className="mw-grounding-nav">
              <button className="mw-btn-ghost small" onClick={() => setGroundingIdx((i) => (i - 1 + techniques.length) % techniques.length)}>← Prev</button>
              <span>{groundingIdx + 1} / {techniques.length}</span>
              <button className="mw-btn-ghost small" onClick={() => setGroundingIdx((i) => (i + 1) % techniques.length)}>Next →</button>
            </div>
          </motion.div>
        )}

        {mode === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mw-contacts">
            <button className="mw-back" onClick={() => setMode(null)}>← Back</button>
            <p className="mw-voice arlane">Arlane says: "Reaching out is not a burden to them. It's a gift of trust."</p>
            {safetyPlan?.trustedContacts?.length > 0 ? (
              <div className="mw-contact-list">
                {safetyPlan.trustedContacts.map((c, i) => (
                  <div key={i} className="mw-contact-card">
                    <strong>{c.name}</strong>
                    <span className="mw-contact-rel">{c.relationship}</span>
                    {c.phone && <a href={`tel:${c.phone}`} className="mw-call-btn">📞 {c.phone}</a>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mw-empty-contacts">
                <p>No trusted contacts added yet. Set them up in your Safety Plan below.</p>
              </div>
            )}
          </motion.div>
        )}

        {mode === 'crisis' && (
          <motion.div key="crisis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mw-crisis">
            <button className="mw-back" onClick={() => setMode(null)}>← Back</button>
            <div className="mw-crisis-top">
              <p className="mw-voice tj">TJ says: "These folks are trained for this. Calling them is the right call. Every time."</p>
            </div>
            <div className="mw-resource-list">
              {resources.map((r) => (
                <div key={r.id} className={`mw-resource mw-resource-${r.type}`}>
                  <div className="mw-resource-header">
                    <strong>{r.name}</strong>
                    <span className="mw-available">{r.available}</span>
                  </div>
                  <p className="mw-resource-desc">{r.description}</p>
                  <p className="mw-resource-how">{r.how}</p>
                  <ResourceActions r={r} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SafetyPlanEditor() {
  const [plan, setPlan] = useState({ trustedContacts: [], warningSigns: [], copingStrategies: [], reasons: [] });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/safety-plan`, { headers })
      .then((r) => r.json())
      .then((d) => { if (d) setPlan(d); })
      .catch(() => {});
  }, []);

  const save = async () => {
    try {
      await fetch(`${API}/safety-plan`, { method: 'PUT', headers, body: JSON.stringify(plan) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // fail silently
    }
  };

  const updateContact = (i, field, val) => {
    const contacts = [...plan.trustedContacts];
    contacts[i] = { ...contacts[i], [field]: val };
    setPlan((p) => ({ ...p, trustedContacts: contacts }));
  };

  const addContact = () => setPlan((p) => ({ ...p, trustedContacts: [...p.trustedContacts, { name: '', phone: '', relationship: '' }] }));
  const removeContact = (i) => setPlan((p) => ({ ...p, trustedContacts: p.trustedContacts.filter((_, idx) => idx !== i) }));

  const updateList = (field, i, val) => {
    const arr = [...plan[field]];
    arr[i] = val;
    setPlan((p) => ({ ...p, [field]: arr }));
  };
  const addItem = (field) => setPlan((p) => ({ ...p, [field]: [...p[field], ''] }));
  const removeItem = (field, i) => setPlan((p) => ({ ...p, [field]: p[field].filter((_, idx) => idx !== i) }));

  return (
    <div className="mw-safety-plan">
      <p className="mw-voice arlane">Arlane says: "A safety plan isn't admitting defeat. It's being smart enough to prepare."</p>

      <div className="mw-sp-section">
        <p className="mw-label">Trusted Contacts</p>
        {plan.trustedContacts.map((c, i) => (
          <div key={i} className="mw-contact-inputs">
            <input placeholder="Name" value={c.name} onChange={(e) => updateContact(i, 'name', e.target.value)} />
            <input placeholder="Phone" value={c.phone} onChange={(e) => updateContact(i, 'phone', e.target.value)} />
            <input placeholder="Relationship" value={c.relationship} onChange={(e) => updateContact(i, 'relationship', e.target.value)} />
            <button className="mw-remove" onClick={() => removeContact(i)}>✕</button>
          </div>
        ))}
        <button className="mw-btn-ghost small" onClick={addContact}>+ Add contact</button>
      </div>

      {[
        { field: 'warningSigns', label: 'Warning signs I notice in myself' },
        { field: 'copingStrategies', label: 'Things that help me cope' },
        { field: 'reasons', label: 'Reasons to keep going' }
      ].map(({ field, label }) => (
        <div key={field} className="mw-sp-section">
          <p className="mw-label">{label}</p>
          {plan[field].map((item, i) => (
            <div key={i} className="mw-sp-row">
              <input value={item} onChange={(e) => updateList(field, i, e.target.value)} placeholder="Add one…" />
              <button className="mw-remove" onClick={() => removeItem(field, i)}>✕</button>
            </div>
          ))}
          <button className="mw-btn-ghost small" onClick={() => addItem(field)}>+ Add</button>
        </div>
      ))}

      <button className="mw-btn-primary" onClick={save}>{saved ? '✓ Saved' : 'Save Safety Plan'}</button>
    </div>
  );
}

export default function MentalWellness() {
  return (
    <div className="mental-wellness">
      <TJSaysBanner />

      <div className="mw-help-now-wrap">
        <button
          className="mw-help-trigger"
          onClick={() => document.getElementById('help-now-section').scrollIntoView({ behavior: 'smooth' })}
        >
          <AlertTriangle size={16} /> Need help right now?
        </button>
      </div>

      <Section title="How are you feeling today?" icon={Smile} defaultOpen>
        <MoodCheckin />
      </Section>

      <Section title="Journal" icon={BookOpen}>
        <Journal />
      </Section>

      <div id="help-now-section">
        <Section title="Help Now" icon={Heart} defaultOpen>
          <HelpNow />
        </Section>
      </div>

      <Section title="Safety Plan" icon={Shield}>
        <SafetyPlanEditor />
      </Section>

      <Section title="Crisis Resources" icon={Phone}>
        <CrisisResourcesList />
      </Section>
    </div>
  );
}

function CrisisResourcesList() {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    fetch(`${API}/crisis-resources`, { headers }).then((r) => r.json()).then(setResources).catch(() => {});
  }, []);
  return (
    <div className="mw-resource-list standalone">
      <p className="mw-voice tj">TJ says: "Knowing where to go before you need it — that's called being prepared. That's smart."</p>
      {resources.map((r) => (
        <div key={r.id} className={`mw-resource mw-resource-${r.type}`}>
          <div className="mw-resource-header"><strong>{r.name}</strong><span className="mw-available">{r.available}</span></div>
          <p className="mw-resource-desc">{r.description}</p>
          <p className="mw-resource-how">{r.how}</p>
          <ResourceActions r={r} />
        </div>
      ))}
    </div>
  );
}
