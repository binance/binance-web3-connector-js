# Changelog

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
