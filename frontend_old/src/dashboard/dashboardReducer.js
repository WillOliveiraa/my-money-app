import { BILLING_SUMMARY } from '../main/util/types';

const INITIAL_STATE = { summary: { credit: 0, debt: 0 } };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case BILLING_SUMMARY:
            return { ...state, summary: action.payload.data };
        default:
            return state;
    }
}
