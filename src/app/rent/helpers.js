import { app } from "@/utils/firebase";
import { isWithinInterval } from "date-fns";
import { getFirestore,setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import uniqid from 'uniqid';
import emailjs from "@emailjs/browser"


function datesOverlap(start1, end1, start2, end2) {
	const startDate1 = new Date(start1);
	const endDate1 = new Date(end1);
	const startDate2 = new Date(start2);
	const endDate2 = new Date(end2);

	// Check for overlap
	return (
	  (startDate1 <= endDate2 && endDate1 >= startDate2) ||
	  (startDate2 <= endDate1 && endDate2 >= startDate1)
	);
  }


export async function uploadRental({item, type, itemId, name, phone, dates, total}) {
	const rentalId = uniqid()

	const db = getFirestore(app);

	const itemDoc = doc(db, type, itemId);
	const itemSnapshot = await getDoc(itemDoc);
	const itemData = itemSnapshot.data();

	const bookings = itemData.bookings || [];

	for (const booking of bookings) {
		if (datesOverlap(booking.from, booking.to, dates[0], dates[1])) {
		  // Selected dates overlap with an existing booking
		  throw("Selected dates are not available.")
		}
	  }

	bookings.push({ from: dates[0], to: dates[1] })

	await updateDoc(itemDoc, { bookings });


	return await setDoc(doc(db, "Rentals", rentalId), {
		item,
		itemId,
		name,
		type,
		phone,
		dates,
		total,
		verified: false,
		rentalId
	}).then(() => {
		let template = {
			user_name: name,
			message: `New rental by ${name} with ID: ${rentalId}`
		}

		emailjs.send(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_RENTAL_TEMPLATE_ID, template, process.env.NEXT_PUBLIC_PUBLIC_KEY).catch(err => {
			throw(err)
		})

		return rentalId
	})
}


function isWithinRange(date, range) {
	const startDate = range[0].toDate(); // Convert Firestore Timestamp to JavaScript Date
	const endDate = (range[1] && range[1].toDate()) || range[0].toDate(); // Convert Firestore Timestamp to JavaScript Date
	return isWithinInterval(date, { start: startDate, end: endDate });
}

export function isWithinRanges(date, ranges) {
	return ranges.some(range => isWithinRange(date, range));
}
