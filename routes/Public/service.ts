import FirestoreService from '../../services/firestoreService';
import AsyncStorageService from '../../services/asyncStorageService';

interface profileProps {
	username: string;
}

export async function checkProfileService(): Promise<profileProps | null> {
	try {
		//TODO: get user,pin from async
		const localRes = await AsyncStorageService.getProfile();

		if (localRes) {
			//TODO: check firestore
			const remoteRes = await FirestoreService.findProfile(localRes.username);
			if (remoteRes) {
				return localRes;
			}
		}

		return null;
	} catch (e) {
		return null;
	}
}
