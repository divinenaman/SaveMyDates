import React from 'react';
import {
	NativeBaseProvider,
	Center,
	HStack,
	VStack,
	Text,
	Heading,
	Box,
} from 'native-base';

interface todoCardProps {
	id: string;
	type: string;
	title: string;
	desp: string;
	dateTime: string;
	reminders: string;
	status: 'ongoing' | 'completed' | 'passed';
	username: string;
	remove?: (a: string) => void;
}

export default function ToDoCard({
	id,
	type,
	title,
	desp,
	dateTime,
	reminders,
	status,
	username,
	remove,
}: todoCardProps) {
	return (
		<VStack
			width={'90%'}
			bg="primary.400"
			rounded="md"
			_text={{
				color: 'white',
			}}
			shadow={3}
			space={4}
			p="2"
			justifyContent="center"
			mb="5">
			<VStack w="90%" alignSelf="center">
				<Text fontSize="sm" alignSelf="flex-start" mb="2">
					{type}
				</Text>
				<Text bold fontSize="xl" alignSelf="flex-start">
					{title}
				</Text>
			</VStack>
			<HStack alignItems="center" w="90%" alignSelf="center" mb="2">
				<Box w="30%" alignItems="center">
					<Text fontSize="sm">{desp}</Text>
				</Box>
				<Box w="70%" alignItems="flex-end">
					<Text fontSize="xs">Due</Text>
					<Heading size="2xl">
						{new Date(dateTime).toLocaleDateString()}
					</Heading>
					<Text fontSize="xl">{new Date(dateTime).toLocaleTimeString()}</Text>
				</Box>
			</HStack>
			<Box alignSelf="flex-end">
				<Text fontSize="sm" highlight mb="2">
					{status}
				</Text>
				<Text fontSize="sm" highlight mb="2">
					{username}
				</Text>
			</Box>
			{remove && (
				<Box alignSelf="center">
					<Text fontSize="sm" highlight mb="2" onPress={() => remove(id)}>
						remove
					</Text>
				</Box>
			)}
		</VStack>
	);
}
