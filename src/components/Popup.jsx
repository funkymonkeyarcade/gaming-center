'use client'

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Popup() {
    const [popupData, setPopupData] = useState(null);
    const [popup, setPopup] = useState(true)

  const togglePopup = () => {
    setPopup(!popup)
  }

  useEffect(() => {
    // Fetch data from Firestore when the component mounts
    const fetchData = async () => {
      const db = getFirestore(); // Initialize Firestore
      const popupRef = doc(db, 'Popup', 'Popup');

      try {
        const docSnap = await getDoc(popupRef);
        if (docSnap.exists()) {
          // If the document exists, set the state with the document data
          setPopupData(docSnap.data());
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={` ${popup? 'grid':'hidden'} fixed z-50 top-0 w-screen h-screen place-items-center bg-primary bg-opacity-90`}>
        <div className='relative flex flex-col sm:grid sm:grid-cols-[2fr_3fr] sm:gap-4 w-11/12 sm:w-8/12 sm:h-[80vh] sm:h-[60vh] bg-black rounded-lg shadow-lg overflow-hidden'>
            <div onClick={togglePopup} className='absolute text-accent text-xl font-LogikBold top-2 right-2 cursor-pointer'>x</div>

            <img src={popupData?.image || ''} alt="" className='hidden sm:block bg-primary sm:w-full sm:h-full' />

            <div className='flex flex-col sm:h-[60vh] justify-center gap-4 py-12 px-6'>
                <h1 className='text-white text-xl font-LogikBold'>{popupData?.title || 'Default Title'}</h1>
                <p className='text-white text-lg font-LogikWide text-left'>{popupData?.text || 'Default Text'}</p>
                <p className='text-accent text-lg font-LogikWide text-left'>{popupData?.promo || 'Default Text'}</p>
            </div>
        </div>
    </div>
  )
}
