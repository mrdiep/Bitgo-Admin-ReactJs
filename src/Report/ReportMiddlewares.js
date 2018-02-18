import * as axios from 'axios';
import {
    setData
} from './ReportActions'

export function getExecutedOrders() {
    return (dispatch, getState, baseUrl) => {
        axios.get(`${baseUrl}/data/executed-orders`).then(e => {

            var masterData = getState().app.masterData;

            const getOrderTypeNameById = id => masterData.orderTypeDefinitions.filter(x => x.id === id)[0].name;
            const getCurrencyNameById = id => masterData.currencies.filter(x => x.id === id)[0].name;

            const executedOrders = e.data;
            for (var x of executedOrders) {
                const market = masterData.markets.filter(t => t.id === x.MarketId)[0];
                x.id = x.Id;
                x.market = market.name;
                x.buyOrderTypeName = getOrderTypeNameById(x.BuyOrderTypeId);
                x.sellOrderTypeName = getOrderTypeNameById(x.SellOrderTypeId);
                x.buyFullFillStateName = x.IsBuyFullFill ? "Full Fill" : "Partial";
                x.sellFullFillStateName = x.IsSellFullFill ? "Full Fill" : "Partial";
                x.buyerFee = x.BuyerFeeAmount + ' ' + getCurrencyNameById(x.BuyerFeeCurrency);
                x.sellerFee = x.SellerFeeAmount + ' ' + getCurrencyNameById(x.SellerFeeCurrency);
                x.buyerType = (x.Maker === x.BuyerId ? "Maker" : "Taker");
                x.sellerType = (x.Maker === x.SellerId ? "Maker" : "Taker");
                
                x.buyerInfo = x.BuyerName + ' #' + x.BuyerId;
                x.sellerInfo = x.SellerName + ' #' + x.SellerId;
                x.amount = x.ExecutedAmount + ' ' + market.currencyMarketName;
                x.price = x.ExecutedPrice + ' ' + (market.currencyExchangeUnit);
            }
            dispatch(setData({
                executedOrders
            }));
        })
    };
}

export function getWallets() {
    return (dispatch, getState, baseUrl) => {
        axios.get(`${baseUrl}/data/user-wallets`).then(e => {

            const masterData = getState().app.masterData;
            const getCurrencyNameById = id => masterData.currencies.filter(x => x.id === id)[0].name;
            const userWallets = e.data;

            for (let x of userWallets) {
                x.walletName = getCurrencyNameById(x.currency);
            }
            
            dispatch(setData({
                userWallets
            }));
        })
    };
}