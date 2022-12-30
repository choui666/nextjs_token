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
  }
}
