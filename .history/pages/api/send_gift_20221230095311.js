import commonFilter from "../../lib/filter";
import GenerateUASignature from "../../lib/zego_auth";
const request = require("request");
const crypto = require("crypto");

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
  } = req.body;

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

  const signatureNonce = crypto.randomBytes(8).toString("hex");
  //使用你的appId和serverSecret

  const serverTimeStamp = Math.round(Date.now() / 1000);

  const signature = GenerateUASignature(
    app_id,
    signatureNonce,
    server_secret,
    serverTimeStamp
  );
  console.log("signature", signature);
  const SendRoomMessage = () =>
    new Promise((res, rej) => {
      request.post(
        `https://zim-api.zego.im/?Action=SendRoomMessage&AppId=${app_id}
                      &Timestamp=${serverTimeStamp}
                      &Signature=${signature}
                      &SignatureVersion=2.0
                      &SignatureNonce=${signatureNonce}
                      `,
        {
          formData: {
            FromUserId: user_id,
            RoomId: room_id,
            MessageType: 1,
            Priority: 3,
            MessageBody: JSON.stringify({
              Message: JSON.stringify({
                room_id, // Live Room ID
                user_id, // The user ID of the sender
                user_name, // The user name of the sender
                gift_type, // Gift type
                gift_type, // Number of gifts
                timestamp,
              }),
            }),
          },
        },
        (error, response, body) => {
          console.log("statusCode:", response && response.statusCode);
          if (error) {
            rej(error);
          } else {
            res(response);
          }
        }
      );
    });

  const result = await SendRoomMessage();
  // console.log("result", result);
  return resp.status(500).json({ error: 0 });
}
