import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ProductEditModal from '../components/ProductEditModal';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product); // Set the product to edit
    setIsModalOpen(true); // Open the modal
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {list.map((item, index) => (
          <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <div className="flex justify-center gap-3">
              <h4 onClick={() => removeProduct(item._id)} className="cursor-pointer text-lg"><MdDelete className="hover:text-black" /></h4>
              <h4 onClick={() => editProduct(item)} className="cursor-pointer text-lg"><FaEdit className="hover:text-black" /></h4>
            </div>
          </div>
        ))}
      </div>

      {/* Product Edit Modal */}
      {isModalOpen && (
        <ProductEditModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fetchList={fetchList}
          token={token}
        />
      )}
    </>
  );
};

export default List;
