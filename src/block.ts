import { TronWeb } from "tronweb";
import { Block } from "tronweb/lib/esm/types";
import chalk from "chalk";

const log = console.log;

/**
 * 获取最新区块信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @returns 成功时返回最新区块对象，失败时返回 null。
 */
export async function getBlockNumber(tronWeb: TronWeb): Promise<Block | null> {
  log(chalk.yellow("正在获取最新区块信息..."));
  try {
    const block = await tronWeb.trx.getBlock("latest");
    log(chalk.green("✔ 获取最新区块成功!"));
    return block;
  } catch (error) {
    log(chalk.red("获取最新区块失败:"), error);
    return null;
  }
}

/**
 * 获取创世区块信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @returns 成功时返回创世区块对象，失败时返回 null。
 */
export async function getGenesisBlock(tronWeb: TronWeb): Promise<Block | null> {
  log(chalk.yellow("正在获取创世区块信息..."));
  try {
    const block = await tronWeb.trx.getBlock("earliest");
    log(chalk.green("✔ 获取创世区块成功!"));
    return block;
  } catch (error) {
    log(chalk.red("获取创世区块失败:"), error);
    return null;
  }
}

/**
 * 获取当前最新区块信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @returns 成功时返回最新区块对象，失败时返回 null。
 */
export async function getNowBlock(tronWeb: TronWeb): Promise<Block | null> {
  log(chalk.yellow("正在获取最新区块信息..."));
  try {
    const block = await tronWeb.trx.getBlock("latest");
    log(chalk.green("✔ 获取最新区块成功!"));
    return block;
  } catch (error) {
    log(chalk.red("获取最新区块失败:"), error);
    return null;
  }
}

/**
 * 通过区块高度或区块 ID 查询区块信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param blockNumberOrBlockId - 区块高度、区块ID、'latest' 或 'earliest'。
 * @returns 成功时返回区块对象，失败时返回 null。
 */
export async function getBlock(
  tronWeb: TronWeb,
  blockNumberOrBlockId: string
): Promise<Block | null> {
  if (!blockNumberOrBlockId) {
    log(
      chalk.red("错误: 请提供区块高度或区块ID。用法: getblock <blockNumber | blockId>")
    );
    return null;
  }
  log(chalk.yellow(`正在查询区块 ${blockNumberOrBlockId}...`));
  try {
    const block = await tronWeb.trx.getBlock(blockNumberOrBlockId);
    log(chalk.green(`✔ 查询区块 ${blockNumberOrBlockId} 成功!`));
    return block;
  } catch (error) {
    log(chalk.red(`通过区块高度或区块 ID 查询区块信息失败: `), error);
    return null;
  }
}

/**
 * 通过区块哈希查询区块信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param blockID - 区块哈希 (ID)。
 * @returns 成功时返回区块对象，失败时返回 null。
 */
export async function getBlockByBlockHash(
  tronWeb: TronWeb,
  blockID: string
): Promise<Block | null> {
  if (!blockID) {
    log(chalk.red("错误: 请提供区块哈希。用法: getblockbyhash <blockId>"));
    return null;
  }
  log(chalk.yellow(`正在通过哈希 ${blockID} 查询区块...`));
  try {
    const block = await tronWeb.trx.getBlockByHash(blockID);
    log(chalk.green(`✔ 查询区块 ${blockID} 成功!`));
    return block;
  } catch (error) {
    log(chalk.red(`通过区块 ID ${blockID} 查询区块信息失败: `), error);
    return null;
  }
}

/**
 * 通过区块高度查询区块信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param blockNumber - 区块高度。
 * @returns 成功时返回区块对象，失败时返回 null。
 */
export async function getBlockByNumber(
  tronWeb: TronWeb,
  blockNumber: string
): Promise<Block | null> {
  const num = Number(blockNumber);
  if (!blockNumber || isNaN(num) || num < 0) {
    log(
      chalk.red("错误: 请提供一个有效的区块高度。用法: getblockbynumber <blockNumber>")
    );
    return null;
  }
  log(chalk.yellow(`正在通过高度 ${num} 查询区块...`));
  try {
    const block = await tronWeb.trx.getBlockByNumber(num);
    log(chalk.green(`✔ 查询区块 ${num} 成功!`));
    return block;
  } catch (error) {
    log(chalk.red(`通过区块高度 ${num} 查询区块信息失败: `), error);
    return null;
  }
}

/**
 * 通过区块高度范围查询区块信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param startBlockNumber - 起始区块高度。
 * @param endBlockNumber - 结束区块高度。
 * @returns 成功时返回区块对象数组，失败时返回 null。
 */
export async function getBlockRange(
  tronWeb: TronWeb,
  startBlockNumber: string,
  endBlockNumber: string
): Promise<Block[] | null> {
  const start = Number(startBlockNumber);
  const end = Number(endBlockNumber);

  if (
    !startBlockNumber ||
    isNaN(start) ||
    start < 0 ||
    !endBlockNumber ||
    isNaN(end) ||
    end < 0 ||
    start > end
  ) {
    log(
      chalk.red(
        "错误: 请提供有效的起始和结束区块高度。用法: getblockrange <start> <end>"
      )
    );
    return null;
  }
  log(chalk.yellow(`正在查询区块范围 ${start} 到 ${end}...`));
  try {
    let block = await tronWeb.trx.getBlockRange(start, end);
    log(chalk.green(`✔ 查询区块范围 ${start}-${end} 成功!`));
    return block;
  } catch (error) {
    log(
      chalk.red(
        `通过区高度范围 start: ${start} end: ${end} 查询区块信息失败: `
      ),
      error
    );
    return null;
  }
}

/**
 * 检索区块内的交易数量。
 *
 * @param tronWeb - TronWeb 实例。
 * @param blockHeightOrBlockHash - 区块高度或区块哈希。
 * @returns 成功时返回交易数量，失败时返回 0。
 */
export async function getBlockTransactionCount(
  tronWeb: TronWeb,
  blockHeightOrBlockHash: string | number
): Promise<number> {
  if (!blockHeightOrBlockHash) {
    log(
      chalk.red(
        "错误: 请提供区块高度或哈希。用法: getblocktransactioncount <blockHeight | blockHash>"
      )
    );
    return 0;
  }
  log(chalk.yellow(`正在查询区块 ${blockHeightOrBlockHash} 的交易数量...`));
  try {
    const count = await tronWeb.trx.getBlockTransactionCount(
      blockHeightOrBlockHash
    );
    log(chalk.green(`✔ 查询成功!`));
    return count;
  } catch (error) {
    log(
      chalk.red(
        `通过区块高度或者区块HASH ${blockHeightOrBlockHash} 检索区块内的交易数量失败: `
      ),
      error
    );
    return 0;
  }
}