import { FETCH_FIRST_BANNER, FETCH_SECOND_BANNER, FETCH_THIRD_BANNER, BANNER_COUNT } from "../actions/types";
import _ from "lodash";

const INITIAL_VALUE = {
  first_banners: {},
  second_banners: {},
  third_banners: {}
};

const advertisementReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
      case FETCH_FIRST_BANNER:
        return {
          ...state,
          first_banners: {..._.mapKeys(action.payload, "id")}
        };
      case FETCH_SECOND_BANNER:
        return {
          ...state,
          second_banners: {..._.mapKeys(action.payload, "id")}
        };
      case FETCH_THIRD_BANNER:
        return {
          ...state,
          third_banners: {..._.mapKeys(action.payload, "id")}
        };
    case BANNER_COUNT:
        if (action.payload.place == 1) {
            return {
                ...state,
                first_banners: {...state.first_banners, count: action.payload.count}
            }
        }
        if (action.payload.place == 2) {
            return {
                ...state,
                second_banners: {...state.second_banners, count: action.payload.count}
            }
        }
        if (action.payload.place == 3) {
            return {
                ...state,
                third_banners: {...state.third_banners, count: action.payload.count}
            }
        }
    default:
      return state;
  }
};

export default advertisementReducer;
