import FirestoreService from '../../services/firestoreService';
import AsyncStorageService from '../../services/asyncStorageService';

export async function followProfileService(
	username: string,
	publicPin: string,
): Promise<boolean> {
	try {
		//TODO: create user in firebase
		let doesProfileExist = await FirestoreService.findProfile(username);

		if (doesProfileExist) {
			let profile = await AsyncStorageService.getProfile();
			if (!profile || profile.username == username) return false;

			let isNotFollowedAlready = await FirestoreService.getAllFollowProfile();
			if (!isNotFollowedAlready || isNotFollowedAlready.includes(username))
				return false;

			if (doesProfileExist.data.publicPin === publicPin) {
				// add to async
				await FirestoreService.addFollowProfile(username);
				return true;
			}
		}
		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
}
