import React, {useState, useEffect} from 'react';
import {Center, VStack, Heading, Button} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import Card from '../../components/ToDoCard';
import Loader from '../../components/Loader';

import FirestoreService from '../../services/firestoreService';
import AsyncStorageService from '../../services/asyncStorageService';

interface todoFormProps {
	id: string;
	type: string;
	title: string;
	desp: string;
	dateTime: Date;
	reminders: Date;
	status: 'ongoing' | 'completed' | 'passed';
}

interface listView {
	type?: string;
}

const ListView = ({type = 'local'}: listView) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<todoFormProps[]>([]);

	const getAllToDo =
		type === 'public'
			? FirestoreService.getAllToDo
			: AsyncStorageService.getAllToDo;

	// const clearItems = () => {
	// 	setLoading(true);
	// 	removeAllToDo().then(res => {
	// 		setLoading(false);
	// 	});
	// };

	useFocusEffect(
		React.useCallback(() => {
			setLoading(true);
			getAllToDo(type).then(res => {
				if (res) {
					setData(res);
				}
				setLoading(false);
			});
		}, []),
	);

	return (
		<VStack flex={1} space={4} alignItems="center" marginTop={10}>
			{loading && <Loader />}

			{!loading &&
				(data.length == 0 ? (
					<Center flex={1}>
						<Heading>No ToDo</Heading>
					</Center>
				) : (
					data.map((x, idx) => <Card {...x} key={`todo_${idx}`} />)
				))}
		</VStack>
	);
};

export default ListView;
