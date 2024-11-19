import { useState } from "react";
import { categories } from "../../assets/basic_info";
import { IoCloudUploadOutline } from "react-icons/io5";
import { baseURL } from "../../assets/basic_info.js";
import axios from "axios";
import "./Add.css";
import { toast } from 'react-toastify';

export default function Add() {
  const [image, setImage] = useState();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  function onChangeHandler(e) {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    setProduct((preProduct) => ({ ...preProduct, [targetName]: targetValue }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    const productData = new FormData();
    productData.append("name", product.name);
    productData.append("description", product.description);
    productData.append("price", Number(product.price));
    productData.append("category", product.category);
    productData.append("image", image);
    const response = await axios.post(`${baseURL}/api/food/add`, productData);
    if(response.data.success){
        setProduct({
            name: "",
            description: "",
            price: "",
            category: "Salad",
          });
          setImage(false);
          toast.success(response.data.message)
    }else{
        toast.error(response.data.message)
    }
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {image ? (
              <img
                className="img-upload-icon"
                src={URL.createObjectURL(image)}
              />
            ) : (
              <IoCloudUploadOutline className="img-upload-icon" />
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={product.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <textarea
            name="description"
            rows="6"
            placeholder="Write Product Description Here..."
            onChange={onChangeHandler}
            value={product.description}
          ></textarea>
        </div>
        <div className="add-category-price ">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={product.category}
              name="category"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={product.price}
              type="Number"
              name="price"
              placeholder="$10"
              min="0"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}
