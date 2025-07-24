import { TronWeb } from "tronweb";
import chalk from "chalk";
import {
  GetTransactionResponse,
  SignedTransaction,
  TransactionInfo,
} from "tronweb/lib/esm/types";
import { fromPrivateKey } from "tronweb/lib/esm/utils";

const log = console.log;

/**
 * 通过交易ID查询交易信息。
 *
 * @param tronWeb - TronWeb 实例。
 * @param txId - 要查询的交易ID。
 * @returns 成功时返回交易对象，失败时返回 null。
 */
export async function getTransaction(
  tronWeb: TronWeb,
  txId: string
): Promise<GetTransactionResponse | null> {
  if (!txId) {
    log(chalk.red("错误: 请提供交易ID。用法: gettransaction <txId>"));
    return null;
  }
  log(chalk.yellow(`正在查询交易 ${txId}...`));
  try {
    const tx = await tronWeb.trx.getTransaction(txId);
    log(chalk.green(`✔ 查询交易 ${txId} 成功!`));
    return tx;
  } catch (error) {
    log(chalk.red(`查询交易 ${txId} 失败:`), error);
    return null;
  }
}

/**
 * 发送 TRC10 代币。
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param to - 接收代币的地址。
 * @param amountStr - 要发送的代币数量 (字符串形式)。
 * @param tokenID - TRC10 代币的 ID。
 * @returns 成功时返回交易广播结果，失败时返回 null。
 */
export async function sendToken(
  tronWeb: TronWeb,
  to: string,
  amountStr: string,
  tokenID: string
): Promise<any | null> {
  // 1. 验证输入参数是否齐全
  if (!to || !amountStr || !tokenID) {
    log(
      chalk.red(
        "错误: 参数不足。用法: sendtoken <to_address> <amount> <token_id>"
      )
    );
    return null;
  }

  if (!tronWeb.defaultPrivateKey) {
    log(
      chalk.red(
        `错误: 未配置私钥。请通过export TRON-PRO-API-KEY = "private key"设置有效的私钥后重试。`
      )
    );
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  try {
    const fromAddress = tronWeb.defaultAddress.base58.toString();
    log(
      chalk.yellow(
        `准备交易:
      - 从: ${fromAddress}
      - 到: ${to}
      - 数量: ${amount}
      - 代币ID: ${tokenID}`
      )
    );
    log(chalk.yellow("正在广播交易..."));

    const transaction = await tronWeb.trx.sendToken(to, amount, tokenID, {
      address: fromAddress,
      privateKey: tronWeb.defaultPrivateKey,
    });

    log(chalk.green("✔ 交易已成功广播!"));
    log(chalk.cyan("交易详情:"));
    return transaction;
  } catch (error) {
    log(chalk.red("发送代币失败:"), error);
    return null;
  }
}

/**
 * 对交易进行签名（不广播）。
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param args - [to, amount, from]
 * @returns 成功时返回签名后的交易对象，失败时返回 null。
 */
export async function sign(tronWeb: TronWeb, ...args: string[]): Promise<any> {
  if (args.length < 3) {
    log(
      chalk.red(
        "错误: 参数不足。用法: sign <to_address> <amount> <from_address>"
      )
    );
    return null;
  }
  const to = args[0];
  const amountStr = args[1];
  const from = args[2];

  if (!tronWeb.defaultPrivateKey) {
    log(
      chalk.red(
        `错误: 未配置私钥。请通过export TRON-PRO-API-KEY = "private key"设置有效的私钥后重试。`
      )
    );
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  const amountSun = tronWeb.toSun(amount);

  log(
    chalk.yellow(`准备为交易签名:
    - 从: ${from}
    - 到: ${to}
    - 数量: ${amount} TRX`)
  );

  try {
    const tradeObj = await tronWeb.transactionBuilder.sendTrx(
      to,
      Number(amountStr),
      from
    );
    const signedtxn = await tronWeb.trx.sign(
      tradeObj,
      tronWeb.defaultPrivateKey
    );
    log(chalk.green("✔ 交易签名成功!"));
    return signedtxn;
  } catch (error) {
    log(chalk.red(`交易签名失败: `), error);
    return null;
  }
}

/**
 * 广播一个已签名的十六进制格式的交易。
 *
 * @param tronWeb - TronWeb 实例。
 * @param signedTransactionHex - 已签名的交易的十六进制字符串。
 * @returns 成功时返回广播结果，失败时返回 null。
 */
export async function sendHexTransaction(
  tronWeb: TronWeb,
  signedTransactionHex: string
): Promise<any | null> {
  if (!signedTransactionHex) {
    log(
      chalk.red(
        "错误: 请提供已签名的交易哈希。用法: sendhextransaction <signed_tx_hex>"
      )
    );
    return null;
  }
  log(chalk.yellow("正在广播已签名的交易..."));
  try {
    const receipt = await tronWeb.trx.sendHexTransaction(signedTransactionHex);
    log(chalk.green("✔ 交易广播成功!"));
    log(chalk.cyan("交易详情:"));
    return receipt;
  } catch (error) {
    log(chalk.red("广播交易失败:"), error);
    return null;
  }
}

/**
 * 发送 TRX.
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param to - 接收地址。
 * @param amountStr - 要发送的TRX数量 (字符串形式)。
 * @returns 成功时返回交易广播结果，失败时返回 null。
 */
export async function sendRawTransaction(
  tronWeb: TronWeb,
  to: string,
  amountStr: string
): Promise<any | null> {
  // 1. 验证输入参数是否齐全
  if (!to || !amountStr) {
    log(
      chalk.red(
        "错误: 参数不足。用法: sendrawtransaction <to_address> <amount>"
      )
    );
    return null;
  }

  if (!tronWeb.defaultPrivateKey) {
    log(
      chalk.red(
        `错误: 未配置私钥。请通过export TRON-PRO-API-KEY = "private key"设置有效的私钥后重试。`
      )
    );
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  try {
    const fromAddress = tronWeb.defaultAddress.base58.toString();
    log(
      chalk.yellow(
        `准备发送 TRX:
      - 从: ${fromAddress}
      - 到: ${to}
      - 数量: ${amount} TRX`
      )
    );
    log(chalk.yellow("正在创建、签名并广播交易..."));

    const amountSun = tronWeb.toSun(amount);

    const tradeObj = await tronWeb.transactionBuilder.sendTrx(
      to,
      Number(amountSun),
      fromAddress
    );

    const signedtxn = await tronWeb.trx.sign(
      tradeObj,
      tronWeb.defaultPrivateKey
    );

    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    log(chalk.green("✔ 交易已成功广播!"));
    log(chalk.cyan("交易详情:"));
    return receipt;
  } catch (error) {
    log(chalk.red("发送TRX失败:"), error);
    return null;
  }
}

/**
 * 发送 TRC20 代币。
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param to - 接收代币的地址。
 * @param amountStr - 要发送的代币数量 (字符串形式)。
 * @param contractAddress - TRC20 合约地址。
 * @returns 成功时返回交易广播结果，失败时返回 null。
 */
export async function sendTrc20(
  tronWeb: TronWeb,
  to: string,
  amountStr: string,
  contractAddress: string
): Promise<any | null> {
  // 1. 验证输入参数是否齐全
  if (!to || !amountStr || !contractAddress) {
    log(
      chalk.red(
        "错误: 参数不足。用法: sendtrc20 <to_address> <amount> <contract_address>"
      )
    );
    return null;
  }

  if (!tronWeb.defaultPrivateKey) {
    log(
      chalk.red(
        `错误: 未配置私钥。请通过export TRON-PRO-API-KEY = "private key"设置有效的私钥后重试。`
      )
    );
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  try {
    const fromAddress = tronWeb.defaultAddress.base58.toString();
    log(
      chalk.yellow(
        `准备发送 TRC20:
      - 从: ${fromAddress}
      - 到: ${to}
      - 数量: ${amount}
      - 合约地址: ${contractAddress}`
      )
    );
    log(chalk.yellow("正在广播交易..."));

    const contract = await tronWeb.contract().at(contractAddress);
    const decimals = await contract.decimals().call();

    const [integerPart, fractionalPart = ""] = amountStr.split(".");
    if (fractionalPart.length > decimals) {
      log(
        chalk.red(
          `错误: 小数位数 (${fractionalPart.length}) 不能超过代币精度 (${decimals})。`
        )
      );
      return null;
    }
    const amountInSmallestUnit = BigInt(
      integerPart + fractionalPart.padEnd(decimals, "0")
    );

    const txId = await contract
      .transfer(to, amountInSmallestUnit.toString())
      .send({
        feeLimit: 100_000_000, // 100 TRX
      });

    log(chalk.green("✔ TRC20 交易已成功广播!"));
    log(chalk.cyan("交易ID:"), txId);
    return txId;
  } catch (error) {
    log(chalk.red("发送 TRC20 代币失败:"), error);
    return null;
  }
}

/**
 * 代理能量交易
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param to - 接收能量的地址。
 * @param amountStr - 用于冻结获取能量的TRX数量。
 * @returns 成功时返回交易广播结果，失败时返回 null。
 */
export async function delegateEnergy(
  tronWeb: TronWeb,
  to: string,
  amountStr: string
): Promise<any | null> {
  if (!to || !amountStr) {
    log(
      chalk.red("错误: 参数不足。用法: delegate-energy <to_address> <amount>")
    );
    return null;
  }

  if (!tronWeb.defaultPrivateKey) {
    log(chalk.red(`错误: 未配置私钥。`));
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  try {
    const fromAddress = tronWeb.defaultAddress.base58;
    const amountSun = tronWeb.toSun(amount);
    log(
      chalk.yellow(
        `准备代理能量:
      - 从 (所有者): ${fromAddress}
      - 到 (接收者): ${to}
      - 冻结数量: ${amount} TRX`
      )
    );
    log(chalk.yellow("正在创建、签名并广播交易..."));

    const tradeObj = await tronWeb.transactionBuilder.freezeBalanceV2(
      Number(amountSun),
      "ENERGY",
      to
    );
    const signedtxn = await tronWeb.trx.sign(
      tradeObj,
      tronWeb.defaultPrivateKey
    );
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    log(chalk.green("✔ 代理能量交易已成功广播!"));
    log(chalk.cyan("交易详情:"));
    return receipt;
  } catch (error) {
    log(chalk.red("代理能量失败:"), error);
    return null;
  }
}

/**
 * 回收能量交易
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param receiverAddress - 回收能量来源的地址 (即当初接收能量的地址)。
 * @param amountStr - 解冻以回收能量的TRX数量。
 * @returns 成功时返回交易广播结果，失败时返回 null。
 */
export async function undelegateEnergy(
  tronWeb: TronWeb,
  receiverAddress: string,
  amountStr: string
): Promise<any | null> {
  if (!receiverAddress || !amountStr) {
    log(
      chalk.red(
        "错误: 参数不足。用法: undelegate-energy <receiver_address> <amount>"
      )
    );
    return null;
  }

  if (!tronWeb.defaultPrivateKey) {
    log(chalk.red(`错误: 未配置私钥。`));
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  try {
    const ownerAddress = tronWeb.defaultAddress.base58;
    const amountSun = tronWeb.toSun(amount);
    log(
      chalk.yellow(
        `准备回收能量:
      - 从 (接收者): ${receiverAddress}
      - 到 (所有者): ${ownerAddress}
      - 解冻数量: ${amount} TRX`
      )
    );
    log(chalk.yellow("正在创建、签名并广播交易..."));

    const tradeObj = await tronWeb.transactionBuilder.unfreezeBalanceV2(
      Number(amountSun),
      "ENERGY",
      receiverAddress
    );
    const signedtxn = await tronWeb.trx.sign(
      tradeObj,
      tronWeb.defaultPrivateKey
    );
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    log(chalk.green("✔ 回收能量交易已成功广播!"));
    log(chalk.cyan("交易详情:"));
    return receipt;
  } catch (error) {
    log(chalk.red("回收能量失败:"), error);
    return null;
  }
}

/**
 * 代理带宽交易
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param to - 接收带宽的地址。
 * @param amountStr - 用于冻结获取带宽的TRX数量。
 * @returns 成功时返回交易广播结果，失败时返回 null。
 */
export async function delegateBandwidth(
  tronWeb: TronWeb,
  to: string,
  amountStr: string
): Promise<any | null> {
  if (!to || !amountStr) {
    log(
      chalk.red(
        "错误: 参数不足。用法: delegate-bandwidth <to_address> <amount>"
      )
    );
    return null;
  }

  if (!tronWeb.defaultPrivateKey) {
    log(chalk.red(`错误: 未配置私钥。`));
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  try {
    const fromAddress = tronWeb.defaultAddress.base58;
    const amountSun = tronWeb.toSun(amount);
    log(
      chalk.yellow(
        `准备代理带宽:
      - 从 (所有者): ${fromAddress}
      - 到 (接收者): ${to}
      - 冻结数量: ${amount} TRX`
      )
    );
    log(chalk.yellow("正在创建、签名并广播交易..."));

    const tradeObj = await tronWeb.transactionBuilder.freezeBalanceV2(
      Number(amountSun),
      "BANDWIDTH",
      to
    );
    const signedtxn = await tronWeb.trx.sign(
      tradeObj,
      tronWeb.defaultPrivateKey
    );
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    log(chalk.green("✔ 代理带宽交易已成功广播!"));
    log(chalk.cyan("交易详情:"));
    return receipt;
  } catch (error) {
    log(chalk.red("代理带宽失败:"), error);
    return null;
  }
}

/**
 * 回收带宽交易
 *
 * @param tronWeb - 已配置好私钥的 TronWeb 实例。
 * @param from - 回收带宽来源的地址 (即当初接收带宽的地址)。
 * @param amountStr - 解冻以回收带宽的TRX数量。
 * @returns 成功时返回交易广播结果，失败时返回 null。
 */
export async function undelegateBandwidth(
  tronWeb: TronWeb,
  from: string,
  amountStr: string
): Promise<any | null> {
  if (!from || !amountStr) {
    log(
      chalk.red(
        "错误: 参数不足。用法: undelegate-bandwidth <receiver_address> <amount>"
      )
    );
    return null;
  }

  if (!tronWeb.defaultPrivateKey) {
    log(chalk.red(`错误: 未配置私钥。`));
    return null;
  }

  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    log(chalk.red("错误: 无效的金额。数量必须是大于0的数字。"));
    return null;
  }

  try {
    const ownerAddress = tronWeb.defaultAddress.base58;
    const amountSun = tronWeb.toSun(amount);
    log(
      chalk.yellow(
        `准备回收带宽:
      - 从 (接收者): ${from}
      - 到 (所有者): ${ownerAddress}
      - 解冻数量: ${amount} TRX`
      )
    );
    log(chalk.yellow("正在创建、签名并广播交易..."));

    const tradeObj = await tronWeb.transactionBuilder.unfreezeBalanceV2(
      Number(amountSun),
      "BANDWIDTH",
      from
    );
    const signedtxn = await tronWeb.trx.sign(
      tradeObj,
      tronWeb.defaultPrivateKey
    );
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    log(chalk.green("✔ 回收带宽交易已成功广播!"));
    log(chalk.cyan("交易详情:"));
    return receipt;
  } catch (error) {
    log(chalk.red("回收带宽失败:"), error);
    return null;
  }
}

/**
 * 通过交易ID获取详细信息，包括费用和虚拟机事件。
 *
 * @param tronWeb - TronWeb 实例。
 * @param txId - 要查询的交易ID。
 * @returns 成功时返回交易详情对象，失败时返回 null。
 */
export async function getTransactionInfo(
  tronWeb: TronWeb,
  txId: string
): Promise<TransactionInfo | null> {
  if (!txId) {
    log(chalk.red("错误: 交易ID不能为空。用法: get-transaction-info <tx_id>"));
    return null;
  }

  try {
    log(chalk.yellow(`正在查询交易 ${txId} 的详细信息...`));
    const transactionInfo = await tronWeb.trx.getTransactionInfo(txId);
    log(chalk.green("✔ 查询成功!"));
    return transactionInfo;
  } catch (error) {
    log(chalk.red(`查询交易信息失败: `), error);
    return null;
  }
}
