const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* ─── Helper: find-or-create user by clerkId ─────────────────────────── */
async function getOrCreate(clerkId) {
  let user = await User.findOne({ clerkId });
  if (!user) {
    user = await User.create({ clerkId });
  }
  return user;
}

/* ─── GET /api/users/:clerkId ─────────── get full profile ──────────── */
router.get('/:clerkId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─── PATCH /api/users/:clerkId ────────── update top-level fields ───── */
router.patch('/:clerkId', async (req, res) => {
  try {
    const allowed = ['name', 'email', 'bio', 'skills', 'profilePhoto', 'socialLinks', 'phone', 'location'];
    const update = {};
    allowed.forEach((k) => { if (req.body[k] !== undefined) update[k] = req.body[k]; });
    const user = await User.findOneAndUpdate(
      { clerkId: req.params.clerkId },
      { $set: update },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════ EDUCATION ═══════════════════════════════════ */

router.get('/:clerkId/education', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    res.json(user.education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:clerkId/education', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.education.push(req.body);
    await user.save();
    res.status(201).json(user.education[user.education.length - 1]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:clerkId/education/:eduId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.education = user.education.filter((e) => e._id.toString() !== req.params.eduId);
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════ CERTIFICATIONS ══════════════════════════════ */

router.get('/:clerkId/certifications', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    res.json(user.certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:clerkId/certifications', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.certifications.push(req.body);
    await user.save();
    res.status(201).json(user.certifications[user.certifications.length - 1]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:clerkId/certifications/:certId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.certifications = user.certifications.filter((c) => c._id.toString() !== req.params.certId);
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════ PROJECTS ═══════════════════════════════════ */

// GET all projects
router.get('/:clerkId/projects', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    res.json(user.projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST – add project
router.post('/:clerkId/projects', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.projects.unshift(req.body);
    await user.save();
    res.status(201).json(user.projects[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE – remove project by _id
router.delete('/:clerkId/projects/:projectId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.projects = user.projects.filter(
      (p) => p._id.toString() !== req.params.projectId
    );
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH – edit project
router.patch('/:clerkId/projects/:projectId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    const proj = user.projects.id(req.params.projectId);
    if (!proj) return res.status(404).json({ error: 'Project not found' });
    Object.assign(proj, req.body);
    await user.save();
    res.json(proj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════ ACHIEVEMENTS ══════════════════════════════ */

router.get('/:clerkId/achievements', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    res.json(user.achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:clerkId/achievements', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.achievements.unshift(req.body);
    await user.save();
    res.status(201).json(user.achievements[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:clerkId/achievements/:achId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.achievements = user.achievements.filter(
      (a) => a._id.toString() !== req.params.achId
    );
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:clerkId/achievements/:achId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    const ach = user.achievements.id(req.params.achId);
    if (!ach) return res.status(404).json({ error: 'Achievement not found' });
    Object.assign(ach, req.body);
    await user.save();
    res.json(ach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════ TODOS ═════════════════════════════════════ */

router.get('/:clerkId/todos', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    res.json(user.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:clerkId/todos', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.todos.unshift(req.body);
    await user.save();
    res.status(201).json(user.todos[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:clerkId/todos/:todoId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    const todo = user.todos.id(req.params.todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    Object.assign(todo, req.body);
    await user.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:clerkId/todos/:todoId', async (req, res) => {
  try {
    const user = await getOrCreate(req.params.clerkId);
    user.todos = user.todos.filter(
      (t) => t._id.toString() !== req.params.todoId
    );
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
