import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  withdrawableCoins: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COINS':
      return { ...state, withdrawableCoins: state.withdrawableCoins + action.amount };
    default:
      return state;
  }
};

const store = configureStore({ reducer });

export default store;