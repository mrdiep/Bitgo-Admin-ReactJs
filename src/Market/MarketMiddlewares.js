import * as axios from 'axios';
import * as MarketActions from './MarketActions';
import * as AppMiddlewares from '../App/AppMiddlewares';

export function updateFeeConfiguration() {
    return (dispatch, getState, baseUrl) => {
        var formData = getState().data.marketData.marketFeeConfiguration;
        axios.put(`${baseUrl}/markets/${formData.marketIdSelected}/fee`, {
            feeId: formData.feeIdSelected,
            feeModeId: formData.feeModeIdSelected
        }).then(()=>{
            dispatch(AppMiddlewares.getMasterData())
            dispatch(MarketActions.hideFeeConfiguration());
        })
    }
}

export function updateCurrencyConfiguration() {
    return (dispatch, getState, baseUrl) => {
        var formData = getState().data.marketData.marketFeeConfiguration;
        axios.put(`${baseUrl}/markets/${formData.marketIdSelected}/fee`, {
            feeId: formData.feeIdSelected,
            feeModeId: formData.feeModeIdSelected
        }).then(()=>{
            dispatch(AppMiddlewares.getMasterData())
            dispatch(MarketActions.hideFeeConfiguration());
        })
    }
}