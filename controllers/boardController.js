const Board=require("../models/Board");

exports.createBoard=async (req,res)=>
{
    try{
        const title=req.body.title;
        const owner=req.body.owner;
        const elements=req.body.elements;
        const newBoard=new Board(
            {
                title:title,
                owner:owner,
                elements:elements|| []
            }
        )
        const savedBoard=await newBoard.save();

        res.status(201).json(savedBoard)
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}
exports.getBoard=async (req,res)=>
{
    try{
        const url=req.params.id;
        const getb=await Board.findById(url);
    
        if(getb==null) return res.status(404).json({message:"url not found"});

        res.status(200).json(getb);
    }
    catch(error)
    {
        console.log(error);
        if(error.kind==='ObjectId')
        {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({message:"Server Error"});
    }
}