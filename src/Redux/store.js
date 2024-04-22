import { createStore } from 'redux'
import ClientReducer from './ClientsReducer'

const store = createStore(ClientReducer)

export default store