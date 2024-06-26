// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import exportSchema from '../models/info'
import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants

    const allInfo = await Info.find();
    const allInfo_len = allInfo.length;

    try{
    const price = await exportSchema.find({priceFilter, mealFilter, typeFilter, sortBy});
    const meal = await exportSchema.find({mealFilter});
    const type = await exportSchema.find({typeFilter});
    const sort = await exportSchema.find({sortBy});
    
    res.status(200).send({ message: 'success', contents:allInfo })
    }
    
    catch(err){
        res.status(403).send({ message: 'error', contents:[]})
        console.log("Something error:" + err)
        
    }
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    try{
    const resInfo = await Info.find({id:id});
    console.log(resInfo);
    res.status(200).send({ message: 'success', contents:resInfo })
    }

    catch(err){
    res.status(403).send({ message: 'error', contents:[]})
    console.log("Something error:" + err)
    
    }




}