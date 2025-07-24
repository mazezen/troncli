import chalk from "chalk";
const log = console.log;

export function validValue(value: string): boolean {
  if (!value || value.trim() === "") {
    log(chalk.red(`Input value cannot be empty`));
    return false;
  }
  return true;
}

export function parseFloatByString(value: string): number {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    log(chalk.red(`Invalid input value: ${value}`));
    return 0;
  }
  return numValue;
}
