import { TronWeb } from "tronweb";
import chalk from "chalk";

const log = console.log;

/**
 * 查询历史带宽单价。
 *
 * @param tronWeb - TronWeb 实例。
 * @returns 成功时返回价格字符串，失败时返回空字符串。
 */
export async function getBandwidthPrices(tronWeb: TronWeb): Promise<string> {
  log(chalk.yellow("正在查询历史带宽单价..."));
  try {
    let price = await tronWeb.trx.getBandwidthPrices();
    log(chalk.green("✔ 查询成功!"));
    return price;
  } catch (error) {
    log(chalk.red("查询历史带宽单价失败:"), error);
    return "";
  }
}