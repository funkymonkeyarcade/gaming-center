"use client"
import { useEffect } from "react"
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "./firebase";

export function FirebaseAnalytics() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const analytics = getAnalytics(app);
			logEvent(analytics, 'notification_received');
		}
	}, [])

	return null
}
