import { isWithinInterval } from "date-fns";

export async function uploadRental({item, amount, price, name, fromDate, toDate, total, itemId}) {
	const rentalId = uniqid()

	const db = getFirestore(app);
	return await setDoc(doc(db, "Rentals", rentalId), {
		item,
		itemId,
		amount,
		price,
		name,
		rentalDate: new(Date),
		fromDate,
		toDate,
		total,
		verified: false,
		rentalId
	}).then(() => rentalId)
}


function isWithinRange(date, range) {
	return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date, ranges) {
	return ranges.some(range => isWithinRange(date, range));
}
