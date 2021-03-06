import FirestoreService from '../../services/firestoreService';
import AsyncStorageService from '../../services/asyncStorageService';

export async function createProfileService(
	username: string,
	privatePin: string,
	publicPin: string,
): Promise<boolean> {
	try {
		//TODO: create user in firebase
		let doesProfileExist = await FirestoreService.findProfile(username);

		if (!doesProfileExist) {
			let saveProfile = await FirestoreService.setDocInCollection('profiles', {
				username,
				privatePin,
				publicPin,
				following: [],
			});
			if (saveProfile) {
				// add to async
				const res = await AsyncStorageService.addProfile({
					username,
					privatePin,
					publicPin,
				});
				if (res) return true;
			}
		}
		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
}
