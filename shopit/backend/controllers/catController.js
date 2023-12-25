const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");

function createCategories(categories, parentCategoryId = null) {

  const categoryList = [];
  let category;
  if (parentCategoryId == null) {
    category = categories.filter((cat) => cat.parentCategoryId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentCategoryId == parentCategoryId);
  }
  console.log('category',category)
  for (let cate of category) {
    console.log('cate',cate)
    categoryList.push({
      _id: cate._id,
      categoryName: cate.categoryName,
      slug: cate.slug,
      parentCategoryId: cate.parentCategoryId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.addCategory = (req, res) => {

  const categoryObj = {
    categoryName: req.body.categoryName,
    slug: `${slugify(req.body.categoryName)}-${shortid.generate()}`,
    createdBy: req.user._id,
  }
  if (req.file) {
    categoryObj.categoryImage=req.file.filename
  }
  if (req.body.parentCategoryId) {
    categoryObj.parentCategoryId = req.body.parentCategoryId;
  }



  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  
  Category.find({}).exec((error, categories) => {

    console.log('categories api',categories);

    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);

      console.log('categoryList api',categories);

      res.status(200).json({ categoryList });
    }
  });
};

exports.updateCategories = async (req, res) => {
 res.status(200).json({body:req.body})
  const { _id, categoryName, parentCategoryId, type } = req.body;
  const updatedCategories = [];
  if (categoryName instanceof Array) {
    for (let i = 0; i < categoryName.length; i++) {
      const category = {
        categoryName: categoryName[i],
        type: type[i],
      };
      if (parentCategoryId[i] !== "") {
        category.parentCategoryId = parentCategoryId[i];
      }
      
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i]  },
        category,
        { new: true }
      );
  
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      categoryName,
      type,
    };
    if (parentCategoryId !== "") {
      category.parentCategoryId = parentCategoryId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {

  const { ids } = req.body.payload;

  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i],
      createdBy: req.user._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};