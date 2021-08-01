import FirestoreService from '../../services/firestoreService';
import AsyncStorageService from '../../services/asyncStorageService';

export async function loginProfileService(
	username: string,
	privatePin: string,
): Promise<boolean> {
	try {
		//TODO: create user in firebase
		let doesProfileExist = await FirestoreService.findProfile(username);

		if (doesProfileExist) {
			if (doesProfileExist.data.privatePin === privatePin) {
				// add to async
				const res = await AsyncStorageService.addProfile({
					username,
					privatePin,
					publicPin: doesProfileExist.data.publicPin,
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
