const Clarifai=require('clarifai');

const app=new Clarifai.App({
    apiKey:'2e1811d4019a4427abefe32ee66db76d'
  });


  const handleApiCall = (req, res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  }

const handleRequest=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id).increment('entries',1).returning('entries').then(entries=>{
        res.json(entries);
    }).catch(err=> res.status(400).json("unable to get entries"));

}

module.exports={
    handleRequest:handleRequest,
    handleApiCall:handleApiCall
}