const games = require("./games")
 

module.exports = {
    // app.get('/api/users')
    getAllGames: (req,res) => {
        if(req.query.console){
            const gameFilter = games.filter( val => {
                return val.console.toLowerCase() === req.query.console.toLowerCase()
            })
            res.status(200).send(gameFilter)
        }else{
            res.status(200).send(games)
        }
    },
    // app.get('/api/users/:id')
    getGameById: (req,res) => {
        const { id } = req.params
        const filteredGame = games.filter(val => {
            return val.id === +id
        })
        res.status(200).send(filteredGame)
    },
    // app.post('/api/users/')
    addGame: (req,res) => {
        const newGame = {...req.body, id: games.length}
        games.push(newGame)
        res.status(201).send(games)
    },
    // app.put('/api/users/:id')
    updateGame: (req,res) =>{
        const { id } = req.params
        console.log(id)
        //using spread operator to make a copy of req.body
        const editedGame = {...req.body}
        console.log(editedGame)
        const index = games.findIndex( val => val.id === +id)
        //using spread operator to make a copy of games at [index] and then adding the editedGame info to games[index]
        games[index] = {...games[index],...editedGame}
        console.log(games[index])
        res.status(200).send(games)
    },
    deleteGame: (req,res) =>{
        const { id } = req.params
        const index = games.findIndex( val => val.id === +id)
        games.splice(index, 1)
        res.status(200).send(games)
    }
}