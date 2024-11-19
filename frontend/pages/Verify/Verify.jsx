import { useNavigate, useSearchParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import './Verify.css'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';



export default function Verify() {
  const {url} = useContext(StoreContext);
  const [ searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  console.log(success, orderId, url )

  async function verifyPayment(){
    const response = await axios.post(url + "/api/order/verifyPayment", {success, orderId})
    if(response.data.success){
      navigate("/myorders")
    }else{
      navigate("/")
    }
  }

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div>
      <Navbar />
        <div className="verify">
          <div className="spin">
          </div>
        </div>
      <Footer />
    </div>
  )
}
