import {assets} from "../../src/assets/assets.js"
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
        <p>For Better Experience Download <br/> FoodGo App</p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="Goolgle Play" />
            <img src={assets.app_store} alt="Apple Store" />
        </div>
    </div>
  )
}

export default AppDownload