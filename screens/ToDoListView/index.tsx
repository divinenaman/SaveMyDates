import React, {useState, useEffect} from 'react';
import {Center, VStack, Heading, Button, ScrollView} from 'native-base';
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
	dateTime: string;
	reminders: string;
	username: string;
	status: 'ongoing' | 'completed' | 'passed';
}

interface listView {
	type?: string;
	username: string;
}

const ListView = ({type = 'local', username}: listView) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<todoFormProps[]>([]);
	const [reload, setReload] = useState(1);

	const getAllToDo =
		type === 'public'
			? FirestoreService.getAllToDo
			: AsyncStorageService.getAllToDo;

	const removeToDo =
		type === 'public'
			? FirestoreService.removeToDo
			: AsyncStorageService.removeToDo;

	const remove = (id: string) => {
		setLoading(true);
		removeToDo(id).then(res => {
			if (res) setReload((reload + 1) % 2);
		});
	};

	const clearItems = () => {
		setLoading(true);
		AsyncStorageService.removeAllToDo().then(res => {
			setReload((reload + 1) % 2);
			setLoading(false);
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			setLoading(true);
			getAllToDo(type).then(res => {
				if (res) {
					setData(res);
				}
				setLoading(false);
			});
		}, [reload]),
	);

	return (
		<ScrollView flex={1}>
			<VStack flex={1} space={4} alignItems="center" marginTop={10}>
				{loading && <Loader />}

				{!loading &&
					(data.length == 0 ? (
						<Center flex={1}>
							<Heading>No ToDo</Heading>
						</Center>
					) : (
						<>
							{data.map((x, idx) => (
								<Card
									{...x}
									{...(username == x.username ? {remove} : {})}
									key={`todo_${idx}`}
								/>
							))}
							{type === 'local' && (
								<Button onPress={clearItems}>Clear ToDo</Button>
							)}
						</>
					))}
			</VStack>
		</ScrollView>
	);
};

export default ListView;
