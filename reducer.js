const initialState = {
  stepCount: 0,
  coins: 0,
  distanceWalked: 0,
  timeToWalk: 0,
  caloriesBurned: 0,
};

export const actionTypes = {
  UPDATE_STEP_COUNT: 'UPDATE_STEP_COUNT',
  ADD_COINS: 'ADD_COINS',
  UPDATE_DISTANCE_WALKED: 'UPDATE_DISTANCE_WALKED',
  UPDATE_TIME_TO_WALK: 'UPDATE_TIME_TO_WALK',
  UPDATE_CALORIES_BURNED: 'UPDATE_CALORIES_BURNED',
};

export const updateStepCount = (count) => ({
  type: actionTypes.UPDATE_STEP_COUNT,
  count,
});

export const addCoins = (amount) => ({
  type: actionTypes.ADD_COINS,
  amount,
});

export const updateDistanceWalked = (distance) => ({
  type: actionTypes.UPDATE_DISTANCE_WALKED,
  distance,
});

export const updateTimeToWalk = (time) => ({
  type: actionTypes.UPDATE_TIME_TO_WALK,
  time,
});

export const updateCaloriesBurned = (calories) => ({
  type: actionTypes.UPDATE_CALORIES_BURNED,
  calories,
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


const healthDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_DISTANCE_WALKED:
      return {
        ...state,
        distanceWalked: action.distance,
      };
    case actionTypes.UPDATE_TIME_TO_WALK:
      return {
        ...state,
        timeToWalk: action.time,
      };
    case actionTypes.UPDATE_CALORIES_BURNED:
      return {
        ...state,
        caloriesBurned: action.calories,
      };
    default:
      return state;
  }
};

export  { reducer, healthDataReducer };