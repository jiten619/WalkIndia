const initialState = {
  stepCount: 0,
  coins: 0,
};

export const actionTypes = {
  UPDATE_STEP_COUNT: 'UPDATE_STEP_COUNT',
  ADD_COINS: 'ADD_COINS',
};

export const updateStepCount = (count) => ({
  type: actionTypes.UPDATE_STEP_COUNT,
  count,
});

export const addCoins = (amount) => ({
  type: actionTypes.ADD_COINS,
  amount,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP_COUNT:
      return { ...state, stepCount: action.count };
    case actionTypes.ADD_COINS:
      return { ...state, coins: state.coins + action.amount };
    default:
      return state;
  }
};

export default reducer;