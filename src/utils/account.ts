import { TronWeb } from "tronweb";
import chalk from "chalk";

const log = console.log;

/**
 * 根据提供的助记词获取地址和私钥。
 *
 * @param tronWeb - TronWeb 实例。
 * @param args - 包含12个助记词和可选路径的数组。
 * @returns 成功时返回账户信息，失败时返回 null。
 */
export async function fromMnemonic(
  tronWeb: TronWeb,
  ...args: string[]
): Promise<any> {
  if (args.length < 12) {
    log(
      chalk.red(`错误: 无效的助记词,需要12个单词。收到了 ${args.length} 个。`)
    );
    return null;
  }

  const mnemonic = args.slice(0, 12).join(" ");
  const path = args[12]; // path can be undefined, which is fine for fromMnemonic

  log(chalk.yellow("正在通过助记词恢复账户..."));
  try {
    const account = tronWeb.fromMnemonic(mnemonic, path);
    log(chalk.green("✔ 账户恢复成功!"));
    return account;
  } catch (error) {
    log(chalk.red("通过助记词恢复地址和私钥失败:"), error);
    return null;
  }
}
