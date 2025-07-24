import { TronWeb } from "tronweb";

export function newTronWeb(): TronWeb {
  const tronweb = new TronWeb({
    // fullHost: process.env.TRON_FULL_HOST || "https://api.trongrid.io",
    // headers: { "TRON-PRO-API-KEY": process.env.TRON_PRO_API_KEY || "" },
    fullHost: "https://api.trongrid.io",
    headers: { "TRON-PRO-API-KEY": "079f4686-eb4c-4bd0-93d3-51caf9c45fc6" },
    privateKey: process.env.PRIVATE_KEY || "",
  });

  tronweb.defaultAddress.base58 = process.env.TRON_DEFAULT_ADDRESS_BASE58 || "";
  tronweb.defaultAddress.hex = process.env.TRON_DEFAULT_ADDRESS_HEX || "";
  return tronweb;
}
