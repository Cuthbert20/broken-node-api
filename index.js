const express = require("express");
const app = express();
const PORT = 4110
const gamesCtrl = require("./gamesCtrl")


app.use(express.json())

//THIS IS REQUEST LEVEL MIDDLEWARE FOR THE APP.POST TO ENSURE THAT WE DON'T ADD MOBILE GAMES TO THE GAMES LIBRARY
const noMobileMiddleware = (req,res,next) =>{
    if(req.body.console === "mobile" || req.body.console === "phone"){
        res.status(400).send("Mobile is not a console! You casual!")
    }else{

    next()
    }
}

//GET ALL GAMES FROM THE GAMES ARRAY
app.get('/api/games',gamesCtrl.getAllGames)

//GET A GAME BY ITS ID
app.get('/api/games/:id',gamesCtrl.getGameById)

//ADD A GAME TO THE GAME LIBRARY
app.post('/api/games', noMobileMiddleware, gamesCtrl.addGame)

//CHANGE A GAME'S INFORMATION
app.put('/api/games/:id',gamesCtrl.updateGame)

//DELETE A GAME BY ITS ID
app.delete('/api/games/:id',gamesCtrl.deleteGame)


app.listen( PORT, () => console.log(`${PORT} games ported.`))

