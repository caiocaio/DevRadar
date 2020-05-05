const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const {findConnections, sendMessage} = require('../websocket')

//o controller geralmente tem 5 funções: index, show, store, update, destroy

module.exports = {
    async index (request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store (request, response) {   //request e response estão imbutidos no método da função, servem para: request é o pedido do frontend, e o response é a resposta do backend
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            //ele espera a resposta da api do github por causa do async e do await

            const { name = login, avatar_url, bio } = apiResponse.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //filtrar as conexoes que estao ha no max 10km de distancia
            //e que o novo dev tenha pelo menos uma das tecnologias filtradas 

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray, 
            )
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev)

        }



        return response.json(dev)

    },

}
