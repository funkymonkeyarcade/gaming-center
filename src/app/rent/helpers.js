export async function uploadRental({title, amount, price, name, rentalDate, pickupDate, verified, itemId}) {
	const rentalId = uniqid()

	const db = getFirestore(app);
	return await setDoc(doc(db, "Rentals", rentalId), {
		title,
		itemId,
		price,
		name,
		rentalDate,
		pickupDate,
		verified,
		rentalId
	}).then(() => rentalId)
}
