# Changelog

## 7.0.0 - 2026-07-15

### Added (9)

- `getAddressTrackerTrades()` (`GET /api/v1/dex/market/address-tracker/trades`)
- `getLeaderboardList()` (`GET /api/v1/dex/market/leaderboard/list`)
- `getLeaderboardSupportedChains()` (`GET /api/v1/dex/market/leaderboard/supported/chain`)
- `getPortfolioDexHistory()` (`GET /api/v1/dex/market/portfolio/dex-history`)
- `getPortfolioOverview()` (`GET /api/v1/dex/market/portfolio/overview`)
- `getPortfolioRecentPnL()` (`GET /api/v1/dex/market/portfolio/recent-pnl`)
- `getPortfolioSupportedChains()` (`GET /api/v1/dex/market/portfolio/supported/chain`)
- `getPortfolioTokenLatestPnL()` (`GET /api/v1/dex/market/portfolio/token/latest-pnl`)
- `getTokenDevInfo()` (`GET /api/v1/dex/market/memepump/tokenDevInfo`)

## 6.0.0 - 2026-06-19

### Added (2)

- `getRfqOrderStatus()` (`GET /api/v1/dex/aggregator/order/{orderId}`)
- `submitRfqOrder()` (`POST /api/v1/dex/aggregator/order/submit`)

### Changed (4)

- Added parameter `userWalletAddress`
  - affected methods:
    - `getAggregatedQuote()` (`GET /api/v1/dex/aggregator/quote`)
- Added parameter `vendor`
  - affected methods:
    - `getErc20ApproveTransaction()` (`GET /api/v1/dex/aggregator/approve-transaction`)
- Modified response for `getAggregatedQuote()` (`GET /api/v1/dex/aggregator/quote`):
  - `data`.items: property `approveTarget` added
  - `data`.items: property `executionMode` added
  - `data`.items: property `isBest` added
  - `data`.items: item property `approveTarget` added
  - `data`.items: item property `executionMode` added
  - `data`.items: item property `isBest` added

- Modified response for `buildSwapTransaction()` (`GET /api/v1/dex/aggregator/swap`):
  - `data`: property `executionMode` added
  - `data`: property `rfq` added

## 5.0.0 - 2026-06-17

### Changed (1)

- Modified parameter `slippagePercent`:
  - required: `true` → `false`
  - affected methods:
    - `buildSwapTransaction()` (`GET /api/v1/dex/aggregator/swap`)

## 4.0.0 - 2026-06-16

### Changed (2)

- Modified `BuildSwapTransactionApproveTransactionEnum` enum values:
  - `true` → `TRUE`
  - `false` → `FALSE` 
- Modified `BuildSwapTransactionAutoSlippageEnum` enum values:
  - `true` → `TRUE`
  - `false` → `FALSE`

## 2.0.0 - 2026-06-05

### Changed (2)

- - Modified response for `getCandles()` (`GET /api/v1/dex/market/candles`):
  - `data`.items.items: type `string` → `number`
- Modified response for `getHotTokenList()` (`GET /api/v1/dex/market/token/hot-token`):
  - `data`.`items`.items: property `riskLevel` deleted
  - `data`.`items`.items: item property `riskLevel` deleted

## 1.0.0 - 2026-06-02

- Initial release
