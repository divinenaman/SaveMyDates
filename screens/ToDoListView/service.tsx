import AsyncStorage from '@react-native-async-storage/async-storage';

interface todoFormProps {
	id: string;
	type: string;
	title: string;
	desp: string;
	dateTime: Date;
	reminders: Date;
	status: 'ongoing' | 'completed' | 'passed';
}

const storeToDo = async (data: todoFormProps): Promise<boolean> => {
	try {
		const date = new Date();
		const id = [
			date.getDay(),
			date.getDate(),
			date.getHours(),
			date.getMilliseconds(),
		].join('_');
		await AsyncStorage.setItem(id, JSON.stringify(data));

		const id_set = await AsyncStorage.getItem('ids');
		if (id_set) {
			const new_id_set = JSON.parse(id_set).ids.push(id);
			await AsyncStorage.setItem('ids', JSON.stringify(new_id_set));
		} else await AsyncStorage.setItem('ids', JSON.stringify({ids: [id]}));
		return true;
	} catch (e) {
		return false;
	}
};

export const getToDo = async (id: string) => {
	try {
		const value = await AsyncStorage.getItem(id);
		if (value !== null) {
			return JSON.parse(value);
		} else return null;
	} catch (e) {
		return null;
	}
};

export const getAllToDo = async (): Promise<todoFormProps[]> => {
	try {
		const id_set = await AsyncStorage.getItem('ids');
		const res = [];
		console.log(id_set);
		if (id_set) {
			const new_id_set = JSON.parse(id_set).ids;
			for (const i of new_id_set) {
				const data = await getToDo(i);
				if (data) res.push(data);
			}
		}
		console.log('getAll', res);
		return res;
	} catch (e) {
		console.log('getAllerror', e);
		return [];
	}
};

export const removeAllToDo = async (): Promise<boolean> => {
	try {
		const id_set = await AsyncStorage.removeItem('ids');
		return true;
	} catch (e) {
		return false;
	}
};
