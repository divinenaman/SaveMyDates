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
	dateTime: Date;
	reminders: Date;
	status: 'ongoing' | 'completed' | 'passed';
}

export default function ToDoCard({
	id,
	type,
	title,
	desp,
	dateTime,
	reminders,
	status,
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
			justifyContent="center">
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
				</Box>
			</HStack>
			<Box alignSelf="flex-end">
				<Text fontSize="sm" highlight>
					{status}
				</Text>
			</Box>
		</VStack>
	);
}
