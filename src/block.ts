import { TronWeb } from "tronweb";
import { Block } from "tronweb/lib/esm/types";
import chalk from "chalk";

const log = console.log;

export async function getBlockNumber(tronWeb: TronWeb): Promise<Block | null> {
  try {
    const block = await tronWeb.trx.getBlock("latest");
    return block;
  } catch (error) {
    log(chalk.red("获取最新区块失败:"), error);
    return null;
  }
}

export async function getGenesisBlock(tronWeb: TronWeb): Promise<Block | null> {
  try {
    const block = await tronWeb.trx.getBlock("earliest");
    return block;
  } catch (error) {
    log(chalk.red("获取创世区块失败:"), error);
    return null;
  }
}

export async function getNowBlock(tronWeb: TronWeb): Promise<Block | null> {
  try {
    const block = await tronWeb.trx.getBlock("latest");
    return block;
  } catch (error) {
    log(chalk.red("获取创世区块失败:"), error);
    return null;
  }
}

// Query a block infomation by the block height or the block ID
// blockNumberOrBlockId: blockNumber | blockId | `latest` | `earliest`
export async function getBlock(
  tronWeb: TronWeb,
  blockNumberOrBlockId: string
): Promise<Block | null> {
  try {
    const block = tronWeb.trx.getBlock(blockNumberOrBlockId);
    return block;
  } catch (error) {
    log(chalk.red(`通过区块高度或区块 ID 查询区块信息失败: `), error);
    return null;
  }
}

// Query a block infomation by the block ID
export async function getBlockByBlockHash(
  tronWeb: TronWeb,
  blockID: string
): Promise<Block | null> {
  try {
    const block = tronWeb.trx.getBlockByHash(blockID);
    return block;
  } catch (error) {
    log(chalk.red(`通过区块 ID 查询区块信息失败: `), error);
    return null;
  }
}
