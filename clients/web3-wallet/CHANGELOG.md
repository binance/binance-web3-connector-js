# Changelog

## 12.0.0 - 2026-09-01

### Changed (14)

- Deleted parameter `disableRFQ`
  - affected methods:
    - `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`)
- Modified parameter `body`:
  - allOf modified
  - affected methods:
    - `settleB402PaymentV1()` (`POST /api/v1/b402/settle`)
- Modified parameter `body`:
  - allOf modified
  - affected methods:
    - `settleB402PaymentV2()` (`POST /api/v2/b402/settle`)
- Modified parameter `body`:
  - `paymentPayload`.`accepted`.`extra`: allOf modified
  - `paymentRequirements`.`extra`: allOf modified
  - affected methods:
    - `verifyB402PaymentV2()` (`POST /api/v2/b402/verify`)
- Modified response field `accepted`:
  - `extra`: allOf modified
  - affected events:
    - `B402PaymentPayloadV2`
- Modified response field `paymentRequirements`:
  - `extra`: allOf modified
  - affected events:
    - `B402SettleRequestV2`
    - `B402VerifyRequestV2`
- Modified response field `extra`:
  - allOf modified
  - affected events:
    - `B402PaymentRequirementsV2`
- Modified response field `body`:
  - allOf modified
  - affected events:
    - `B402SettleEnvelopeV1`
    - `B402SettleEnvelopeV2`
    - `settleB402PaymentV1Request`
    - `settleB402PaymentV2Request`
- Modified response field `paymentPayload`:
  - `accepted`.`extra`: allOf modified
  - affected events:
    - `B402SettleRequestV2`
    - `B402VerifyRequestV2`
- Modified response field `body`:
  - `paymentPayload`.`accepted`.`extra`: allOf modified
  - `paymentRequirements`.`extra`: allOf modified
  - affected events:
    - `B402VerifyEnvelopeV2`
    - `verifyB402PaymentV2Request`
- Modified response schema `B402PaymentRequirementsExtraV2`:
  - allOf modified
- Modified response schema `B402SettleRequestV1`:
  - allOf modified

## 11.1.1 - 2026-08-25

### Changed (1)

- Update `@binance-web3/common` library to version `1.0.2`.

## 11.1.0 - 2026-08-06

### Added (1)

- `getLatestBlockHeight()` (`GET /api/v1/dex/pre-transaction/block-height`)

### Changed (1)

- Added parameter `vendor`
  - affected methods:
    - `getAggregatedQuote()` (`GET /api/v1/dex/aggregator/quote`)

## 11.0.0 - 2026-07-29

### Changed (8)

- Added parameter `feePercent`
  - affected methods:
    - `getAggregatedQuote()` (`GET /api/v1/dex/aggregator/quote`)
    - `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`)
    - `buildSwapTransaction()` (`GET /api/v1/dex/aggregator/swap`)
    - `buildSolanaSwapInstructions()` (`GET /api/v1/dex/aggregator/swap-instruction`)
- Added parameter `feeSource`
  - affected methods:
    - `getAggregatedQuote()` (`GET /api/v1/dex/aggregator/quote`)
- Added parameter `fromTokenReferrerWalletAddress`
  - affected methods:
    - `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`)
    - `buildSwapTransaction()` (`GET /api/v1/dex/aggregator/swap`)
    - `buildSolanaSwapInstructions()` (`GET /api/v1/dex/aggregator/swap-instruction`)
- Added parameter `toTokenReferrerWalletAddress`
  - affected methods:
    - `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`)
    - `buildSwapTransaction()` (`GET /api/v1/dex/aggregator/swap`)
    - `buildSolanaSwapInstructions()` (`GET /api/v1/dex/aggregator/swap-instruction`)
- Modified response for `getAggregatedQuote()` (`GET /api/v1/dex/aggregator/quote`):
  - `data`.items: property `feeAmount` added
  - `data`.items: property `feeToken` added
  - `data`.items: property `actualSwapAmount` added
  - `data`.items: item property `feeAmount` added
  - `data`.items: item property `feeToken` added
  - `data`.items: item property `actualSwapAmount` added

- Modified response for `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`):
  - `data`.`routerResult`: property `feeAmount` added
  - `data`.`routerResult`: property `actualSwapAmount` added
  - `data`.`routerResult`: property `feeToken` added

- Modified response for `buildSwapTransaction()` (`GET /api/v1/dex/aggregator/swap`):
  - `data`.`routerResult`: property `feeToken` added
  - `data`.`routerResult`: property `actualSwapAmount` added
  - `data`.`routerResult`: property `feeAmount` added

- Modified response for `buildSolanaSwapInstructions()` (`GET /api/v1/dex/aggregator/swap-instruction`):
  - `data`.`routerResult`: property `feeAmount` added
  - `data`.`routerResult`: property `feeToken` added
  - `data`.`routerResult`: property `actualSwapAmount` added

## 10.0.0 - 2026-07-28

### Changed (1)

- Modified response for `getGasLimit()` (`POST /api/v1/dex/pre-transaction/gas-limit`):
  - `data`: property `energyFee` added
  - `data`: property `energyRequired` added
  - `data`: property `freeBandwidth` added
  - `data`: property `freeEnergy` added
  - `data`: property `bandwidthFee` added
  - `data`: property `bandwidthRequired` added

## 9.0.1 - 2026-07-21

### Changed (2)

- Update `@binance-web3/common` library to version `1.0.1`.
- Resolve security vulnerabilities.

## 9.0.0 - 2026-07-20

### Removed (1)

- `getLeaderboardSupportedChains()` (`GET /api/v1/dex/market/leaderboard/supported/chain`)

## 8.0.0 - 2026-07-17

### Added (1)

- `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`)

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
