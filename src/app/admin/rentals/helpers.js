import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, query, collection, querySnapshot, getDocs, doc } from "firebase/firestore";
import uniqid from 'uniqid';
import { app } from "@/utils/firebase";

export async function uploadItem({image, title, amount, type, deposit,delivery, price, bookings}) {
	const storage = getStorage()
	const storageRef = ref(storage, `${title}.png`)

	const snapshot = await uploadBytes(storageRef, image);
	const imageLink = await getDownloadURL(snapshot.ref);

	const itemId = uniqid()



	const db = getFirestore(app);
	await setDoc(doc(db, type, itemId), {
		image: imageLink,
		title,
		price,
		itemId,
		amount,
		type,
		deposit,
		delivery,
		bookings,
	})
}
