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

export async function getFollowedProfiles(): Promise<string[] | null> {
	try {
		let following = await FirestoreService.getAllFollowProfile();
		return following;
	} catch (e) {
		console.log(e);
		return null;
	}
}
