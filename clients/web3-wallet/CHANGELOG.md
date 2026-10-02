# Changelog

## 13.0.1 - 2026-10-02

### Changed (2)

- Update `@binance-web3/common` library to version `1.1.2`.
- Resolve security vulnerabilities.

## 13.0.0 - 2026-09-30

### Changed (220)

#### REST API

- Modified response for `settleB402PaymentV1()` (`POST /api/v1/b402/settle`):
  - property `status` added
  - property `subData` added
  - property `type` added
  - property `code` added
  - property `data` added
  - property `errorData` added
  - property `params` added
  - oneOf removed 2 schema(s)

- Modified response for `getB402SupportedConfigurationsV1()` (`POST /api/v1/b402/supported`):
  - property `type` added
  - property `code` added
  - property `data` added
  - property `errorData` added
  - property `params` added
  - property `status` added
  - property `subData` added
  - oneOf removed 2 schema(s)

- Modified response for `settleB402PaymentV2()` (`POST /api/v2/b402/settle`):
  - property `errorData` added
  - property `params` added
  - property `status` added
  - property `subData` added
  - property `type` added
  - property `code` added
  - property `data` added
  - oneOf removed 2 schema(s)

- Modified response for `getB402SupportedConfigurationsV2()` (`POST /api/v2/b402/supported`):
  - property `code` added
  - property `data` added
  - property `errorData` added
  - property `params` added
  - property `status` added
  - property `subData` added
  - property `type` added
  - oneOf removed 2 schema(s)

- Modified response for `verifyB402PaymentV2()` (`POST /api/v2/b402/verify`):
  - property `errorData` added
  - property `params` added
  - property `status` added
  - property `subData` added
  - property `type` added
  - property `code` added
  - property `data` added
  - oneOf removed 2 schema(s)

- Added response field `status`
  - affected events:
    - `getB402SupportedConfigurationsV1Response`
    - `getB402SupportedConfigurationsV2Response`
    - `settleB402PaymentV1Response`
    - `settleB402PaymentV2Response`
    - `verifyB402PaymentV2Response`
- Added response field `subData`
  - affected events:
    - `getB402SupportedConfigurationsV1Response`
    - `getB402SupportedConfigurationsV2Response`
    - `settleB402PaymentV1Response`
    - `settleB402PaymentV2Response`
    - `verifyB402PaymentV2Response`
- Added response field `type`
  - affected events:
    - `getB402SupportedConfigurationsV1Response`
    - `getB402SupportedConfigurationsV2Response`
    - `settleB402PaymentV1Response`
    - `settleB402PaymentV2Response`
    - `verifyB402PaymentV2Response`
- Added response field `code`
  - affected events:
    - `getB402SupportedConfigurationsV1Response`
    - `getB402SupportedConfigurationsV2Response`
    - `settleB402PaymentV1Response`
    - `settleB402PaymentV2Response`
    - `verifyB402PaymentV2Response`
- Added response field `data`
  - affected events:
    - `getB402SupportedConfigurationsV1Response`
    - `getB402SupportedConfigurationsV2Response`
    - `settleB402PaymentV1Response`
    - `settleB402PaymentV2Response`
    - `verifyB402PaymentV2Response`
- Added response field `errorData`
  - affected events:
    - `getB402SupportedConfigurationsV1Response`
    - `getB402SupportedConfigurationsV2Response`
    - `settleB402PaymentV1Response`
    - `settleB402PaymentV2Response`
    - `verifyB402PaymentV2Response`
- Added response field `params`
  - affected events:
    - `getB402SupportedConfigurationsV1Response`
    - `getB402SupportedConfigurationsV2Response`
    - `settleB402PaymentV1Response`
    - `settleB402PaymentV2Response`
    - `verifyB402PaymentV2Response`
- Removed response schema `getBroadcastOrdersResponse401`
- Removed response schema `getTransactionsByAddressResponse401`
- Removed response schema `getRfqOrderStatusResponse403`
- Removed response schema `listDeFiProtocolsResponse403`
- Removed response schema `getRwaTokenListResponse404`
- Removed response schema `getCandlesResponse403`
- Removed response schema `getTokenBalancesByAddressResponse403`
- Removed response schema `getTopTradersResponse403`
- Removed response schema `getTokenBalancesByAddressResponse401`
- Removed response schema `getTokenDevInfoResponse403`
- Removed response schema `buildDeFiClaimTransactionResponse404`
- Removed response schema `getAddressPortfolioOverviewResponse403`
- Removed response schema `getGasPriceResponse403`
- Removed response schema `getB402SupportedConfigurationsV1Response401`
- Removed response schema `getHotTokenListResponse404`
- Removed response schema `getB402SupportedConfigurationsV1Response1`
- Removed response schema `getAddressRecentPnLResponse404`
- Removed response schema `getAllTokenBalancesByAddressResponse404`
- Removed response schema `getB402SupportedConfigurationsV2Response2`
- Removed response schema `getTokenBasicInfoResponse404`
- Removed response schema `getRwaTokenIssuancePlatformsResponse404`
- Removed response schema `getRwaTokenPriceResponse403`
- Removed response schema `getAddressPnLForSpecificTokenResponse401`
- Removed response schema `getTransactionDetailByHashResponse401`
- Removed response schema `getBroadcastOrdersResponse403`
- Removed response schema `getTrackedTradesResponse401`
- Removed response schema `getAggregatedQuoteResponse401`
- Removed response schema `quoteAndBuildSwapTransactionResponse401`
- Removed response schema `listDeFiProtocolsResponse401`
- Removed response schema `getAddressRecentPnLResponse401`
- Removed response schema `getProtocolDetailResponse401`
- Removed response schema `buildSwapTransactionResponse401`
- Removed response schema `getErc20ApproveTransactionResponse404`
- Removed response schema `getTokenBasicInfoResponse401`
- Removed response schema `buildDeFiClaimTransactionResponse401`
- Removed response schema `getTokenTradesResponse401`
- Removed response schema `submitRfqOrderResponse401`
- Removed response schema `settleB402PaymentV2Response1`
- Removed response schema `getRfqOrderStatusResponse404`
- Removed response schema `buildDeFiDepositTransactionResponse401`
- Removed response schema `buildDeFiClaimTransactionResponse403`
- Removed response schema `getPortfolioSupportedChainsResponse401`
- Removed response schema `getTransactionsByAddressResponse403`
- Removed response schema `getAggregatorSupportedChainsResponse401`
- Removed response schema `getAddressPortfolioOverviewResponse404`
- Removed response schema `listDeFiInvestmentsResponse404`
- Removed response schema `getTokenTradingInfoResponse401`
- Removed response schema `calculateLpAddPairedAmountsResponse403`
- Removed response schema `getTrackedTradesResponse404`
- Removed response schema `getAggregatorSupportedChainsResponse403`
- Removed response schema `searchTokenResponse403`
- Removed response schema `calculateLpAddPairedAmountsResponse401`
- Removed response schema `getTokenAdvancedInfoResponse404`
- Removed response schema `getTokenTradesResponse404`
- Removed response schema `getTokenDevInfoResponse401`
- Removed response schema `getRwaTokenIssuancePlatformsResponse401`
- Removed response schema `getRwaUnderlyingMarketDataResponse404`
- Removed response schema `buildDeFiDepositTransactionResponse403`
- Removed response schema `getLatestBlockHeightResponse404`
- Removed response schema `getB402SupportedConfigurationsV2Response1`
- Removed response schema `getTokenPriceResponse401`
- Removed response schema `getGasPriceResponse404`
- Removed response schema `getAggregatorSupportedChainsResponse404`
- Removed response schema `getHoldersRankingResponse404`
- Removed response schema `getHoldersRankingResponse401`
- Removed response schema `buildLpAddTransactionResponse403`
- Removed response schema `getCandlesResponse401`
- Removed response schema `getTokenTradingInfoResponse404`
- Removed response schema `getSupportedChainsResponse401`
- Removed response schema `getAddressPnLForSpecificTokenResponse404`
- Removed response schema `buildLpRemoveTransactionResponse404`
- Removed response schema `settleB402PaymentV1Response403`
- Removed response schema `buildLpRemoveTransactionResponse403`
- Removed response schema `getB402SupportedConfigurationsV2Response429`
- Removed response schema `verifyB402PaymentV2Response2`
- Removed response schema `verifyB402PaymentV1Response403`
- Removed response schema `quoteAndBuildSwapTransactionResponse404`
- Removed response schema `buildLpAddTransactionResponse401`
- Removed response schema `getDeFiPositionsResponse401`
- Removed response schema `buildSwapTransactionResponse403`
- Removed response schema `verifyB402PaymentV2Response403`
- Removed response schema `getPortfolioSupportedChainsResponse404`
- Removed response schema `getRwaTokenPriceResponse404`
- Removed response schema `getTokenBalancesByAddressResponse404`
- Removed response schema `calculateLpAddPairedAmountsResponse404`
- Removed response schema `getB402SupportedConfigurationsV2Response401`
- Removed response schema `getTransactionStatusResponse401`
- Removed response schema `getAggregatedQuoteResponse403`
- Removed response schema `searchTokenResponse401`
- Removed response schema `getTransactionStatusResponse403`
- Removed response schema `simulateTransactionsResponse403`
- Removed response schema `getInvestmentDetailResponse403`
- Removed response schema `searchTokenResponse404`
- Removed response schema `buildSolanaSwapInstructionsResponse403`
- Removed response schema `settleB402PaymentV2Response403`
- Removed response schema `buildSolanaSwapInstructionsResponse404`
- Removed response schema `buildDeFiRedeemTransactionResponse404`
- Removed response schema `getHoldersRankingResponse403`
- Removed response schema `getB402SupportedConfigurationsV1Response503`
- Removed response schema `getTokenDevInfoResponse404`
- Removed response schema `simulateTransactionsResponse404`
- Removed response schema `getRwaUnderlyingInfoResponse401`
- Removed response schema `getTrackedTradesResponse403`
- Removed response schema `broadcastTransactionsResponse403`
- Removed response schema `getTransactionDetailByHashResponse404`
- Removed response schema `getB402SupportedConfigurationsV1Response429`
- Removed response schema `getRwaUnderlyingInfoResponse404`
- Removed response schema `getWalletSupportedChainsResponse403`
- Removed response schema `getRfqOrderStatusResponse401`
- Removed response schema `getAddressRecentPnLResponse403`
- Removed response schema `getRwaUnderlyingMarketDataResponse403`
- Removed response schema `buildDeFiRedeemTransactionResponse401`
- Removed response schema `buildLpAddTransactionResponse404`
- Removed response schema `getAllTokenBalancesByAddressResponse401`
- Removed response schema `getLatestBlockHeightResponse401`
- Removed response schema `getProtocolDetailResponse404`
- Removed response schema `getGasPriceResponse401`
- Removed response schema `getTransactionStatusResponse404`
- Removed response schema `settleB402PaymentV1Response2`
- Removed response schema `getLeaderboardResponse401`
- Removed response schema `verifyB402PaymentV2Response503`
- Removed response schema `getB402SupportedConfigurationsV2Response503`
- Removed response schema `settleB402PaymentV2Response503`
- Removed response schema `getTokenPriceResponse404`
- Removed response schema `getBroadcastOrdersResponse404`
- Removed response schema `getPortfolioSupportedChainsResponse403`
- Removed response schema `getLatestBlockHeightResponse403`
- Removed response schema `getTopLiquidityPoolsResponse404`
- Removed response schema `verifyB402PaymentV1Response503`
- Removed response schema `getTokenTradesResponse403`
- Removed response schema `buildSwapTransactionResponse404`
- Removed response schema `getDexTradeHistoryResponse403`
- Removed response schema `getTokenBasicInfoResponse403`
- Removed response schema `submitRfqOrderResponse404`
- Removed response schema `verifyB402PaymentV1Response401`
- Removed response schema `getProtocolDetailResponse403`
- Removed response schema `getDexTradeHistoryResponse404`
- Removed response schema `getDeFiPositionsResponse404`
- Removed response schema `broadcastTransactionsResponse404`
- Removed response schema `settleB402PaymentV1Response401`
- Removed response schema `getTransactionDetailByHashResponse403`
- Removed response schema `settleB402PaymentV1Response503`
- Removed response schema `submitRfqOrderResponse403`
- Removed response schema `getInvestmentDetailResponse404`
- Removed response schema `getTopTradersResponse404`
- Removed response schema `getTokenPriceResponse403`
- Removed response schema `getGasLimitResponse401`
- Removed response schema `searchRwaTokenResponse404`
- Removed response schema `buildDeFiRedeemTransactionResponse403`
- Removed response schema `getGasLimitResponse403`
- Removed response schema `getRwaUnderlyingInfoResponse403`
- Removed response schema `getAddressPortfolioOverviewResponse401`
- Removed response schema `getTokenAdvancedInfoResponse401`
- Removed response schema `getGasLimitResponse404`
- Removed response schema `getTransactionSupportedChainsResponse403`
- Removed response schema `getTransactionsByAddressResponse404`
- Removed response schema `getRwaUnderlyingMarketDataResponse401`
- Removed response schema `getB402SupportedConfigurationsV2Response403`
- Removed response schema `buildDeFiDepositTransactionResponse404`
- Removed response schema `settleB402PaymentV2Response2`
- Removed response schema `getCandlesResponse404`
- Removed response schema `listDeFiInvestmentsResponse403`
- Removed response schema `getRwaTokenListResponse403`
- Removed response schema `getRwaTokenPriceResponse401`
- Removed response schema `listDeFiInvestmentsResponse401`
- Removed response schema `getLeaderboardResponse404`
- Removed response schema `getLeaderboardResponse403`
- Removed response schema `getTokenAdvancedInfoResponse403`
- Removed response schema `quoteAndBuildSwapTransactionResponse403`
- Removed response schema `broadcastTransactionsResponse401`
- Removed response schema `getB402SupportedConfigurationsV1Response2`
- Removed response schema `verifyB402PaymentV2Response1`
- Removed response schema `getRwaTokenIssuancePlatformsResponse403`
- Removed response schema `searchRwaTokenResponse401`
- Removed response schema `settleB402PaymentV2Response429`
- Removed response schema `getTopLiquidityPoolsResponse403`
- Removed response schema `getHotTokenListResponse403`
- Removed response schema `verifyB402PaymentV1Response429`
- Removed response schema `getErc20ApproveTransactionResponse401`
- Removed response schema `listDeFiProtocolsResponse404`
- Removed response schema `searchRwaTokenResponse403`
- Removed response schema `simulateTransactionsResponse401`
- Removed response schema `getTransactionSupportedChainsResponse401`
- Removed response schema `settleB402PaymentV1Response1`
- Removed response schema `settleB402PaymentV1Response429`
- Removed response schema `getSupportedChainsResponse404`
- Removed response schema `verifyB402PaymentV2Response429`
- Removed response schema `getTransactionSupportedChainsResponse404`
- Removed response schema `getRwaTokenListResponse401`
- Removed response schema `getWalletSupportedChainsResponse404`
- Removed response schema `getWalletSupportedChainsResponse401`
- Removed response schema `getAllTokenBalancesByAddressResponse403`
- Removed response schema `getTopTradersResponse401`
- Removed response schema `buildLpRemoveTransactionResponse401`
- Removed response schema `getErc20ApproveTransactionResponse403`
- Removed response schema `getSupportedChainsResponse403`
- Removed response schema `getTokenTradingInfoResponse403`
- Removed response schema `getB402SupportedConfigurationsV1Response403`
- Removed response schema `getDeFiPositionsResponse403`
- Removed response schema `settleB402PaymentV2Response401`
- Removed response schema `getHotTokenListResponse401`
- Removed response schema `getDexTradeHistoryResponse401`
- Removed response schema `getTopLiquidityPoolsResponse401`
- Removed response schema `getInvestmentDetailResponse401`
- Removed response schema `verifyB402PaymentV2Response401`
- Removed response schema `buildSolanaSwapInstructionsResponse401`
- Removed response schema `getAddressPnLForSpecificTokenResponse403`
- Removed response schema `getAggregatedQuoteResponse404`

## 12.3.1 - 2026-09-28

### Changed (1)

- Update `@binance-web3/common` library to version `1.1.1`.

## 12.3.0 - 2026-09-17

### Added (1)

- Support WS Streams.

### Changed (1)

- Update `@binance-web3/common` library to version `1.1.0`.

## 12.2.1 - 2026-09-11

### Changed (1)

- Update `@binance-web3/common` library to version `1.0.5`.

## 12.2.0 - 2026-09-10

### Changed (2)

- Added parameter `enableRFQ`
  - affected methods:
    - `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`)
- Added parameter `excludeDexes`
  - affected methods:
    - `quoteAndBuildSwapTransaction()` (`GET /api/v1/dex/aggregator/quote-and-swap`)

## 12.1.2 - 2026-09-03

### Changed (2)

- Update `@binance-web3/common` library to version `1.0.4`.
- Resolve security vulnerabilities.

## 12.1.1 - 2026-09-03

### Changed (1)

- Update `@binance-web3/common` library to version `1.0.3`.

## 12.1.0 - 2026-09-02

### Added (1)

- `getWebSocketAuthToken()` (`GET /api/v1/dex/market/wss/auth/token`)

### Changed (1)

- Added response schema `getWebSocketAuthTokenResponse`

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
