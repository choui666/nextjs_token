import commonFilter from "../../lib/filter";
const request = require("request");

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

  request.post("https://zim-api.zego.im/?Action=SendRoomMessage", {
    formData: {
      FromUserId: "u1",
      RoomId: "r1",
      MessageType: 1,
      Priority: 1,
      MessageBody: {
        Message: {
          room_id: "room888", // Live Room ID
          user_id: "user987", // The user ID of the sender
          user_name: "James", // The user name of the sender
          gift_type: 1001, // Gift type
          gift_cout: 2, // Number of gifts
          timestamp: 1670814533,
        },
      },
    },
  });
  return resp.status(500).json({ error: 0 });
}
