const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    // Definir URL base para todas as rotas 
    // const router = express.Router()
    // server.use('/api', router)

    // // Rotas de Ciclo de Pagamento 
    // const BillingCycle = require('../api/billingCycle/billingCycleService')
    // BillingCycle.register(router, '/billingCycles')

    // Novo padrão para Authorization

    /*
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)
    
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')
    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    
    const AuthService = require('../api/user/AuthService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}