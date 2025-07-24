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

/**
 * 生成一个随机的助记词（默认为12个单词），并使用默认的TRON路径 "m/44'/195'"，
 * 返回第0个账户的地址和私钥。
 *
 * @param tronWeb - TronWeb 实例。
 * @returns 成功时返回账户对象，失败时返回 null。
 */
export async function createrandom(tronWeb: TronWeb): Promise<any> {
  log(chalk.yellow("正在生成12位助记词..."));
  try {
    let account = await tronWeb.createRandom();
    log(chalk.green("✔ 助记词创建成功!"));
    return account;
  } catch (error) {
    log(chalk.red("创建12位的助记词失败:"), error);
    return null;
  }
}

/**
 * 生成一个新的私钥和地址组合。此账户在网络上未激活。
 *
 * @param tronWeb - TronWeb 实例。
 * @returns 成功时返回账户对象，失败时返回 null。
 */
export async function createAccount(tronWeb: TronWeb): Promise<any> {
  log(chalk.yellow("正在创建新账户..."));
  try {
    let account = await tronWeb.createAccount();
    log(chalk.green("✔ 新账户创建成功（未激活）!"));
    return account;
  } catch (error) {
    log(chalk.red("创建地址账号失败:"), error);
    return null;
  }
}

/**
 * 获取账户信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param address - 要查询的账户地址 (b58 或 hex 格式)。
 * @returns 成功时返回账户信息对象，失败时返回 null。
 */
export async function getAccount(
  tronWeb: TronWeb,
  address: string
): Promise<Account | null> {
  if (!address || !(await isAddress(tronWeb, address))) {
    log(
      chalk.red("错误: 请提供一个有效的地址。用法: getaccount <address: b58 | hex>")
    );
    return null;
  }

  log(chalk.yellow(`正在获取地址 ${address} 的账户信息...`));
  try {
    const account = await tronWeb.trx.getAccount(address);
    log(chalk.green(`✔ 成功获取账户信息!`));
    return account;
  } catch (error) {
    log(chalk.red(`获取地址 ${address} 的账户信息失败:`), error);
    return null;
  }
}

/**
 * 获取账户的带宽和能量资源。
 *
 * @param tronWeb - TronWeb 实例。
 * @param address - 要查询的账户地址 (b58 或 hex 格式)。
 * @returns 成功时返回账户资源信息对象，失败时返回 null。
 */
export async function getAccountResources(
  tronWeb: TronWeb,
  address: string
): Promise<AccountResourceMessage | null> {
  if (!address || !(await isAddress(tronWeb, address))) {
    log(
      chalk.red(
        "错误: 请提供一个有效的地址。用法: getaccountresources <address: b58 | hex>"
      )
    );
    return null;
  }

  log(chalk.yellow(`正在获取地址 ${address} 的资源信息...`));
  try {
    const resouce = await tronWeb.trx.getAccountResources(address);
    log(chalk.green(`✔ 成功获取账户资源信息!`));
    return resouce;
  } catch (error) {
    log(chalk.red(`获取地址 ${address} 账号能量和带宽信息失败:`), error);
    return null;
  }
}