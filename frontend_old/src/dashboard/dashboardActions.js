import axios from 'axios';

import { BASE_URL } from '../main/util/string';
import { BILLING_SUMMARY } from '../main/util/types';

export function getSummary() {
    const request = axios.get(`${BASE_URL}/billingCycles/summary`);
    return {
        type: BILLING_SUMMARY,
        payload: request
    };
}
