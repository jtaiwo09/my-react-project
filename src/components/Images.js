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
                    error.length > 0 ? (
                        <div className='center-log'>
                            <p className='load-error'>{error}</p>
                        </div>
                    ) : null
                }
                    <AnimateSharedLayout>
                    <InfiniteScroll
                    dataLength={images.length}
                    next={()=>setpage(page + 1)}
                    hasMore={true}
                    className='img-container'
                >
                    {images.map((img, index)=>(
                            <motion.section 
                                key={index}
                            >
                                <Image
                                    image={img.urls.regular}
                                    index={index}
                                    handleRemove={handleRemove}
                                />
                            </motion.section>
                    ))}
                </InfiniteScroll>
                </AnimateSharedLayout>
                {isLoading && <Loading />}
            </section>
    )
    
}
