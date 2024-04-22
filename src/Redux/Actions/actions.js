export const REGISTER_CLIENT = 'REGISTER_CLIENT'
export const ACTIVE_CLIENT = 'ACTIVE_CLIENT'

export const registerClient = (clientdata) => ({
    type: 'REGISTER_CLIENT', payload: {clientdata}
})

export const activeClient = (active_Client) => ({
    type: 'ACTIVE_CLIENT', payload: {active_Client}
})