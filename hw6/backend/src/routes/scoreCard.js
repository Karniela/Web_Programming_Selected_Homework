import { Router } from "express";
import ScoreCard from "../models/ScoreCard.js";
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

    const cardExisted = await ScoreCard.findOne({ name: newName, subject: newSubject });
    // If the card existed, update the card.
    // If not, add the card.
    if(cardExisted){
        try{
            let newCard = await ScoreCard.updateOne(
                {name: newName, subject:newSubject},
                {$set: {score: newScore}}
            )
            res.json({message: `Updating (${newName}, ${newSubject}, ${newScore})`, card: newCard})
            console.log("update card");
        }catch(error){res.json({message: error});}
    }else{
        const newScoreCard = new ScoreCard({
            name: newName,
            subject: newSubject,
            score: newScore
        })
        try{
            let newCard = await newScoreCard.save();
            res.json({message: `Adding (${newName}, ${newSubject}, ${newScore})`, card: newCard})
            console.log("add card");
        }catch(error){res.json({message: error});}
    }
}

const queryCards = async (req, res) => {
    //Show the card once queried.
    const queryType = req.query.type;
    const queryString = req.query.queryString;
    let filteredCards = [];
    let messages = [];
    let existed = false;
    if (queryType === "name") {
        existed = await ScoreCard.findOne({name: queryString});
        filteredCards = await ScoreCard.find({ name: queryString }).catch(err => {console.log(err);});
        if (existed) {
            console.log(filteredCards);
            filteredCards.forEach(card => messages.push(`Found card with ${queryType}: (${card.name}, ${card.subject}, ${card.score})`));
            console.log(messages);
            res.send({ messages: messages, cards: filteredCards});
        } else {
            res.send({ message: `${queryType} (${queryString}) not found!` });
        }
    } 
    
    if (queryType === "subject") {
        existed = await ScoreCard.findOne({subject: queryString});
        filteredCards = await ScoreCard.find({ subject: queryString }).catch(err => {console.log(err);});
        if (existed) {
            console.log(filteredCards);
            filteredCards.forEach(card => messages.push(`Found card with ${queryType}: (${card.name}, ${card.subject}, ${card.score})`));
            console.log(messages);
            res.send({ messages: messages, cards: filteredCards});
        } else {
            res.send({ message: `${queryType} (${queryString}) not found!` });
        }
    }

    
    
}


ScoreCardRouter.delete("/cards", deleteDB);
ScoreCardRouter.post("/card", addCard);
ScoreCardRouter.get("/cards", queryCards);

export default ScoreCardRouter;