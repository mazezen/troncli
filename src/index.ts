import chalk from "chalk";
import * as readline from "readline";
import { showWelcomeMessage } from "./welcome";
import { newTronWeb } from "./tronweb";
import { commands, printHelp } from "./commands";

const log = console.log;

showWelcomeMessage();

const tronWeb = newTronWeb();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt(chalk.cyan("ts-tron-cli > "));
rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim().toLowerCase();

  if (input === "exit") {
    rl.close();
    return;
  }

  if (input === "/help") {
    printHelp();
  } else if (commands.has(input)) {
    try {
      const command = commands.get(input)!;
      const result = await command.action(tronWeb);
      if (result) {
        log(result);
      }
    } catch (error) {
      log(chalk.red("处理命令时发生错误:", error));
    }
  } else {
    if (input) {
      log(
        chalk.gray(`未知命令: "${line.trim()}". 请输入 /help 查看可用命令。`)
      );
    }
  }

  rl.prompt();
});

rl.on("close", () => {
  log(chalk.green("Good bye! Welcome to use next time!"));
  process.exit(0);
});
