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

export const storeToDo = async (data: todoFormProps): Promise<boolean> => {
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
			console.log('id_set', JSON.parse(id_set).ids);
			const new_id_set = [...JSON.parse(id_set).ids];
			new_id_set.push(id);
			await AsyncStorage.setItem('ids', JSON.stringify({ids: new_id_set}));
		} else await AsyncStorage.setItem('ids', JSON.stringify({ids: [id]}));
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};

const getToDo = async (id: string) => {
	try {
		const value = await AsyncStorage.getItem(id);
		if (value !== null) {
			return JSON.parse(value);
		} else return null;
	} catch (e) {
		return null;
	}
};

const getAllToDo = async (): Promise<todoFormProps[]> => {
	try {
		const id_set = await AsyncStorage.getItem('ids');
		const res = [];
		if (id_set) {
			const new_id_set = JSON.parse(id_set).ids;
			for (const i of new_id_set) {
				const data = await getToDo(i);
				if (data) res.push(data);
			}
		}
		return res;
	} catch (e) {
		return [];
	}
};
