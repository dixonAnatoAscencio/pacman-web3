export const SupportedChainId = {
  POLYGON_MAINNET: 137,
  POLYGON_TESTNET: 80001,
  POLYGON_HEX_MAINNET: "0x89",
  POLYGON_HEX_TESTNET: "0x13881",
};

export const TokenSale = {
  [SupportedChainId.POLYGON_MAINNET]: "",
  [SupportedChainId.POLYGON_TESTNET]: "0x6656Bb82C4FDFaC99EA63dF82FAFAb33F0aB3Ca4",
  [SupportedChainId.POLYGON_HEX_MAINNET]: "",
  [SupportedChainId.POLYGON_HEX_TESTNET]: "0x6656Bb82C4FDFaC99EA63dF82FAFAb33F0aB3Ca4",
};

export default module.exports = {
  SupportedChainId,
  TokenSale,
};