import firestore from '@react-native-firebase/firestore';
import AsyncStorageService from './asyncStorageService';

type flatDoc = {id: string; data: any};

interface todoProps {
	id: string;
	type: string;
	title: string;
	desp: string;
	dateTime: string;
	reminders: string;
	username: string;
	status: 'ongoing' | 'completed' | 'passed';
}

export default class FirestoreService {
	static async storeToDo(data: any): Promise<boolean> {
		try {
			const profile = await AsyncStorageService.getProfile();
			if (profile) {
				const docs = await firestore()
					.collection('public_todo_list')
					.add({
						...data,
						username: profile.username,
					});
				return true;
			}
			return false;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	static async getAllToDo(): Promise<todoProps[] | null> {
		try {
			const profile = await AsyncStorageService.getProfile();
			if (profile) {
				const doc = await FirestoreService.findProfile(profile.username);
				const users = [profile.username];
				if (doc) users.push(...doc.data.following);

				let flatDoc: any[] = [];

				for (let u of users) {
					const userDoc = await firestore()
						.collection('public_todo_list')
						.where('username', '==', u)
						.get();

					if (userDoc.size > 0) {
						await userDoc.forEach(x => {
							let id = x.id;
							let data = x.data();
							data.id = id;
							flatDoc.push(data);
						});
					}
				}
				return flatDoc;
			}
			return null;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async removeToDo(id: string): Promise<boolean> {
		try {
			const profile = await AsyncStorageService.getProfile();
			if (profile) {
				await firestore().collection('public_todo_list').doc(id).delete();
				return true;
			}
			return false;
		} catch (e) {
			return false;
		}
	}

	static async addFollowProfile(username: string): Promise<boolean> {
		try {
			const profile = await AsyncStorageService.getProfile();
			if (profile) {
				const doc = await FirestoreService.findProfile(profile.username);
				if (doc) {
					await firestore()
						.collection('profiles')
						.doc(doc.id)
						.update({
							following: firestore.FieldValue.arrayUnion(username),
						});

					return true;
				}
			}
			return false;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	static async getAllFollowProfile(): Promise<string[] | null> {
		try {
			const profile = await AsyncStorageService.getProfile();
			if (profile) {
				const doc = await FirestoreService.findProfile(profile.username);

				if (doc) {
					console.log(doc.data);
					return doc.data.following;
				}
			}
			return null;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async getDocsInCollection(
		collection: string,
	): Promise<flatDoc[] | null> {
		try {
			const docs = await firestore().collection(collection).get();
			if (docs.size > 0) {
				let flatDoc: flatDoc[] = [];
				await docs.forEach(x => {
					flatDoc.push({
						id: x.id,
						data: x.data(),
					});
				});
				return flatDoc;
			}
			return null;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async getDocInCollection(
		collection: string,
		docid: string,
	): Promise<flatDoc | null> {
		try {
			const doc = await firestore().collection(collection).doc(docid).get();
			if (doc.exists) {
				console.log(doc.data());
				return {id: doc.id, data: doc.data()};
			} else {
				return null;
			}
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async setDocInCollection(
		collection: string,
		data: any,
	): Promise<string | null> {
		try {
			const doc = await firestore()
				.collection(collection)
				.add({
					...data,
				});

			return doc.id;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async setDocInCollectionWithId(
		collection: string,
		docid: string,
		data: any,
	): Promise<string | null> {
		try {
			const doc = await firestore()
				.collection(collection)
				.doc(docid)
				.set({
					...data,
				});

			return docid;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async findProfile(username: string): Promise<flatDoc | null> {
		try {
			const docs = await firestore()
				.collection('profiles')
				.where('username', '==', username)
				.get();
			if (docs.size) {
				let flatDoc: flatDoc[] = [];
				docs.forEach(x => {
					flatDoc.push({
						id: x.id,
						data: x.data(),
					});
				});
				return flatDoc[0];
			} else {
				return null;
			}
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async findDocByFieldInCollection(
		collection: string,
		field: string,
		operand: any,
		value: any,
	): Promise<flatDoc[] | null> {
		try {
			const docs = await firestore()
				.collection(collection)
				.where(field, operand, value)
				.get();
			if (docs.size) {
				let flatDoc: flatDoc[] = [];
				docs.forEach(x => {
					flatDoc.push({
						id: x.id,
						data: x.data(),
					});
				});
				return flatDoc;
			} else {
				return null;
			}
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}
