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


export const calculateDaysDifference = (startDate, endDate) => {
	const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
	const startTimestamp = new Date(startDate).getTime();
	const endTimestamp = new Date(endDate).getTime();
	const daysDifference = Math.round(Math.abs((startTimestamp - endTimestamp) / oneDay));
	return daysDifference;
  };

  // Function to calculate the total price based on days, delivery, deposit, and item price
  export const calculateTotalPrice = (days, deliveryCost, deposit, itemPrice) => {
	const totalWithoutDeposit = days * itemPrice + (deliveryCost || 0);
	const totalPrice = totalWithoutDeposit + (deposit || 0);
	return totalPrice;
  };
