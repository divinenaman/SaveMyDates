import React, {useState, useEffect} from 'react';
import {Center, VStack, Heading, Button} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import Card from '../../components/ToDoCard';
import Loader from '../../components/Loader';

import {getAllToDo, removeAllToDo} from './service';

interface todoFormProps {
	id: string;
	type: string;
	title: string;
	desp: string;
	dateTime: Date;
	reminders: Date;
	status: 'ongoing' | 'completed' | 'passed';
}

const ListView = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<todoFormProps[]>([]);

	const clearItems = () => {
		setLoading(true);
		removeAllToDo().then(res => {
			setLoading(false);
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			setLoading(true);
			getAllToDo().then(res => {
				setData(res);
				setLoading(false);
			});
		}, []),
	);

	return (
		<VStack flex={1} space={4} alignItems="center" marginTop={10}>
			{loading && (
				<Center flex={1}>
					<Loader />
				</Center>
			)}

			{!loading &&
				(data.length == 0 ? (
					<Center flex={1}>
						<Heading>"No ToDo"</Heading>
					</Center>
				) : (
					data.map((x, idx) => <Card {...x} key={`todo_${idx}`} />)
				))}

			{!loading && <Button onPress={clearItems}>Clear To Do</Button>}
		</VStack>
	);
};

export default ListView;
