import { BigNumber, TronWeb } from "tronweb";
import chalk from "chalk";
import { IBigNumber } from "tronweb/lib/esm/types";
import { validValue, parseFloatByString } from "./base";

const log = console.log;

// Helper function that will check if a given address is valid.
export async function isAddress(
  tronWeb: TronWeb,
  address: string
): Promise<boolean> {
  return tronWeb.isAddress(address);
}
