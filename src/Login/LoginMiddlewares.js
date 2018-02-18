import * as axios from 'axios';

import * as LoginActions from './LoginActions';
import * as AppMiddlewares from '../App/AppMiddlewares'

export function doLogin() {
    return (dispatch, getState, baseUrl) => {
        // axios.get(`${baseUrl}/auth/login`).then(e=>{
        //     console.log(e.data);
        //     dispatch(LoginActions.login());            
        // })   
        dispatch(LoginActions.login());        
        dispatch(AppMiddlewares.getMasterData()); 
    };
}