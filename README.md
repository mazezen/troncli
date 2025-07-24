# <center>ts-tron-cli</center>

![](./commands.png)

一个基于 Node.js 和 TypeScript 构建的，用于与 TRON (波场) 区块链进行交互的命令行工具 (CLI)。

本项目旨在提供一个简单、可扩展的框架，让开发者可以轻松地通过命令行调用 TRON 的 HTTP API，实现查询链上信息、发送交易等操作。

## ✨ 功能特性

- **交互式命令行**: 在终端中提供一个持续运行的交互式提示符。
- **清晰的架构**: 命令逻辑、定义和主程序分离，易于理解和维护。
- **易于扩展**: 添加新命令只需修改一个文件，无需改动核心逻辑。
- **TypeScript 支持**: 完整的类型定义，提供更好的开发体验和代码健壮性。
- **美观的输出**: 使用 `chalk` 和 `figlet` 美化输出，使用 `console.table` 格式化帮助信息。

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) (建议使用 v16 或更高版本)
- [npm](https://www.npmjs.com/)

### 1. 克隆项目

```bash
git clone https://github.com/mazezen/ts-tron-cli.git
cd ts-tron-cli
```

### 2. 安装依赖

在项目根目录下运行以下命令来安装所有必需的依赖包：

```bash
npm install
```

### 3. 运行程序

使用 `ts-node` 来直 �� 运行 TypeScript 文件：

```bash
npx ts-node src/index.ts
```

运行后，你将看到欢迎横幅和交互式提示符 `ts-tron-cli >`。

## 📖 使用说明

程序启动后，你可以输入相应的命令并按回车键来执行。

### 可用命令

输入 `/help` 可以查看所有支持的命令及其说明：

```
ts-tron-cli > /help
┌─────────┬──────────────────┬──────────────────────────────────┐
│ (index) │      方法名       │             中文解释              │
├─────────┼──────────────────┼──────────────────────────────────┤
│    0    │ 'getblocknumber' │      '获取最新的区块信息'           │
│    1    │ 'getgenesisblock'│     '获取创世区块(最早的区块)信息'   │
│    2    │  'getnowblock'   │      '获取最新的区块信息'           │
└─────────┴──────────────────┴──────────────────────────────────┘
```

- **getblocknumber**: 获取并显示当前最新的区块的完整信息。
- **getgenesisblock**: 获取并显示创世区块（第一个区块）的整信息。
- **getnowblock**: 获取最新的区块信息
- **/help**: 显示所有可用命令的帮助表格。
- **exit**: 退出当前的交互式会话。

## 项目还在开发中,命令尚未加完.如果你愿意,很乐意你参与其中加入新的命令

## 🔧 如何添加新命令

本项目的架构使得添加新命令变得非常简单。

1.  **在 `src/block.ts` 中添加功能函数**:
    在这里编写与 `tronweb` 交互的异步函数。确保处理了可能发生的错误。例如：

    ```typescript
    // src/block.ts
    export async function getAccount(
      tronWeb: TronWeb,
      address: string
    ): Promise<any | null> {
      try {
        const account = await tronWeb.trx.getAccount(address);
        return account;
      } catch (error) {
        console.log(chalk.red("获取账户信息失败:"), error);
        return null;
      }
    }
    ```

2.  **在 `src/commands.ts` 中注册新命令**:
    将你的新函数添加到 `commands` Map 中，并提供一个简单的中文描述。

    ```typescript
    // src/commands.ts
    import { getblocknumber, getnowblock, getAccount } from "./block";

    // ...

    commands.set("getaccount", {
      description: "根据地址查询账户信息",
      // 注意：如果你的函数需要参数，需要调整 action 的结构
      action: (tronWeb) => getAccount(tronWeb, "TRON_ADDRESS_HERE"),
    });
    ```

    > **注意**: 当前的命令分发器还不支 �� 参数。未来的版本可以改进 `rl.on("line", ...)` 的逻辑来解析命令行参数。

3.  **完成!**
    重新运行程序，你的新命令 `getaccount` 和它的说明就会自动出现在 `/help` 列表中，并可以被执行。

## 📄 许可证

本项目基于 [MIT](https://github.com/mazezen/ts-tron-cli/blob/main/LICENSE) 许可证。
