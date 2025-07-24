import { TronWeb } from "tronweb";
import chalk from "chalk";
import { IBigNumber } from "tronweb/lib/esm/types";
import { validValue, parseFloatByString } from "./base";

const log = console.log;

// SUN convert to TRX
export async function sunToTrx(
  tronWeb: TronWeb,
  value: string
): Promise<string | IBigNumber> {
  if (!validValue(value)) {
    return "0";
  }

  let numValue = parseFloatByString(value);

  try {
    const result = tronWeb.fromSun(numValue);
    return result + " TRX";
  } catch (error) {
    console.log(
      chalk.red(`sunToTrx: Conversion failed for value ${value}:`),
      error
    );
    return "";
  }
}

// Convert a given number or hexadecimal string to a BigNumber
export async function toBigNumber(
  tronWeb: TronWeb,
  value: string
): Promise<string> {
  if (!validValue(value)) {
    return "0";
  }

  let numValue = parseFloatByString(value);

  try {
    const result = tronWeb.toBigNumber(numValue);
    return result.toString();
  } catch (error) {
    chalk.red(`toBigNumber: Conversion failed for value ${value}:`), error;
    return "0";
  }
}

// Convert a hexadecimal to a decimal number
export async function toDecimal(
  tronWeb: TronWeb,
  value: string
): Promise<number> {
  if (!validValue(value)) {
    return 0;
  }

  try {
    const result = tronWeb.toDecimal(value);
    return result;
  } catch (error) {
    chalk.red(`toDecimal: Conversion failed for value ${value}:`), error;
    return 0;
  }
}
