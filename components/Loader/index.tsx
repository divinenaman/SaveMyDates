import React from 'react';
import {VStack, Center, Heading, Spinner} from 'native-base';

const Loader = ({statusMessage}: {statusMessage?: string}) => {
	return (
		<Center flex={1}>
			<VStack space={4} alignItems="center" justifyContent="center">
				<Spinner accessibilityLabel="Loading posts" />
				{statusMessage ? <Heading>{statusMessage}</Heading> : null}
			</VStack>
		</Center>
	);
};

export default Loader;
