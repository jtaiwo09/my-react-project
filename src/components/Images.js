import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import useDebounce from '../utils/hooks/useDebounce';
import useFetchImage from '../utils/hooks/useFetchImage';
import Image from './Image';
import Loading from './Loading';

export default function Images() {
    const [searchTerm, setsearchTerm] = useState('');
    const [page, setpage] = useState(1)
    const [images, setimages, isLoading, error] = useFetchImage(searchTerm, page);
    const [showPreview, setshowPreview] = useState(false);

    function handleRemove(index){
        setimages(images.filter((img, i)=> i !== index))
    }
    const debounce = useDebounce();
    function handleChange(e){
        let search = e.target.value;
        debounce(()=> {setsearchTerm(search)});
    }

    return (
            <section>
                {error.length === 0 && 
                    <div className="my-2 p-2">
                        <input onChange={handleChange} type="text" className="form-control" placeholder="Search Images Here" />
                    </div>
                }
                {
                    <div className='center-div'>
                        <p className='load-error'>{error[0]}</p>
                    </div>
                }
                <div>
                    <AnimateSharedLayout type='switch'>
                    <InfiniteScroll
                    dataLength={images.length}
                    next={()=>setpage(page + 1)}
                    hasMore={true}
                    className='img-container'
                >
                    {images.map((img, index)=>(
                            <motion.section 
                                key={index}
                                layoutId={img.urls.regular}
                            >
                                <Image
                                    show={()=>setshowPreview(img.urls.regular)}
                                    image={img.urls.regular}
                                    index={index}
                                    handleRemove={handleRemove}
                                />
                            </motion.section>
                    ))}
                </InfiniteScroll>

                <AnimatePresence>
                    {
                        showPreview && (
                            <motion.section layoutId={showPreview} exit={{opacity:0, rotate:360, transition:{duration:1}}} className='img-abs' onClick={()=>setshowPreview(false)}>
                                <div>
                                <img src={showPreview} width='400px' height='auto'/>
                                </div>
                            </motion.section>
                        )
                    }
                    </AnimatePresence>
                </AnimateSharedLayout>
                </div>
                {isLoading && <Loading />}
            </section>
    )
    
}
