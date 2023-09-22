export const SupportedChainId = {
  POLYGON_MAINNET: 137,
  POLYGON_TESTNET: 80001,
  POLYGON_HEX_MAINNET: "0x89",
  POLYGON_HEX_TESTNET: "0x13881",
};

export const TokenSale = {
  [SupportedChainId.POLYGON_MAINNET]: "",
  [SupportedChainId.POLYGON_TESTNET]: "0xB66A412ba4ea0949d8AeFCe79735a25c5962496a",
  [SupportedChainId.POLYGON_HEX_MAINNET]: "",
  [SupportedChainId.POLYGON_HEX_TESTNET]: "0xB66A412ba4ea0949d8AeFCe79735a25c5962496a",
};

export default module.exports = {
  SupportedChainId,
  TokenSale,
};