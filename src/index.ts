#!/usr/bin/env node
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
  const parts = line.trim().split(/\s+/); // 按一个或多个空格分割
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (commandName === "exit") {
    rl.close();
    return;
  }

  if (commandName === "/help") {
    printHelp();
  } else if (commands.has(commandName)) {
    try {
      const command = commands.get(commandName)!;
      const result = await command.action(tronWeb, ...args); // 传递参数
      if (result) {
        log(result);
      }
    } catch (error) {
      log(chalk.red("处理命令时发生错误:", error));
    }
  } else {
    if (commandName) {
      log(
        chalk.gray(`未知命令: "${commandName}". 请输入 /help 查看可用命令。`)
      );
    }
  }

  rl.prompt();
});

rl.on("close", () => {
  log(chalk.green("Good bye! Welcome to use next time!"));
  process.exit(0);
});
