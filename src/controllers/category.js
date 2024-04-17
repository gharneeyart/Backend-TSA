import slugify from "slugify";
import Category from "../models/category.js";

export const createCategory = async (req, res)=>{
    try{
        const { name } = req.body
        if(!name){
            return res.status(400).json("Name is required")
        }

        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(401).json({success:false, message:"Category already exists"})
        }

        const category = await new Category({name, slug: slugify(name)}).save()
        res.status(201).json({success:true, message:"Category created successfully", category})

    } catch(err){
        console.log(err);
        res.status(500).json({success:false, message:"Internal Server Error", errMsg: err.message});
    }
}

// function to get all the categories
export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json({success: true, message: "Categories fetched successfully", categories})
    } catch (err) {
       res.status(500).json({success: false, message: err.message}) 
    }
}

// function to get a product by Id
export const getOneCategory = async (req, res) => {
    try {
        const { categoryId } = req.params

        const category = await Category.findById({_id: categoryId})
        if (!category) {
            return res.status(404).json({success: false, message: "Category not found"})
        }
        res.json({success: true, message: "Category retrieved successfully", category})
    } catch (err) {
        res.status(500).json({success: false, message: err.message}) 
    }
}
// function to get a category by slug - it a very good for SEO purposes
export const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params

        const category = await Category.findOne({slug: slug})
        if (!category) {
            return res.status(404).json({success: false, message: "Category not found"})
        }
        res.json({success: true, message: "Category retrieved successfully", category})
    } catch (err) {
        res.status(500).json({success: false, message: err.message}) 
    }
}
// function to update a category
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params
        
        // find the categoryId from the database
        const category = await Category.findById({_id: categoryId})
        if (!category) {
            return res.status(404).json({success: false, message: "Category not found"})
        }

        if(name){
            const slugName = slugify(name)
            category.slug = slugify(name) || category.slug
        }
        // update the category fields
        category.name = name || category.name;
        

        // save the updated categoty to the database
        const updatedCategory = await category.save();

        res.json({success: true, message: "Category Updated successfully", updatedCategory})
    } catch (err) {
        res.status(500).json({success: false, message: err.message}) 
    }
}
// function to get a category
export const deleteCategory = async (req, res) => {
    
    try {
        const {categoryId} = req.params;
        // Find product by ID and delete
        const category = await Category.findById({_id: categoryId});
        if (!category) {
          return res.status(404).json({success: false, message: 'Category not found' });
        }
        
        const deletedCategory = await category.deleteOne();
        res.json({success: true, message: 'Product deleted successfully', deletedCategory });
      } catch (err) {
        res.status(500).json({success: false,  message: err.message });
      }
}


 
