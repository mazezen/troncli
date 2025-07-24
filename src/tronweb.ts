import { TronWeb } from "tronweb";

export function newTronWeb(): TronWeb {
  const tronweb = new TronWeb({
    fullHost: "https://api.shasta.trongrid.io",
    headers: { "TRON-PRO-API-KEY": "" },
    privateKey: "",
  });
  return tronweb;
}
