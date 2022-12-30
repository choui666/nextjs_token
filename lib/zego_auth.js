const crypto = require("crypto");

//Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
export default function GenerateUASignature(
  appId,
  signatureNonce,
  serverSecret,
  timeStamp
) {
  const hash = crypto.createHash("md5"); //规定使用哈希算法中的MD5算法
  var str = appId + signatureNonce + serverSecret + timeStamp;
  hash.update(str);
  //hash.digest('hex')表示输出的格式为16进制
  return hash.digest("hex");
}
