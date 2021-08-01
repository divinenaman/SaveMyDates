import FirestoreService from '../../services/firestoreService';

export async function getFollowedProfiles(): Promise<string[] | null> {
	try {
		let following = await FirestoreService.getAllFollowProfile();
		return following;
	} catch (e) {
		console.log(e);
		return null;
	}
}
