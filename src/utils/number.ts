import { TronWeb } from "tronweb";
import chalk from "chalk";
import { IBigNumber } from "tronweb/lib/esm/types";
import { validValue, parseFloatByString } from "./base";

const log = console.log;

/**
 * 将 SUN 转换为 TRX。
 *
 * @param tronWeb - TronWeb 实例。
 * @param value - 要转换的 SUN 数量 (字符串)。
 * @returns 成功时返回带 "TRX" 后缀的字符串，失败时返回 "0" 或空字符串。
 */
export async function sunToTrx(
  tronWeb: TronWeb,
  value: string
): Promise<string | IBigNumber> {
  if (!validValue(value)) {
    return "0";
  }

  let numValue = parseFloatByString(value);

  try {
    log(chalk.yellow(`正在将 ${value} SUN 转换为 TRX...`));
    const result = await tronWeb.fromSun(numValue);
    log(chalk.green("✔ 转换成功!"));
    return result + " TRX";
  } catch (error) {
    log(chalk.red(`sunToTrx: 转换失败，值: ${value}:`), error);
    return "";
  }
}

/**
 * 将给定的数字或十六进制字符串转换为 BigNumber。
 *
 * @param tronWeb - TronWeb 实例。
 * @param value - 要转换的数字或十六进制字符串。
 * @returns 成功时返回 BigNumber 的字符串表示形式，失败时返回 "0"���
 */
export async function toBigNumber(
  tronWeb: TronWeb,
  value: string
): Promise<string> {
  if (!validValue(value)) {
    return "0";
  }

  let numValue = parseFloatByString(value);

  log(chalk.yellow(`正在将 ${value} 转换为 BigNumber...`));
  try {
    const result = await tronWeb.toBigNumber(numValue).toString();
    log(chalk.green("✔ 转换成功!"));
    return result;
  } catch (error) {
    log(chalk.red(`toBigNumber: 转换失败，值: ${value}:`), error);
    return "0";
  }
}

/**
 * 将十六进制转换为十进制数。
 *
 * @param tronWeb - TronWeb 实例。
 * @param value - 要转换的十六进制字符串。
 * @returns 成功时返回十进制数，失败时返回 0。
 */
export async function toDecimal(
  tronWeb: TronWeb,
  value: string
): Promise<number> {
  if (!validValue(value)) {
    return 0;
  }

  log(chalk.yellow(`正在将十六进制 ${value} 转换为十进制...`));
  try {
    const result = await tronWeb.toDecimal(value);
    log(chalk.green("✔ 转换成功!"));
    return result;
  } catch (error) {
    log(chalk.red(`toDecimal: 转换失败，值: ${value}:`), error);
    return 0;
  }
}