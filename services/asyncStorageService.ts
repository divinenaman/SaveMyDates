import AsyncStorage from '@react-native-async-storage/async-storage';

interface todoFormProps {
	id: string;
	type: string;
	title: string;
	desp: string;
	dateTime: string;
	reminders: string;
	status: 'ongoing' | 'completed' | 'passed';
}

type profile = {username: string; privatePin: string; publicPin: string};

export default class AsyncStorageService {
	static async getProfile(): Promise<profile | null> {
		try {
			const value = await AsyncStorage.getItem('profile');
			if (value !== null) {
				return JSON.parse(value);
			} else return null;
		} catch (e) {
			return null;
		}
	}

	static async addProfile(data: profile) {
		try {
			await AsyncStorage.setItem('profile', JSON.stringify(data));
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	static async removeProfile() {
		try {
			const id_set = await AsyncStorage.removeItem('profile');
			return true;
		} catch (e) {
			return false;
		}
	}

	static async storeToDo(data: todoFormProps): Promise<boolean> {
		try {
			const date = new Date();
			const id = [
				date.getDay(),
				date.getDate(),
				date.getHours(),
				date.getMilliseconds(),
				date.getSeconds(),
			].join('_');
			await AsyncStorage.setItem(id, JSON.stringify(data));

			const id_set = await AsyncStorage.getItem('local_todo_list');
			if (id_set) {
				let new_id_set = [...JSON.parse(id_set).data];
				new_id_set.push(id);
				console.log('new_ids', new_id_set);
				await AsyncStorage.setItem(
					'local_todo_list',
					JSON.stringify({data: new_id_set}),
				);
			} else
				await AsyncStorage.setItem(
					'local_todo_list',
					JSON.stringify({data: [id]}),
				);
			return true;
		} catch (e) {
			return false;
		}
	}

	static async getToDo(id: string) {
		try {
			const value = await AsyncStorage.getItem(id);
			if (value !== null) {
				const res = JSON.parse(value);
				res.username = 'local';
				res.id = id;
				return res;
			} else return null;
		} catch (e) {
			return null;
		}
	}

	static async getAllToDo(type: string): Promise<any[]> {
		try {
			const id_set = await AsyncStorage.getItem('local_todo_list');
			let res = [];
			if (id_set) {
				console.log(id_set);
				const new_id_set = JSON.parse(id_set).data;
				for (const i of new_id_set) {
					const data = await AsyncStorageService.getToDo(i);
					if (data) res.push(data);
				}
			}
			return res;
		} catch (e) {
			console.log('getAllerror', e);
			return [];
		}
	}

	static async removeToDo(id: string): Promise<boolean> {
		try {
			await AsyncStorage.removeItem(id);
			let res = await AsyncStorage.getItem('local_todo_list');

			if (res) {
				let old_ids = JSON.parse(res).data;
				let new_ids = old_ids.filter((x: string) => x !== id);
				await AsyncStorage.setItem(
					'local_todo_list',
					JSON.stringify({data: new_ids}),
				);

				let check = await AsyncStorage.getItem('local_todo_list');
				console.log(check);
				return true;
			}
			return false;
		} catch (e) {
			return false;
		}
	}

	static async removeAllToDo(): Promise<boolean> {
		try {
			const id_set = await AsyncStorage.removeItem('local_todo_list');
			return true;
		} catch (e) {
			return false;
		}
	}
}
