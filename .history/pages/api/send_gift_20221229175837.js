import commonFilter from "../../lib/filter";
export default async function sendGift(req, resp) {
  await commonFilter(req, resp);
}
