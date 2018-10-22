export const LOAD = 'vehicle/LOAD';
export const LOADED = 'vehicle/LOADED';
export const UPDATE = 'vehicle/UPDATE';

const initialState = {
  data: null,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        data: null,
        loading: true,
        loaded: false
      }
    case LOADED:
      return {
        ...state,
        data: action.result,
        loading: false,
        loaded: true 
      }
    case UPDATE:
      return {
        ...state,
        data: action.result
      }
    default:
      return state
  }
}

export const load = () => {
  return dispatch => {
    dispatch({
      type: LOAD
    });

    return setTimeout(() => {
      dispatch({
        type: LOADED,
        result: {
          "name": "2008 Ford Explorer",
          "compDeductible": "250",
          "collDeductible": "250",
          "rentalCar": "false",
          "roadside": "false"
        }
      })
    }, 300)
  }
};

export const update = data => {
  return dispatch => {
    dispatch({
      type: UPDATE,
      result: data
    })
  }
};
