import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category, searchFoodName}) => {
    const {food_list} = useContext(StoreContext)

    return (
    <div className="food-display" id='food-dosplay'>
        <div className='title'>Top dishes near you</div>
        <div className="food-display-list">
            {food_list.map((item, index) =>{
                return ((category === item.category || category ==="All") 
                    && <FoodItem key ={index}
                        id ={item._id} 
                        name={item.name} 
                        description={item.description} 
                        price={item.price} 
                        image={item.image} />)
            })}
        </div>
    </div>
  )
}

export default FoodDisplay