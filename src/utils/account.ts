import { TronWeb } from "tronweb";
import chalk from "chalk";

const log = console.log;

// Obtain the address and private key according to the provided mnemonic.
export async function fromMnemonic(
  tronWeb: TronWeb,
  ...args: string[]
): Promise<any> {
  if (args.length < 12) {
    log(chalk.red(`Invalid input mnemonicalue: ${args}`));
    return;
  }

  let mmnemonic: string = "";
  for (let i = 0; i < 12; i++) {
    mmnemonic = mmnemonic + " " + args[i];
  }
  let path = args[12];

  try {
    const account = tronWeb.fromMnemonic(mmnemonic.trim(), path);
    return account;
  } catch (error) {
    log(chalk.red(`通过助记词恢复地址和私钥失败: `), error);
    return;
  }
}
