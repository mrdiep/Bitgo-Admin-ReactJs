import * as axios from 'axios';
import {
    setData
} from './AppActions'

function restructureData(masterData) {

    const getCurrencyNameById = id => masterData.currencies.filter(x => x.id === id)[0].name;
    const getFeeDefinitionById = id => masterData.feeDefinitions.filter(x=>x.id === id)[0];
    const getCountryById = id => masterData.countries.filter(x=>x.id === id)[0];
    const getMarketById = id => masterData.markets.filter(x=>x.id === id)[0];
    const getMarketsByCountryId = countryId => masterData.marketCountries.filter(x=>x.countryId === countryId).map(x=> getMarketById(x.marketId));
    const getCountriesByMarketId = marketId => masterData.marketCountries.filter(x=>x.marketId === marketId).map(x=>getCountryById(x.countryId))
    const getFeeMaketsByFeeId = feeId => masterData.markets.filter(x=>x.feeId === feeId);

    const getMarketsByCurrencyId = currencyId => masterData.markets.filter(x=> x.currencyMarket === currencyId || x.currencyExchange === currencyId);
    const getFeeModelNameById = id => masterData.feeModeDefinitions.filter(x=>x.id === id)[0].name;

    for(let x of masterData.markets) {
        x.name = getCurrencyNameById(x.currencyMarket) + '-' + getCurrencyNameById(x.currencyExchange);
        x.currencyExchangeUnit = getCurrencyNameById(x.currencyExchange) + "/" + getCurrencyNameById(x.currencyMarket);
        x.feeDefinitionName = getFeeDefinitionById(x.feeId).name;
        x.feeModeName = getFeeModelNameById(x.feeModeId);
        x.countries = getCountriesByMarketId(x.id).map(x=> { return { name: x.name, id: x.id }});
        x.marketCurrencyName = getCurrencyNameById(x.marketCurrency);
        x.currencyMarketName = getCurrencyNameById(x.currencyMarket);
    }

    for(let x of masterData.feeDefinitions) {
        x.markets = getFeeMaketsByFeeId(x.id).map(x=> { return { name: x.name, id: x.id }});
    }

    for(let x of masterData.currencies) {
        x.typeName = x.type===1? "Crypto" : ( x.type === 2 ? "Fiat" : "Error");
        x.markets = getMarketsByCurrencyId(x.id).map(x=> { return { name: x.name, id: x.id }});
    }

    for(let x of masterData.countries) {
        x.markets = getMarketsByCountryId(x.id).map(x=> { return { name: x.name, id: x.id }});
    }

    return masterData;
}

export function getMasterData() {
    return (dispatch, getState, baseApiUrl) => {
        axios.get(`${baseApiUrl}/data`).then(e => {
            const data = restructureData(e.data);
            dispatch(setData(data));
        })
    };
}