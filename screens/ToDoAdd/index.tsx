import React, {useState, useEffect} from 'react';
import {VStack} from 'native-base';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import FirestoreService from '../../services/firestoreService';
import AsyncStorageService from '../../services/asyncStorageService';

import Card from '../../components/ToDoCard';
import Loader from '../../components/Loader';
import Form from '../../components/ToDoForm';

type AddToDoParamList = {
	AddToDo: {} | undefined;
	DisplayToDo: {} | undefined;
};

type AddToDoNavigationProp = BottomTabNavigationProp<
	AddToDoParamList,
	'AddToDo'
>;

interface todoAddProps {
	type?: string;
	navigation?: AddToDoNavigationProp;
}

const ToDoAdd = ({navigation, type = 'local'}: todoAddProps) => {
	const [loading, setLoading] = useState(true);
	const storeToDo =
		type === 'public'
			? FirestoreService.storeToDo
			: AsyncStorageService.storeToDo;

	useEffect(() => {
		setLoading(true);
	});
	return (
		<VStack flex={1} space={4} alignItems="center">
			<Form navigation={navigation} storeToDo={storeToDo} />
		</VStack>
	);
};

export default ToDoAdd;
