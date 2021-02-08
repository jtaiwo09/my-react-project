import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import useTFClassify from '../utils/hooks/useTFClassify';
import { AnimatePresence, motion } from 'framer-motion';

function Image({image, index, handleRemove, show}) {
    const [isHovering, setisHovering] = useState(false);
    const [showPreview, setshowPreview] = useState(false);
    const {predict, predictions, setpredictions, isLoading} = useTFClassify();
    const imageRef = useRef();

    return (
        <div className='img img-rel'>
            <div
                onMouseEnter={()=>setisHovering(true)}
                onMouseLeave={()=>setisHovering(false)}
            >
                <div className='img-rel'>
                    {
                        (predictions.length > 0 || isLoading) && (
                                <small onClick={()=>{setpredictions([])}} className='result'>
                                    {isLoading && <span>Fetching result...</span>}
                                {
                                    predictions.map((prediction, index)=> (
                                        <div className='d-flex justify-content-between mx-2'>
                                            <span>{prediction.className}</span>
                                            <span>{Math.floor(prediction.probability *100)}%</span>
                                        </div>
                                    ))
                                }
                                </small>
                        )
                    }
                    <i
                        onClick={()=>predict(imageRef.current)}
                        className={`abs-search ${isHovering ? 'fas fa-search onEnter':'fas fa-times onLeave'}`}
                    ></i>
                    <i
                        onClick={()=>handleRemove(index)}
                        className={`abs ${isHovering ? 'fas fa-times onEnter':'fas fa-times onLeave'}`}
                    ></i>
                </div>
                <img crossOrigin='anonymous' ref={imageRef} src={image} width='200px' height='auto' onClick={()=>setshowPreview(true)}/>
            </div>
                {
                    showPreview && (
                        <section className='img-ab'>
                            <div className='bg-white' onClick={()=>setshowPreview(false)}>
                            <img src={image} width='350px' height='auto'/>
                            </div>
                        </section>
                    )
                }
        </div>
    )
}

Image.propTypes = {
    show: PropTypes.func,
    index: PropTypes.number,
    image: PropTypes.string,
    handleRemove: PropTypes.func
}
export default Image;
