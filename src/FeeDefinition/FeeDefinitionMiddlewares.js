import * as axios from 'axios';
import * as Actions from './FeeDefinitionActions';
import * as AppMiddlewares from '../App/AppMiddlewares';

export function addFee() {
    return (dispatch, getState, baseUrl) => {
        var feeForm = getState().data.feeData.feeForm;
        const getMappedFee = x => {
            return {
                name: x.name,
                value: x.value
            }
        };
        axios.post(`${baseUrl}/fees`, {
            standards: feeForm.values.map(getMappedFee),
            name: feeForm.name,
            description: feeForm.description
        }).then((data) => {
            dispatch(AppMiddlewares.getMasterData());
            dispatch(Actions.closeFeeDefinitionForm());
        });
    };
}

export function updateFee() {
    return (dispatch, getState, baseUrl) => {
        var feeForm = getState().data.feeData.feeForm;
        const getMappedFee = x => {
            return {
                name: x.name,
                value: x.value
            }
        };
        axios.put(`${baseUrl}/fees/${feeForm.id}`, {
            standards: feeForm.values.map(getMappedFee),
            name: feeForm.name,
            description: feeForm.description
        }).then((data) => {
            dispatch(AppMiddlewares.getMasterData());
            dispatch(Actions.closeFeeDefinitionForm());
        });
    };
}

export function updateFeeMarkets() {
    return (dispatch, getState, baseUrl) => {
        axios.put(`${baseUrl}/markets/fee-modes`,{
            items: getState()
                .data
                .feeData
                .marketApplyForm
                .markets
                .filter(x=>x.selected)
                .map(x=> { return {marketId: x.id, feeModeId: x.feeModeId}})
        }).then(()=>{
            dispatch(AppMiddlewares.getMasterData());
            dispatch(Actions.hideFeeMarketsForm());
        })
    }
}