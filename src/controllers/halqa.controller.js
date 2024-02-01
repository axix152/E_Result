// ******* Halqa Controller

const Halqa = require('../model/halqa.model')

// ***** ADD halqa
exports.addHalqa = async (req,res) =>{
    try{
        const { categoryName, halqaNo, district, candidates } = req.body;
        // Validate input data if needed

        const halqa = new Halqa({
            categoryName,
            halqaNo,
            district,
            candidates,
        });

        await halqa.save();

        res.status(201).json({ message: 'Halqa added successfully', halqa });
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}

// ***** GET all halqa
exports.allHalqa =  async (req,res) => {
    try{
        // get all halqa
        const halqa =  await Halqa.find()
        if(!halqa){
            return res.status(404).json({error:'No Data found for halqa'})
        }

        return res.status(200).json({halqa})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}

// ****** Update candidate votes
exports.updateCandidateVote =  async (req,res) =>{
    try{
        const { halqaId, candidateId, newVote } = req.body;

        const halqa = await Halqa.findById(halqaId)
        if (!halqa) {
            return res.status(404).json({ error: 'Halqa not found' });
        }

        const candidate = halqa.candidates.id(candidateId);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found in the specified Halqa' });
        }
        candidate.vote = newVote;
        await halqa.save();

       return res.json({ message: 'Candidate votes updated successfully', halqa });
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}