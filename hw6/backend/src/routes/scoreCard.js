import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const ScoreCardRouter = Router();

const deleteDB = async (req, res) =>{
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    res.json({ message: "Database deleted" });
}

const addCard = async (req, res) =>{
    const newName = req.body.name;
    const newSubject = req.body.subject;
    const newScore = req.body.score;

    const cardExisted = await ScoreCard.findOne({ name: name, subject: subject });
    if(cardExisted){
        try{
            let newCard = await ScoreCard.updateOne(
                {name: newName, subject:newSubject},
                {$set: {score: newScore}}
            )
            res.json(
                {message: `Updating (${newName}, ${newSubject}, ${newScore})`,
                 card: newCard}
            )
        }catch(error){
            res.json({message: error});
        }
    }else{
        const newScoreCard = new ScoreCard({
            name: newName,
            subject: newSubject,
            score: newScore
        })
        try{
            let newCard = await newScoreCard.save();
            res.json(
                {message: `Adding (${newName}, ${newSubject}, ${newScore})`,
                 card: newCard}
            )
        }catch(error){
            res.json({message: error});
        }
    }
}

const queryCards = async (req, res) =>{
    const queryType = req.query.type;
    const queryString = req.query.queryString;
    let filteredCard;
    let message;

    if (queryType==='name'){
        const exist = await ScoreCard.findOne({name: queryString});
        filteredCard = await ScoreCard.find({ name: queryString }).catch(err => {console.log(err);});
        if(exist) {
            res.json({messages: filteredCard});
        }
        else {
            res.json({message: `Name (${queryString}) not found!`})
        }
    }else if (queryType==='subject'){
        const exist = await ScoreCard.findOne({subject: queryString});
        filteredCard = await ScoreCard.find({ subject: queryString }).catch(err => {console.log(err);});
        if(exist) {
            res.json({messages: filteredCard});
        }
        else {
            res.json({message: `Name (${queryString}) not found!`})
        }
    }
    
}

ScoreCardRouter.delete("/clear-db", deleteDB);
ScoreCardRouter.post("/create-card", addCard);
ScoreCardRouter.get("/query-cards", queryCards);

export default ScoreCardRouter;