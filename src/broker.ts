import { TronWeb } from "tronweb";
import chalk from "chalk";
import { isAddress } from "./utils/address";

const log = console.log;

/**
 * 获取超级代表（SR）的经纪佣金比例。
 *
 * @param tronWeb - TronWeb 实例。
 * @param address - 超级代表的地址。
 * @returns 成功时返回佣金比例 (0-100)，失败时返回 0。
 */
export async function getBrokerage(
  tronWeb: TronWeb,
  address: string
): Promise<number> {
  if (!address || !(await isAddress(tronWeb, address))) {
    log(chalk.red(`错误: 无效的地址 ${address}。`));
    return 0;
  }

  log(chalk.yellow(`正在获取地址 ${address} 的 SR 经纪佣金比例...`));
  try {
    const brokerage = await tronWeb.trx.getBrokerage(address);
    log(chalk.green(`✔ 查询成功!`));
    return brokerage;
  } catch (error) {
    log(chalk.red(`获取 SR ${address} 经纪佣金比例失败: `), error);
    return 0;
  }
}