import React, {useState, useEffect} from 'react';
import {Center, VStack} from 'native-base';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Card from '../../components/ToDoCard';
import Loader from '../../components/Loader';
import Form from '../../components/ToDoForm';

interface todoFormProps {
	id: string;
	type: string;
	title: string;
	desp: string;
	dateTime: Date;
	reminders: Date;
	status: 'ongoing' | 'completed' | 'passed';
}

type AddToDoParamList = {
	AddToDo: {} | undefined;
	DisplayToDo: {} | undefined;
};

type AddToDoNavigationProp = BottomTabNavigationProp<
	AddToDoParamList,
	'AddToDo'
>;

const ToDoAdd = ({navigation}: AddToDoNavigationProp) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<todoFormProps[]>([]);
	useEffect(() => {
		setLoading(true);
	});
	return (
		<VStack flex={1} space={4} alignItems="center">
			<Form navigation={navigation} />
		</VStack>
	);
};

export default ToDoAdd;
