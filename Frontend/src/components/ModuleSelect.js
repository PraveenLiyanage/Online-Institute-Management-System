import { Link  } from "react-router-dom";
import bgImg from '../assets/img1.jpg';
import bgImg1 from '../assets/logo.png';

const ModuleSelect  = () => {

    return (
        <header>
            <div className = "container">
                <Link to = "/">
                    <h1>Welcome to Module Page</h1>
                    <img src={bgImg1} alt=""/>
                </Link>
                    <img src={bgImg} alt=""/>
            </div>
        </header>
    )
}

export default ModuleSelect