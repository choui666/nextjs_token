import commonFilter from "../../lib/filter";
export default async function sendGift(req, resp) {
  await commonFilter(req, resp);
  let {
    app_id,
    server_secret,
    room_id,
    user_id,
    user_name,
    gift_type,
    gift_count,
    timestamp,
  } = req.query;
  if (!app_id) {
    return resp.status(500).json({ error: "app_id is required" });
  } else if (!server_secret) {
    return resp.status(500).json({ error: "server_secret is required" });
  } else if (!room_id) {
    return resp.status(500).json({ error: "room_id is required" });
  } else if (!user_id) {
    return resp.status(500).json({ error: "user_id is required" });
  } else if (!user_name) {
    return resp.status(500).json({ error: "user_name is required" });
  } else if (!gift_type) {
    return resp.status(500).json({ error: "gift_type is required" });
  } else if (!gift_count) {
    return resp.status(500).json({ error: "gift_count is required" });
  } else if (!timestamp) {
    return resp.status(500).json({ error: "timestamp is required" });
  }

  return resp.status(500).json({ error: 0 });
}
