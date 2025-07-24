import { TronWeb } from "tronweb";
import { getblocknumber, getnowblock, getgenesisblock } from "./block";

export interface Command {
  description: string;
  action: (tronWeb: TronWeb) => Promise<any>;
}

export const commands = new Map<string, Command>();

commands.set("getblocknumber", {
  description: "获取最新的区块信息",
  action: getblocknumber,
});

commands.set("getgenesisblock", {
  description: "获取创世区块(最早的区块)信息",
  action: getgenesisblock,
});

commands.set("getnowblock", {
  description: "获取最新区块信息",
  action: getnowblock,
});

export function printHelp() {
  const helpTable = Array.from(commands.entries()).map(([name, command]) => ({
    方法名: name,
    中文解释: command.description,
  }));

  console.table(helpTable);
}
