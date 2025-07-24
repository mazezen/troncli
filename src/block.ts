import { TronWeb } from "tronweb";
import { Block } from "tronweb/lib/esm/types";
import chalk from "chalk";

const log = console.log;

// 获取最新的区块信息
export async function getblocknumber(tronWeb: TronWeb): Promise<Block | null> {
  try {
    const block = await tronWeb.trx.getBlock("latest");
    return block;
  } catch (error) {
    log(chalk.red("获取最新区块失败:"), error);
    return null;
  }
}

// 获取创世区块信息
export async function getgenesisblock(tronWeb: TronWeb): Promise<Block | null> {
  try {
    const block = await tronWeb.trx.getBlock("earliest");
    return block;
  } catch (error) {
    log(chalk.red("获取创世区块失败:"), error);
    return null;
  }
}

// 获取最新的区块信息
export async function getnowblock(tronWeb: TronWeb): Promise<Block | null> {
  try {
    const block = await tronWeb.trx.getBlock("latest");
    return block;
  } catch (error) {
    log(chalk.red("获取创世区块失败:"), error);
    return null;
  }
}
