import axios from "axios";

export const runAnalyticsQuery = (payload) =>
  axios.post("http://localhost:5000/api/analytics/query", payload);
