import { getHash } from "../../../shared/utils/crypt/countHashIndex";

export default async function validHash(msg: string) {
  const parsedData = JSON.parse(msg);

  const token = parsedData.hasOwnProperty("token") ? parsedData.token
    : "";
  if (token) {
    const serverToken = await getHash("validHash");
    if (serverToken) {
      if (token === serverToken) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
