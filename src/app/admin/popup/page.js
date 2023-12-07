"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, query, getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useState,useEffect } from "react"


async function uploadPopup({ image, title, text, promo }) {
    const storage = getStorage();
    const storageRef = ref(storage, `popup.png`);
  
    const snapshot = await uploadBytes(storageRef, image);
    const imageLink = await getDownloadURL(snapshot.ref);
  
    const db = getFirestore(app);
    const popupRef = doc(db, "Popup", 'Popup');
  
    await setDoc(popupRef, {
      image: imageLink,
      title,
      text,
      promo,
    }, { merge: true });
  }


export default function UpdatePopup() {
	const [image, setImage] = useState()
	const [title, setTitle] = useState()
	const [text, setText] = useState()
    const [promo, setPromo] = useState()
	const [error, setError] = useState()
	const [success, setSuccess] = useState()

	const handleImage = (e) => {
		setImage(e.target.files[0])
	}

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}

	const handleText = (e) => {
		setText(e.target.value)
	}

    const handlePromo = (e) => {
		setPromo(e.target.value)
	}

    function showSuccess() {
		setSuccess(true)

		setTimeout(() => {
			setSuccess(false)
		}, 4000);
	}

    function validatePopupData() {
		if (!image || !title || !text) {
		  return false; // Return false if any field is missing
		}

		// Add additional validation conditions if needed
		// For example, you could check if the title meets a certain length requirement

		return true; // All conditions are met, data is valid
	  }

      const onPublish = async () => {
		setError('')

		if(!validatePopupData()) {
			setError('Please fill all fields')
			return
		}

		const content = {
			image,
			title,
			text: text.replace(/\n/g, '\\n'),
            promo,
		}

		uploadPopup(content).then(() => {
			showSuccess()
			setText('')
			setTitle('')
			setImage('')
            setPromo('')
		}).catch(err => {
			setError(err)
		})
	}


    return (
        <>
            <div className="flex flex-col gap-8 py-8 px-8">
                <h1 className="font-LogikBold text-4xl">POPUP</h1>
                <input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
                <input onChange={handleTitle} value={title} type="text" name="title" placeholder="Enter popup title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
                <textarea onChange={handleText} value={text} placeholder="Write text" className="h-60 px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
                <textarea onChange={handlePromo} value={promo} placeholder="Write promo" className="h-8 px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
                <button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>

                {success &&
                    <div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
                        <h1 className="text-2xl text-green-600 font-LogikBold">Popup uploaded successfully</h1>
                    </div>
                }

                {error &&
                    <div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
                        <h1 className="text-2xl text-red-600 font-LogikBold">{error}</h1>
                    </div>
                }
            </div>
        </>
    )
}