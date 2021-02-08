import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs'

export default function useTFClassify() {
    const [isLoading, setisLoading] = useState(false);
    const [predictions, setpredictions] = useState([])
    
    function predict(img){
        // const img = imageRef.current;
        setisLoading(true);
        mobilenet.load().then(model => {
            // Classify the image.
            model.classify(img).then(predictions => {
              setpredictions(predictions)
              setisLoading(false);
            });
          });
    }

    return {predict, predictions, setpredictions, isLoading};
}
