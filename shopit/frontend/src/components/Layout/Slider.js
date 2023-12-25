import React ,{ Fragment ,useEffect ,useState} from 'react'
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux";
import {
    getSlider
} from "../../actions/sliderActions";
import { DELETE_SLIDER_RESET } from "../../constants/sliderConstants";
import '../../styles/slider.css'
import { useAlert } from 'react-alert';

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error,loading, slider } = useSelector((state) => state.slider);

    const handleClick = (direction) => {
  
      if(direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2) //2 is last image
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0) // 0 is first image
      }
  
    }

    useEffect(() => {
        if (error) {
          alert.error(error);
        }
    
        if (slider) {
          dispatch(getSlider());
        }
   
      }, [dispatch, error,slider]);

  return (
    <Fragment>
         <div className='s-container'>
      <div className="s-arrow left" onClick={() => handleClick("left")}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
      </div>
      <div className="wrapper" slideIndex={slideIndex} style={{transform: `translateX(${slideIndex * -100}vw)`}}>
          {slider && (slider.map((item) => (
            <div className="slide" key={item._id}>
            <div className="img-container">
              <img src={item.image} className='s-img' alt="" />
            </div>
          </div>
          )))}
      </div>
      <div className="s-arrow right" onClick={() => handleClick("right")}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
      </div>
    </div>
    </Fragment>
  )
}

export default Slider