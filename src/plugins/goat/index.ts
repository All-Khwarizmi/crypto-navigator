import { Plugin, Action, Provider, elizaLogger } from "@ai16z/eliza";
import { viem } from "@goat-sdk/wallet-viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { getTools, WalletClientBase, PluginBase } from "@goat-sdk/core";
import { getWalletProvider } from "./wallet.js";
import { getOnChainActions } from "./actions.js";
import { coingecko } from "@goat-sdk/plugin-coingecko";
const modeChain = {
  id: 34443,
  name: "Mode",
  network: "mode",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet.mode.network"] },
    public: { http: ["https://mainnet.mode.network"] },
  },
};

function formatPrivateKey(key: string): `0x${string}` {
  // Remove any whitespace
  key = key.trim();

  // Add 0x prefix if it's missing
  if (!key.startsWith("0x")) {
    key = "0x" + key;
  }

  // Ensure it's 32 bytes (64 characters + 0x prefix)
  if (key.length !== 66) {
    throw new Error("Private key must be 32 bytes (64 hex characters)");
  }

  return key as `0x${string}`;
}

const createModeWallet = (privateKey: string, providerUrl: string) => {
  try {
    const formattedKey = formatPrivateKey(privateKey);
    const wallet = createWalletClient({
      account: privateKeyToAccount(formattedKey),
      chain: modeChain,
      transport: http(providerUrl),
    });
    return viem(wallet);
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
};

async function createGoatPlugin(): Promise<Plugin> {
  elizaLogger.info("Initializing Mode Network plugin");
  const privateKey = process.env.MODE_PRIVATE_KEY;
  if (!privateKey) {
    elizaLogger.error("MODE_PRIVATE_KEY not configured");
    throw new Error("MODE_PRIVATE_KEY not configured");
  }

  elizaLogger.success("Mode Network plugin enabled");
  const providerUrl =
    process.env.MODE_PROVIDER_URL || "https://rpc.mode.network";
  const walletClient = createModeWallet(privateKey, providerUrl);

  elizaLogger.success("Mode Network wallet created");
  const walletProvider = getWalletProvider(walletClient);
  const tools = await getTools<WalletClientBase>({
    wallet: walletClient,
    plugins: [coingecko({ apiKey: process.env.COINGECKO_API_KEY })],
  });
  const actions = tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    }));

  // Define actions
  const action: Action[] = [
    {
      name: "CHECK_BALANCE",
      description: "Check your Mode Network wallet balance",
      similes: ["check my balance", "show my eth", "what's my balance"],
      examples: [],
      validate: async () => true,
      handler: async (runtime, message, state) => {
        try {
          const address = walletClient.getAddress();
          const balance = await walletClient.balanceOf(address);
          elizaLogger.success(`Your Mode Network balance is ${balance} ETH`);
          return true;
        } catch (error) {
          elizaLogger.error(`Failed to check balance: ${error}`);
          return false;
        }
      },
    },
  ];

  return {
    name: "Mode Network Plugin",
    description: "Enables interaction with Mode Network blockchain",
    actions: [],
    providers: [walletProvider],
    evaluators: [],
    services: [],
    clients: [],
  };
}

export default createGoatPlugin;

export const goatPlugin = await createGoatPlugin();

export function getSetting(key: string): string | undefined {
  switch (key) {
    case "MODE_PRIVATE_KEY":
      return process.env.MODE_PRIVATE_KEY;
    case "MODE_PROVIDER_URL":
      return process.env.MODE_PROVIDER_URL;
    default:
      return undefined;
  }
}
