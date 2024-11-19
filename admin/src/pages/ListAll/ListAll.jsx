import { useEffect, useState } from 'react'
import './ListAll.css'
import axios from 'axios';
import { baseURL } from '../../assets/basic_info.js';
import { toast } from 'react-toastify';

export default function ListAll() {
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        const response = await axios.get(`${baseURL}/api/food/all`);
        console.log(response.data.data);
        if(response.data.success){
            setProducts( response.data.data);
        }else{
            toast.error("Error");
        }
    }

    useEffect(()=>{
        fetchProducts();
    }, [])

    async function removeFood(foodId){
        const response = await axios.post(`${baseURL}/api/food/remove`, {id:foodId});
        if(response.data.success){
            await fetchProducts();
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

    return (
        <div className="list add flex-col">
            <p>All Food List</p>
            <table className="list-table">
                <thead className="list-table-format table-title">
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='list-table-format'>
                    {products.map ( (product, index) => {
                        return (
                            <tr key={index} className='product-row'>
                                <td><img src={`${baseURL}/images/${product.image}`} alt="" /></td>
                                <td><p>{product.name}</p></td>
                                <td><p>{product.description}</p></td>
                                <td><p>{product.price}</p></td>
                                <td>
                                    <button>Edit</button>
                                    <button onClick = {()=> removeFood(product._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
