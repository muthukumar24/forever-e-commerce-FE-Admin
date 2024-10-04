import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const ProductEditModal = ({ product, isOpen, onClose, fetchList, token }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const [category, setCategory] = useState(product?.category || 'Men');
  const [subCategory, setSubCategory] = useState(product?.subCategory || 'Topwear');
  const [sizes, setSizes] = useState(product?.sizes || []); // Product sizes as an array
  const [bestseller, setBestseller] = useState(product?.bestseller || false); // Bestseller checkbox

  // Multiple images
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(sizes)); // Append product sizes
      formData.append('bestseller', bestseller); // Append bestseller status

      // Add images if available
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.put(`https://forever-e-commerce-backend.onrender.com/api/product/update/${product._id}`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success('Product updated successfully');
        fetchList(); // Refresh the product list after update
        onClose(); // Close the modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating product');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-150">
            <h2 className="text-xl mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                className="border px-2 py-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
              <textarea
                className="border px-2 py-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
              />
              <input
                type="number"
                className="border px-2 py-1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
              <select
                className="border px-2 py-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
              <select
                className="border px-2 py-1"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>

              {/* Product Sizes */}
              <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                  <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                    <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                  </div>

                  <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                    <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                  </div>

                  <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                    <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                  </div>

                  <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                    <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                  </div>

                  <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                    <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                  </div>
                </div>
              </div>

              {/* File inputs for the four images */}
              <div className='flex gap-2'>
                <label htmlFor="image1">
                  <img className='w-20 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                  <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                </label>
                <label htmlFor="image2">
                  <img className='w-20 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                  <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                </label>
                <label htmlFor="image3">
                  <img className='w-20 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                  <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                </label>
                <label htmlFor="image4">
                  <img className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                  <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                </label>
              </div>

              {/* Bestseller checkbox */}
              <div className='flex gap-2 mt-2'>
                <input
                  onChange={() => setBestseller(prev => !prev)}
                  checked={bestseller}
                  type="checkbox"
                  id='bestseller'
                />
                <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
              </div>

              <button type="submit" className="bg-black text-white px-4 py-2 hover:bg-gray-800">Update Product</button>
              <button
                type="button"
                className="bg-red-700 text-white px-4 py-2 hover:bg-red-500"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductEditModal;


