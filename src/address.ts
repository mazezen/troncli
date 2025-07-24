import { TronWeb } from "tronweb";
import chalk from "chalk";
import { isAddress } from "./utils/address";
import { error } from "console";
import { sunToTrx } from "./utils/number";

const log = console.log;

// Get tha account's balance of TRX, and display the TRX balance in TRX
export async function getBalance(
  tronWeb: TronWeb,
  address: string
): Promise<string> {
  if (!isAddress(tronWeb, address)) {
    log(chalk.red(`获取账户 ${address} TRX余额,无效账户: `), error);
    return "0";
  }

  try {
    let balance = tronWeb.trx.getBalance(address);
    let balnceStr = (await balance).toString();
    const balanceAt = sunToTrx(tronWeb, balnceStr);
    let b: string;
    if (typeof balanceAt !== "string") {
      b = (await balanceAt).toString();
    } else {
      b = balanceAt;
    }
    return b;
  } catch (error) {
    log(chalk.red(`获取账户 ${address} TRX余额失败: `), error);
    return "0";
  }
}

// Query the BandWidth information for the account.
export async function getBandwidth(
  tronWeb: TronWeb,
  address: string
): Promise<number> {
  if (!isAddress(tronWeb, address)) {
    log(chalk.red(`获取账户 ${address} 剩余可用带宽,无效账户: `), error);
    return 0;
  }

  try {
    const bandwidth = await tronWeb.trx.getBandwidth(address);
    return bandwidth;
  } catch (error) {
    log(chalk.red(`获取账户 ${address} 剩余可用带宽: `), error);
    return 0;
  }
}
