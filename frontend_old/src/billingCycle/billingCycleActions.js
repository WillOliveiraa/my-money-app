import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';

import { BASE_URL } from '../main/util/string';
import { BILLING_CYCLES_FETCHED, BILLING_CYCLES_FORM } from '../main/util/types';

const INITIAL_VALUES = { credits: [{}], debts: [{}] };

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`);
    return {
        type: BILLING_CYCLES_FETCHED,
        payload: request
    };
}

export function create(values) {
    return submit(values, 'post');   
}

export function update(values) {
    return submit(values, 'put');
}

export function remove(values) {
    return submit(values, 'delete');
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : '';
        // ['post']
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.');
                dispatch(init());
                // só pode passar um array pq foi colocado o redux-multi lá no index.jsx
                // dispatch([
                //     resetForm(BILLING_CYCLES_FORM),
                //     getList(),
                //     selectTab('tabList'),
                //     showTabs('tabList', 'tabCreate')
                // ]);
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error));
            });
    };
}

export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize(BILLING_CYCLES_FORM, billingCycle)
    ];
}

export function showDelete(billingCycle) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize(BILLING_CYCLES_FORM, billingCycle)
    ];
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize(BILLING_CYCLES_FORM, INITIAL_VALUES)
    ];
}
