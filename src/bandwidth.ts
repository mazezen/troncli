import { TronWeb } from "tronweb";
import chalk from "chalk";

const log = console.log;

// Query historical bandwidth unit price.
export async function getBandwidthPrices(tronWeb: TronWeb): Promise<string> {
  try {
    let price = tronWeb.trx.getBandwidthPrices();
    return price;
  } catch (error) {
    log(chalk.red(`查询历史带宽单价失败: `), error);
    return "";
  }
}
