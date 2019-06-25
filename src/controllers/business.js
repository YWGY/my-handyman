const Business = require('../models/business'); 
const Category = require('../models/category'); 

async function addBusiness(req, res){
    const {
        businessName, 
        ABN, 
        email, 
        phone, 
        streetAddress, 
        postcode, 
        state 
       } = req.body;
    
    // const existingBusiness = await Business.findById(businessid).exec();

    // if (existingBusiness){
    //     return res.status(400).json('Duplicate business id');
    // }

    const business = new Business({
        businessName, 
        ABN, 
        email, 
        phone, 
        streetAddress, 
        postcode, 
        state,  
    });
    await business.save();
    return res.json(business);
}

async function getAllBusinesses(req, res){
    const businesses = await Business.find().exec();
    return res.json(businesses);
}

async function getBusiness(req, res){
    const {businessid} = req.params; 

    const business = await Business.findById(businessid)
    // .populate('orders', 'customerName businessName')
    .populate('categories', 'name')
    .exec();
    
    if(!business){
        return res.status(404).json('business not found');
    }
    return res.json(business);
}

async function updateBusiness(req, res){
    const {businessid} = req.params;
    const {businessName, ABN, email, phone, streetAddress, postcode, state} = req.body;
    const newBusiness = await Business.findByIdAndUpdate(
        businessid,
        {businessName, ABN, email, phone, streetAddress, postcode, state},
        {new:true}
    ).exec();
    if (!newBusiness){
        return res.status(404).json('business not found');
    }
    return res.json(newBusiness);
}

async function deleteBusiness(req, res){
    const {businessid} = req.params;
    const business = await Business.findByIdAndDelete(businessid).exec();
    if (!business) {
        return res.status(404).json('business not found');
    }
    // await Business.updateMany(
    //     {businessid:{$in: business.categroies}},
    //     {$pull:{businesses:business.businessid}}//????如何加上多个表格？orders
    // ).exec();
    return res.sendStatus(200);
}

async function addCategory(req,res){
    const {businessid, categoryid} = req.params;
    const category = await Category.findById(categoryid).exec();
    const business = await Business.findById(businessid).exec();
    if(!business || !category){
        return res.status(404).json('category or business not found');
    }
    business.categroies.addToSet(category.categoryid);
    category.businesses.addToSet(business.businessid);
    await business.save();
    await category.save();
    return res.json(business);
}

async function deleteCategory(req, res){
    const { businessid, categoryid } = req.params;
  const business = await Business.findById(businessid).exec();
  const category = await Category.findById(categoryid).exec();
  
  if (!business || !category) {
    return res.status(404).json('category or busines not found');
  }
  
  const oldCount = business.categroies.length;
  business.categroies.pull(category.categoryid);
  
  if (business.categroies.length === oldCount) {
    return res.status(404).json('count does not exist');
  }
  
  business.categroies.pull(category.categoryid);
  category.businesses.pull(business.businessid);
  await business.save();
  await category.save();
  return res.json(business);
}

module.exports = {
    addBusiness,
    getAllBusinesses,
    getBusiness,
    updateBusiness,
    deleteBusiness,
    addCategory,
    deleteCategory
};
