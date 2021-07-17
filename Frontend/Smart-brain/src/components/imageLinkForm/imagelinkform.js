import React from 'react';
import './imagelinkform.css';

const ImageLinkForm=({onInputChange,OnSubmit})=>{
    return(
        <div>
            <p className="Center f3">

                {'This Magic brain will detect faces in your pictures , give it a try.'}

            </p>
            <div className='Center'>

                <div className='form pa4 br3 shadow-5'>

                <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} />

                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={OnSubmit}>Detect</button>

                </div>
                
            </div>
        </div>
    )
}

export default ImageLinkForm;