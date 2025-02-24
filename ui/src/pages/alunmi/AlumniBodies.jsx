import './AlumniBodies.css'
import logo from '../../image/logo.png'
import { AllNews } from '../../components/news/AllNews'
export const AlumniBodies = () => {
  return (
    <div>
        <div className="conainer">
            <div className="alumni-banner">
                <div className="banner-image">
                    <h4>Provision of 50 Tables and chairs for Students</h4>
                </div>
            </div>

            <div className="alumni-body">
            <img src={logo} alt="School Logo" />
            <div>
                <h2>Atunrashe Alumni Body</h2>
            </div>
            </div>
        </div>
        <h4>All News</h4>
        <AllNews/>
    </div>
  )
}
