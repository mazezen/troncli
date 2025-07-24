import { TronWeb } from "tronweb";
import chalk from "chalk";

const log = console.log;

/**
 * 获取连接节点的信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @returns 成功时返回节点信息对象，失败时返回 null。
 */
export async function getNodeInfo(tronWeb: TronWeb): Promise<any> {
  log(chalk.yellow("正在查询节点信息..."));
  try {
    const info = await tronWeb.trx.getNodeInfo();
    log(chalk.green("✔ 查询节点信息成功!"));
    return info;
  } catch (error) {
    log(chalk.red("查询节点信息失败:"), error);
    return null;
  }
}