import { FETCH_PRODUCT_CAMPAIGN, FETCH_FIRST_CAMPAIGN, FETCH_SECOND_CAMPAIGN, FETCH_THIRD_CAMPAIGN, CAMPAIGN_COUNT, FETCH_CAMPAIGNS, FETCH_SPONSORS, FETCH_BANNERS ,FETCH_FIRST_BANNER, FETCH_SECOND_BANNER, FETCH_THIRD_BANNER, BANNER_COUNT, FETCH_TRANSACTIONS, FETCH_FACTOR } from "../actions/types";
import _ from "lodash";

const INITIAL_VALUE = {
  sponsors: {},
  banners: {},
  campaigns: {},
  first_banners: {},
  second_banners: {},
  third_banners: {},
  first_campaigns: {},
  second_campaigns: {},
  third_campaigns: {},
  transactions: {}
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
    case FETCH_FIRST_CAMPAIGN:
        return {
          ...state,
          first_campaigns: {..._.mapKeys(action.payload, "id")}
        };
    case FETCH_SECOND_CAMPAIGN:
      return {
        ...state,
        second_campaigns: {..._.mapKeys(action.payload, "id")}
      };
    case FETCH_THIRD_CAMPAIGN:
      return {
        ...state,
        third_campaigns: {..._.mapKeys(action.payload, "id")}
      };
    case CAMPAIGN_COUNT:
        if (action.payload.place === 1) {
            return {
                ...state,
                first_campaigns_count: action.payload.count
            }
        }
        if (action.payload.place === 2) {
            return {
                ...state,
                second_campaigns_count: action.payload.count
            }
        }
        if (action.payload.place === 3) {
            return {
                ...state,
                third_campaigns: action.payload.count
            }
        }
    case BANNER_COUNT:
        if (action.payload.place === 1) {
            return {
                ...state,
                first_banners_count: action.payload.count
            }
        }
        if (action.payload.place === 2) {
            return {
                ...state,
                second_banners_count: action.payload.count
            }
        }
        if (action.payload.place === 3) {
            return {
                ...state,
                third_banners_count: action.payload.count
            }
        }
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: {..._.mapKeys(action.payload, "id") }
      }
    case FETCH_FACTOR:
      return {
        ...state,
        transactions: { ...state.transactions, [action.payload.id]: action.payload }
      };
    case FETCH_BANNERS:
      return {
        ...state,
        banners: { ..._.mapKeys(action.payload, "id") }
      }
    case FETCH_CAMPAIGNS:
      return {
        ...state,
        campaigns: { ..._.mapKeys(action.payload, "id") }
      }

    case FETCH_PRODUCT_CAMPAIGN:
        return {
          ...state,
          product_campaign: { ..._.mapKeys(action.payload, "id") }
        }
      
    case FETCH_SPONSORS:
      return {
        ...state,
        sponsors: { ..._.mapKeys(action.payload, "id") }
      }
    default:
      return state;
  }
};

export default advertisementReducer;
