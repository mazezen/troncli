import chalk from "chalk";
import figlet from "figlet";

const log = console.log;

export function showWelcomeMessage() {
  log(
    chalk.yellowBright(
      "------------------------------------------------------------------------------------"
    )
  );
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
    chalk.redBright(
      "ts-tron-cli> * 基于 Node.js 和 TypeScript 构建的，用于与 TRON (波场) 区块链进行交互的命令行工具 (CLI)"
    )
  );
  log(
    chalk.redBright(
      "ts-tron-cli> * 本项目旨在提供一个简单、可扩展的框架，让使用人员可以轻松地通过命令行调用 TRON 的 HTTP API，实现查询链上信息、发送交易等操作"
    )
  );
  // log(
  //   chalk.redBright("ts-tron-cli> 3. 作者:") +
  //     chalk.greenBright(" ✈️mazezen✈️ ") +
  //     chalk.redBright("Email: ") +
  //     chalk.greenBright("mazezen24@gmail.com") +
  //     chalk.redBright(" Tg:"),
  //   chalk.blue("https://t.me/Smellcoder")
  // );
  // log(
  //   chalk.redBright("ts-tron-cli> 4. Github: ") +
  //     chalk.blue("https://github.com/mazezen") +
  //     chalk.redBright(" 仓库地址: ") +
  //     chalk.blue("https://github.com/mazezen/ts-tron-cli")
  // );
  log(chalk.redBright("ts-tron-cli> * 输入/help 查询支持的所有HTTP API 接口"));
  log(chalk.redBright("ts-tron-cli> * 按 `ctrl+c` 或者 输入 `exit` 退出"));
  log("");
}
