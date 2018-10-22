export const LOAD = 'coverage/LOAD';
export const LOADED = 'coverage/LOADED';

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
      console.log(action.result);
      return {
        ...state,
        data: action.result,
        loading: false,
        loaded: true 
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
          "coverageOptions": [
            {
              "name": "compDeductible",
              "title": "Comprehensive Deductible",
              "type": "optionBar",
              "options": [
                {
                  "name": "$250",
                  "value": "250"
                },
                {
                  "name": "$500",
                  "value": "500"
                },
                {
                  "name": "$1K",
                  "value": "1000"
                },
                {
                  "name": "No Coverage",
                  "value": "9999"
                }
              ]
            },
            {
              "name": "collDeductible",
              "title": "Collision Deductible",
              "type": "optionBar",
              "options": [
                {
                  "name": "$250",
                  "value": "250"
                },
                {
                  "name": "$500",
                  "value": "500"
                },
                {
                  "name": "$1K",
                  "value": "1000"
                },
                {
                  "name": "No Coverage",
                  "value": "9999"
                }
              ]
            },
            {
              "name": "rentalCar",
              "title": "Rental Car Reimbursement",
              "type": "optionBar",
              "options": [
                {
                  "name": "No",
                  "value": "false"
                },
                {
                  "name": "Yes",
                  "value": "true"
                }
              ]
            },
            {
              "name": "roadside",
              "title": "Roadside Assistance",
              "type": "optionBar",
              "options": [
                {
                  "name": "No",
                  "value": "false"
                },
                {
                  "name": "Yes",
                  "value": "true"
                }
              ]
            }
          ]
        }
      })
    }, 300)
  }
};
