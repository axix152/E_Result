const Category = require('../model/category.model')

// ***** adding category
exports.addCategory = async (req,res) =>{
    try{
        const { categoryName , totalSeats , parties} = req.body
        const category =  new Category({
            categoryName,
            parties,
            totalSeats,
        })

        await category.save()
        return res.status(201).json({msg:"Category added successfully", category})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}

// ****** ALL category
exports.allCategory = async (req,res) =>{
    try{
        const category =  await Category.find()
        if(!category){
            return res.status(404).json({error:'No data found'})
        }
        return res.status(200).json({msg:"All categoires Data",category})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}

// ****** UPDATE Category 
exports.updateCategory =  async (req,res) =>{
    try{
        // Extract data from the request parameters and body
        const categoryId = req.params.categoryId
        const updates = req.body;

        // find Category by Id 
        const category =  await Category.findById(categoryId)

        if(!category){
            return res.status(404).json({ error: 'Category not found' });
        }
        // Update seats for each party in the array
        updates.forEach(({ partyId, newSeats }) => {
        const partyToUpdate = category.parties.find(party => party._id.toString() === partyId);
  
        if (partyToUpdate) {
          partyToUpdate.seats = newSeats;
        }
      });

        // Save the updated category to the database
        const updatedCategory = await category.save();

        // Respond with the updated Category
        return res.status(200).json({msg:"Category seats updated",updatedCategory})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}