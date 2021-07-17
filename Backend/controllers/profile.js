const handleRequest=(req,res,id,db)=>{
    
    db.select('*').from('users').where({id}).then(user=> {
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json("no profile found");
        }
    }).catch(err=> res.status(400).json("ERROR"));

}

module.exports={
    handleRequest:handleRequest
}