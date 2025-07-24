import { TronWeb } from "tronweb";
import chalk from "chalk";
import { isAddress } from "./utils/address";
import { error } from "console";
import { sunToTrx } from "./utils/number";

const log = console.log;

/**
 * 获取账户的TRX余额。
 *
 * @param tronWeb - TronWeb 实例。
 * @param address - 要查询的账户地址 (b58 或 hex 格式)。
 * @returns 成功时返回TRX余额 (字符串)，失败时返回 "0"。
 */
export async function getBalance(
  tronWeb: TronWeb,
  address: string
): Promise<string> {
  if (!address || !(await isAddress(tronWeb, address))) {
    log(chalk.red(`错误: 无效的地址 ${address}。`));
    return "0";
  }

  log(chalk.yellow(`正在获取账户 ${address} 的TRX余额...`));
  try {
    let balance = await tronWeb.trx.getBalance(address);
    let balnceStr = balance.toString();
    const balanceAt = await sunToTrx(tronWeb, balnceStr);
    let b: string;
    if (typeof balanceAt !== "string") {
      b = balanceAt.toString();
    } else {
      b = balanceAt;
    }
    log(chalk.green(`✔ 成功获取账户余额!`));
    return b;
  } catch (error) {
    log(chalk.red(`��取账户 ${address} TRX余额失败: `), error);
    return "0";
  }
}

/**
 * 查询账户的可用带宽信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param address - 要查询的账户地址 (b58 或 hex 格式)。
 * @returns 成功时返回可用带宽数量，失败时返回 0。
 */
export async function getBandwidth(
  tronWeb: TronWeb,
  address: string
): Promise<number> {
  if (!address || !(await isAddress(tronWeb, address))) {
    log(chalk.red(`错误: 无效的地址 ${address}。`));
    return 0;
  }

  log(chalk.yellow(`正在获取账户 ${address} 的剩余可用带宽...`));
  try {
    const bandwidth = await tronWeb.trx.getBandwidth(address);
    log(chalk.green(`✔ 成功获取账户带宽!`));
    return bandwidth;
  } catch (error) {
    log(chalk.red(`获取账户 ${address} 剩余可用带宽失败: `), error);
    return 0;
  }
}
