const crypto = require("crypto");

//Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
export default  function GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp) {
  const hash = crypto.createHash("md5"); //规定使用哈希算法中的MD5算法
  var str = appId + signatureNonce + serverSecret + timeStamp;
  hash.update(str);
  //hash.digest('hex')表示输出的格式为16进制
  return hash.digest("hex");
}

export default function getSignature(appId,) {
  const signatureNonce = crypto.randomBytes(8).toString("hex");
  //使用你的appId和serverSecret
  var appId = 12345;
  var serverSecret = "9193cc662a4c0ec135ec71fb57194b38";
  var timeStamp = Math.round(Date.now() / 1000);
  console.log(
    GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp)
  );
}
