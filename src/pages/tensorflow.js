import React, { useEffect, useRef, useState } from 'react';
import useTFClassify from '../utils/hooks/useTFClassify';

export default function Tensorflow() {
    const imageRef = useRef();
    const {predict, predictions, isLoading} = useTFClassify();
    
    return (
        <div className='rel'>
            <div class='tensorflow'>
                <h3>Tensorflow Example</h3>
                <div className=''>
                    <img crossOrigin='anonymous' ref={imageRef} width='400px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgay25OFqq2HzjJbyHODWl9bnMSfzoP_3lQ&usqp=CAU' alt='' />
                </div>
                {
                    predictions.length > 0 && (
                        <div>
                            {
                            predictions.map((prediction, index)=> (
                                <div className='d-flex justify-content-between mx-2'>
                                    <span>{prediction.className}</span>
                                    <span>{Math.floor(prediction.probability *100)}%</span>
                                </div>
                            ))
                            }
                        </div>
                    )
                }
                <button className='btn btn-dark btn-block mt-3' onClick={()=>predict(imageRef.current)}>
                    {
                        isLoading ? '⌛' : 'Predict'
                    }
                </button>
            </div>
        </div>
    )
}
