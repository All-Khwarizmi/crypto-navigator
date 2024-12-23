# CryptoNavigator 🧭

## Overview
CryptoNavigator is an AI-powered Telegram bot that helps users navigate the complex world of cryptocurrency purchases and transfers. Built during the Mode AI Agent Hackathon, it aims to simplify the process of finding and transferring cryptocurrencies across different networks.

### 🌟 Key Features
- Find where to buy specific cryptocurrencies
- Guide through transfer processes
- Validate wallet addresses
- Check balances on Mode Network
- Provide step-by-step instructions

### 🛠 Tech Stack
- Eliza Framework for AI agent capabilities
- GOAT (Great Onchain Agent Toolkit) for blockchain interactions
- Mode Network integration
- Telegram Bot API
- TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v23+)
- pnpm
- Telegram Bot Token
- Mode Network Private Key

### Installation
```bash
# Clone the repository
git clone [your-repo-url]
cd crypto-navigator

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
```

### Environment Variables
```env
MODE_PRIVATE_KEY=your_mode_network_private_key
MODE_PROVIDER_URL=https://mainnet.mode.network
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

### Running the Bot
```bash
pnpm start
```

## 🤖 Usage Examples
1. Finding where to buy tokens:
   ```
   User: "How do I buy TON?"
   Bot: *Provides list of available exchanges and step-by-step guide*
   ```

2. Checking balances:
   ```
   User: "What's my balance?"
   Bot: *Shows current Mode Network balance*
   ```

## 🔧 Project Structure
```
crypto-navigator/
├── src/
│   ├── plugins/
│   │   └── goat/
│   │       ├── index.ts      # GOAT plugin integration
│   │       └── wallet.ts     # Wallet configuration
│   ├── character.ts          # AI agent configuration
│   └── index.ts             # Main application entry
├── .env                     # Environment variables
└── package.json
```

## 🛣 Roadmap
- [ ] Add support for more networks
- [ ] Implement cross-chain transfer guides
- [ ] Add price comparison features
- [ ] Integrate with more DEXes
- [ ] Enhance security validations

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
MIT

## 🙏 Acknowledgments
- Mode Network team
- Eliza Framework
- GOAT SDK
- Crossmint

---
Built with ❤️ for the Mode AI Agent Hackathon 2024
