import { BigNumber, TronWeb } from "tronweb";
import chalk from "chalk";
import { IBigNumber } from "tronweb/lib/esm/types";
import { validValue, parseFloatByString } from "./base";

const log = console.log;

/**
 * 检查给定地址是否为有效地址。
 *
 * @param tronWeb - TronWeb 实例。
 * @param address - 要验证的地址字符串。
 * @returns 如果地址有效则返回 true，否则返回 false。
 */
export async function isAddress(
  tronWeb: TronWeb,
  address: string
): Promise<boolean> {
  return tronWeb.isAddress(address);
}