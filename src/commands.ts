import { TronWeb } from "tronweb";
import {
  getBlock,
  getBlockByBlockHash,
  getBlockNumber,
  getGenesisBlock,
  getNowBlock,
} from "./block";
import {
  createrandom,
  createAccount,
  getAccount,
  getAccountResources,
} from "./account";
import { sunToTrx, toBigNumber, toDecimal } from "./utils/number";
import { isAddress } from "./utils/address";
import { fromMnemonic } from "./utils/account";
import { getBalance, getBandwidth } from "./address";
import { getBandwidthPrices } from "./bandwidth";

export interface Command {
  description: string;
  action: (tronWeb: TronWeb, ...args: string[]) => Promise<any>;
}

export const commands = new Map<string, Command>();

commands.set("createrandom", {
  description: "创建12位的助记词",
  action: createrandom,
});
commands.set("createaccount", {
  description: "创建地址账号 <未激活的新地址>",
  action: createAccount,
});

commands.set("getaccount", {
  description: "根据地址查询账户信息。用法: getaccount <address: b58 | hex>",
  action: getAccount,
});

commands.set("getaccountresources", {
  description:
    "获取账号中的能量和带宽资源。用法: getaccount <address: b58 | hex>",
  action: getAccountResources,
});

commands.set("getgenesisblock", {
  description: "获取创世区块(最早的区块)信息",
  action: getGenesisBlock,
});

commands.set("getnowblock", {
  description: "获取最新的区块信息",
  action: getNowBlock,
});

commands.set("getblocknumber", {
  description: "获取最新的区块信息",
  action: getBlockNumber,
});

commands.set("getbalance", {
  description: "获取账户可用TRX余额. 用法: getbalance <address: b58 | hex>",
  action: getBalance,
});

commands.set("getbandwidth", {
  description: "获取账户可用带宽余额. 用法: getbandwidth <address: b58 | hex>",
  action: getBandwidth,
});

commands.set("getbandwidthprices", {
  description: "查询历史带宽单价",
  action: getBandwidthPrices,
});

commands.set("getblock", {
  description:
    "通过区块高度或区块 ID 查询区块信息. 用法: getblock <blockNumber | blockId | `latest` | `earliest`>",
  action: getBlock,
});

commands.set("getblockbyhash", {
  description: "通过区块 ID 查询区块信息. 用法: getblock <blockId>",
  action: getBlockByBlockHash,
});

commands.set("frommnemonic", {
  description:
    "根据助记词回复地址和私钥 用法: frommnemonic <mmnemonic> | <mmnemonic path>",
  action: fromMnemonic,
});

commands.set("suntotrx", {
  description: "sun to trx。用法: suntotrx <value>",
  action: sunToTrx,
});

commands.set("isaddress", {
  description: "isAddress。用法: isaddress <address: b58 | hex>",
  action: isAddress,
});

commands.set("tobignumber", {
  description: "to big number。用法: tobignumber <value>",
  action: toBigNumber,
});

commands.set("todecimal", {
  description: "to decimal: todecimal <value: 0x15>",
  action: toDecimal,
});

export function printHelp() {
  const helpTable = Array.from(commands.entries()).map(([name, command]) => ({
    方法名: name,
    中文解释: command.description,
  }));

  console.table(helpTable);
}
