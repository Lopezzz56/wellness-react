// controllers/sessionController.js
import Session from "../models/session.js";

// Public sessions
export const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user's sessions (draft + published)
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get one session by ID (user's own)
export const getMySessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.userId });
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Save or update a draft
export const saveDraft = async (req, res) => {
  const { id, title, description, tags, image_url, video_url, json_file_url } = req.body;

  try {
    let session;
    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.userId },
        { title, description, tags, image_url, video_url, json_file_url, status: 'draft' },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.userId,
        title,
        description,
        tags,
        image_url,
        video_url,
        json_file_url,
        status: 'draft',
      });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Publish a session
export const publishSession = async (req, res) => {
  const { id } = req.body;

  try {
    const session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.userId },
      { status: "published" },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Search sessions by title or tags
export const searchSessions = async (req, res) => {
  const { q } = req.query;
  try {
    const regex = new RegExp(q, 'i');
    const sessions = await Session.find({
      status: "published",
      $or: [{ title: regex }, { tags: regex }]
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
