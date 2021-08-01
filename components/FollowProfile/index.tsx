import React, {useState} from 'react';

import {Center, VStack, Heading, Input, Button} from 'native-base';

interface followProfileProps {
  onSubmit: (a: string, b: string) => void;
}

export default function FollowProfile({onSubmit}: followProfileProps) {
  const [username, setUsername] = useState('');
  const [publicPin, setPublicPin] = useState('');

  return (
    <Center w="100%" h="100%">
      <VStack w="80%" h="60%" justifyContent="space-between">
        <Heading alignSelf="center">Follow</Heading>
        <Input
          placeholder="username"
          onChangeText={setUsername}
          value={username}
        />
        <Input
          placeholder="public pin"
          onChangeText={setPublicPin}
          value={publicPin}
        />
        <Button onPress={() => onSubmit(username, publicPin)}>submit</Button>
      </VStack>
    </Center>
  );
}
