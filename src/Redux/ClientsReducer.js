import { REGISTER_CLIENT } from "./Actions/actions";
import { ACTIVE_CLIENT } from "./Actions/actions";

const initialState = {
    registeredclients:[], activeClient:[]
}

const ClientReducer = (state=initialState, action) => {
                      switch(action.type){
                    
                    case REGISTER_CLIENT:{
                        const { clientdata } = action.payload
                        const { name, email, password } = clientdata
                        return {...state, registeredclients:[...state.registeredclients, 
                            {id: state.registeredclients.length, name: name, email: email, password: password}]}
                    }

                    case ACTIVE_CLIENT:{
                        const {active_Client} = action.payload
                        return {...state, activeClient: [...state.activeClient, {name: active_Client}]}
                    }

                    default:{
                        return state
                    }
                    }
}

export default ClientReducer