const Business = require('../models/business'); 
const Category = require('../models/category'); 

async function addCategory(req, res){
    const {categoryid} = req.params;
    const {name, description} = req.body;
    
    const existingCategory = await Category.findById(categoryid).exec();

    if (existingCategory){
        return res.status(400).json('Duplicate category id');
    }

    const category = new Category({
        name, description, businesses
    });
    await category.save();
    return res.json(category);
}

async function getAllCategories(req, res){
    const categroies = await Category.find().exec();
    return res.json(categroies);
}

async function getCategory(req, res){
    const {categoryid} = req.params; 
    const category = await Category.findById(categoryid)
    .populate('business', 'name description businesses')
    .exec();
    
    if(!category){
        return res.status(404).json('customer not found');
    }
    return res.json(category);
}

async function updateCategory(req, res){
    const {categoryid} = req.params;
    const {name, description, businesses} = req.body;
    const newCategory = await Category.findByIdAndUpdate(
        categoryid,
        {name, description, businesses},
        {new:true}
    ).exec();
    if (!newCategory){
        return res.status(404).json('business not found');
    }
    return res.json(newCategory);
}

async function deleteCategory(req, res){
    const {categoryid} = req.params;
    const category = await Category.findOneAndDelete(categoryid).exec();
    if (!category) {
        return res.status(404).json('category not found');
    }
    await Category.updateMany(
        {categoryid:{$in: category._businesses}},
        {$pull:{categroies: category.categoryid}}
    ).exec();
    return res.sendStatus(200);
}

async function addBusiness(req,res){
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
    return res.json(category);
}

async function deleteBusiness(req, res){
    const { businessid, categoryid } = req.params;
  const business = await Business.findById(businessid).exec();
  const category = await Category.findById(categoryid).exec();
  
  if (!business || !category) {
    return res.status(404).json('category or busines not found');
  }
  
  const oldCount = category.businesses.length;
  category.businesses.pull(business.businessid);
  if (category.businesses.length === oldCount) {
    return res.status(404).json('count does not exist');
  }
  
  business.categroies.pull(category.categoryid);
  category.businesses.pull(business.businessid);
  await business.save();
  await category.save();
  return res.json(category);
}

module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    deleteBusiness,
    addBusiness,
   
};
