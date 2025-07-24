import chalk from "chalk";
import figlet from "figlet";

const log = console.log;

export function showWelcomeMessage() {
  log(
    chalk.greenBright(
      figlet.textSync("ts-tron-cli", {
        font: "Graffiti",
        horizontalLayout: "full",
        width: 200,
      })
    )
  );
  log("");
  log(
    chalk.yellowBright(
      "------------------------------------------------------------------------------------"
    )
  );
  log("");
  log(
    chalk.red(
      "> 1. ts-tron-cli 是一个开源的TRON接口命令行工具, 基于TRON Http API实现"
    )
  );
  log(
    chalk.red("> 2. ts-tron-cli 作者: mazezen 仓库地址: ") +
      chalk.blue("https://github.com/mazezen/ts-tron-cli")
  );
  log(
    chalk.red(
      "> 3. 你可以通过命令行实现对TRON链的操作,如查询最新区块高度, 查询交易信息, 发送交易等"
    )
  );
  log(chalk.red("> 4. 输入/help 查询支持的所有HTTP API 接口"));
  log("");
}
