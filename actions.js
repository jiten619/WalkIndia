// actions.js
export const UPDATE_WALLET_AMOUNT = "UPDATE_WALLET_AMOUNT";

export const updateWalletAmount = (amountToAdd) => {
  return { type: UPDATE_WALLET_AMOUNT, payload: amountToAdd };
};