import { TronWeb } from "tronweb";
import { Account, AccountResourceMessage } from "tronweb/lib/esm/types";
import { isAddress } from "./utils/address";

import chalk from "chalk";

const log = console.log;

interface CreateAccountInfo {
  privateKey: string;
  publicKey: string;
  address: {
    base58: string;
    hex: string;
  };
}

// Generate a random mnemonic (total number 12) and using TRON path "m/44'/195'" by default, return the 0th account address and private key.
export async function createrandom(tronWeb: TronWeb): Promise<any> {
  try {
    let account = await tronWeb.createRandom();
    return account;
  } catch (error) {
    log(chalk.red(`创建12位的助记词失败失败: `), error);
    return null;
  }
}

// Generate a new privatekey + address combination. This account is not activated on the network.
export async function createAccount(tronWeb: TronWeb): Promise<any> {
  try {
    let account = await tronWeb.createAccount();
    return account;
  } catch (error) {
    log(chalk.red(`创建地址账号失败: `), error);
    return null;
  }
}

// Get account information.
export async function getAccount(
  tronWeb: TronWeb,
  address: string
): Promise<Account | null> {
  if (!isAddress(tronWeb, address)) {
    log(
      chalk.red("错误: 请提供一个地址。用法: getaccount <address: b58 | hex>")
    );
    return null;
  }

  try {
    const account = await tronWeb.trx.getAccount(address);
    return account;
  } catch (error) {
    log(chalk.red(`获取地址 ${address} 的账户信息失败:`), error);
    return null;
  }
}

// Get the account's bandwidth and energy resources.
export async function getAccountResources(
  tronWeb: TronWeb,
  address: string
): Promise<AccountResourceMessage | null> {
  if (!isAddress(tronWeb, address)) {
    log(
      chalk.red(
        "错误: 请提供一个地址。用法: getaccountresources <address: b58 | hex>"
      )
    );
    return null;
  }

  try {
    const resouce = await tronWeb.trx.getAccountResources(address);
    return resouce;
  } catch (error) {
    log(chalk.red(`获取地址 ${address} 账号能量和带宽信息失败: `), error);
    return null;
  }
}
