import { buildAnalytics } from "../services/analytics.service.js";

export const runAnalyticsQuery = async (req, res) => {
  try {
    const result = await buildAnalytics(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
