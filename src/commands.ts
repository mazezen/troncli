import { TronWeb } from "tronweb";
import {
  getBlock,
  getBlockByBlockHash,
  getBlockByNumber,
  getBlockNumber,
  getBlockRange,
  getBlockTransactionCount,
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
import { getBrokerage } from "./broker";
import { getNodeInfo } from "./node";
import {
  getTokenByID,
  getTokenFromID,
  getTokenListByName,
  getTokensIssuedByAddress,
} from "./token";
import {
  sendHexTransaction,
  getTransaction,
  sign,
  sendToken,
  sendRawTransaction,
  delegateBandwidth,
  undelegateBandwidth,
  delegateEnergy,
  undelegateEnergy,
} from "./transaction";

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

commands.set("getblockbynumber", {
  description: "通过区块高度查询区块信息. 用法: getblockbynumber <blockNumber>",
  action: getBlockByNumber,
});

commands.set("getblockrange", {
  description:
    "通过区块高度区间查询区块信息. 用法: getblockrange <startBlockNumber, endBlockNumber>",
  action: getBlockRange,
});

commands.set("getblocktransactioncount", {
  description:
    "检索区块内的交易数量. 用法: getBlockTransactionCount <blockHeight | blockHash | `earliest` | `latest`>",
  action: getBlockTransactionCount,
});

commands.set("getbrokerage", {
  description: "获取 SR 经纪佣金比例. 用法: getbrokerage <address>",
  action: getBrokerage,
});

commands.set("getnodeinfo", {
  description: "查询节点信息",
  action: getNodeInfo,
});

commands.set("gettokenlistbyname", {
  description:
    "通过代币名称 查询 TRC10 代币列表信息. 用法: gettokenlistbyname <tokenName>",
  action: getTokenListByName,
});

commands.set("gettokenbyid", {
  description: "通过代币 id 查询 TRC10 代币信息. 用法: gettokenbyid <tokenID>",
  action: getTokenByID,
});

commands.set("gettokenfromid", {
  description:
    "通过代币 id 查询 TRC10 代币信息. 用法: gettokenfromid <tokenID>",
  action: getTokenFromID,
});

commands.set("gettokensissuedbyaddress", {
  description:
    "查询账户的 TRC10 代币发行信息. 用法: gettokensissuedbyaddress <address: b58 | hex>",
  action: getTokensIssuedByAddress,
});

commands.set("gettransaction", {
  description: "通过交易 id 查询交易信息. 用法: gettransaction <txId>",
  action: getTransaction,
});

commands.set("sendtoken", {
  description:
    "交易 TRC10. 用法: sendtoken <to: b58, amount: 1 (对应代币最小单位), tokenID: 代币ID>",
  action: sendToken,
});

commands.set("sendrawtransaction", {
  description:
    "交易 TRX. 用法: sendrawtransaction <to: b58, amount: 1 (单位: TRX)>",
  action: sendRawTransaction,
});

commands.set("sendtrc20", {
  description:
    "交易TRC20(注意:此交易会消耗100TRX). 用法: sendtrc20 <to: b58, amount: 代币数量,  contractAddress: 合约地址  )>",
  action: sendRawTransaction,
});

commands.set("sign", {
  description:
    "交易签名(并未广播上链). 用法: sign <from: b58, amount: 1 (单位TRX), to: b58>",
  action: sign,
});

commands.set("sendhextransaction", {
  description:
    "交易签名(将上一步的sign广播上链). 用法: sendhextransaction <signedTransaction>",
  action: sendHexTransaction,
});

commands.set("delegatebandwidth", {
  description: "代理带宽. 用法: delegatebandwidth <to: b58, amount>",
  action: delegateBandwidth,
});

commands.set("undelegatebandwidth", {
  description: "回收带宽. 用法: undelegatebandwidth <from: b58, amount>",
  action: undelegateBandwidth,
});

commands.set("delegateenergy", {
  description: "代理能量. 用法: delegateenergy <to: b58, amount>",
  action: delegateEnergy,
});

commands.set("undelegateenergy", {
  description: "回收带宽. 用法: undelegateenergy <from: b58, amount>",
  action: undelegateEnergy,
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
