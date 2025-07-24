import { TronWeb } from "tronweb";
import chalk from "chalk";
import { Token } from "tronweb/lib/esm/types";
import { isAddress } from "./utils/address";

const log = console.log;

/**
 * 通过名称查询 TRC10 代币列表。
 *
 * @param tronWeb - TronWeb 实例。
 * @param tokenName - 要查询的代币名称。
 * @returns 成功时返回代币信息或代币信息数组，失败时返回 null。
 */
export async function getTokenListByName(
  tronWeb: TronWeb,
  tokenName: string
): Promise<Token | Token[] | null> {
  if (!tokenName) {
    log(chalk.red("错误: 请提供代币名称。用法: gettokenlistbyname <tokenName>"));
    return null;
  }
  log(chalk.yellow(`正在通过名称 "${tokenName}" 查询 TRC10 代币列表...`));
  try {
    const tokens = await tronWeb.trx.getTokenListByName(tokenName);
    log(chalk.green("✔ 查询成功!"));
    return tokens;
  } catch (error) {
    log(
      chalk.red(`通过代币名称 ${tokenName} 查询 TRC10 代币列表失败: `),
      error
    );
    return null;
  }
}

/**
 * 通过 ID 查询 TRC10 代币信息。
 *
 * @param tronWeb - TronWeb 实例��
 * @param tokenID - 要查询的代币 ID。
 * @returns 成功时返回代币信息对象，失败时返回 null。
 */
export async function getTokenByID(
  tronWeb: TronWeb,
  tokenID: string | number
): Promise<Token | null> {
  if (!tokenID) {
    log(chalk.red("错误: 请提供代币 ID。用法: gettokenbyid <tokenID>"));
    return null;
  }
  log(chalk.yellow(`正在通过 ID "${tokenID}" 查询 TRC10 代币信息...`));
  try {
    const token = await tronWeb.trx.getTokenByID(tokenID);
    log(chalk.green("✔ 查询成功!"));
    return token;
  } catch (error) {
    log(chalk.red(`通过代币 id ${tokenID} 查询 TRC10 代币信息失败`), error);
    return null;
  }
}

/**
 * 通过 ID 查询 TRC10 代币信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param tokenID - 要查询的代币 ID。
 * @returns 成功时返回代币信息对象，失败时返回 null。
 */
export async function getTokenFromID(
  tronWeb: TronWeb,
  tokenID: string | number
): Promise<Token | null> {
  if (!tokenID) {
    log(chalk.red("错误: 请提供代币 ID。用法: gettokenfromid <tokenID>"));
    return null;
  }
  log(chalk.yellow(`正在通过 ID "${tokenID}" 查询 TRC10 代币信息...`));
  try {
    const token = await tronWeb.trx.getTokenFromID(tokenID);
    log(chalk.green("✔ 查询成功!"));
    return token;
  } catch (error) {
    log(chalk.red(`通过代币 id ${tokenID} 查询 TRC10 代币信息失败`), error);
    return null;
  }
}

/**
 * 查询指定地址发行的 TRC10 代币信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param address - 要查询的账户地址 (B58 或 HexString)。
 * @returns 成功时返回该地址发行的代币记录，失败时返回 null。
 */
export async function getTokensIssuedByAddress(
  tronWeb: TronWeb,
  address: string
): Promise<Record<string, Token> | null> {
  if (!address || !(await isAddress(tronWeb, address))) {
    log(
      chalk.red("错误: 请提供一个有效的地址。用法: gettokensissuedbyaddress <address>")
    );
    return null;
  }
  log(chalk.yellow(`正在查询账户 ${address} 的 TRC10 代币发行信息...`));
  try {
    const tokens = await tronWeb.trx.getTokensIssuedByAddress(address);
    log(chalk.green("✔ 查询成功!"));
    return tokens;
  } catch (error) {
    log(chalk.red(`查询账户 ${address} 的 TRC10 代币发行信息失败`), error);
    return null;
  }
}