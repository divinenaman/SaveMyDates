import React, {useState} from 'react';

import {Center, VStack, Heading, Input, Button} from 'native-base';

interface createProfileProps {
  onSubmit: (a: string, b: string, c: string) => void;
}

export default function CreateProfile({onSubmit}: createProfileProps) {
  const [username, setUsername] = useState('');
  const [publicPin, setPublicPin] = useState('');
  const [privatePin, setPrivatePin] = useState('');
  return (
    <Center w="100%" h="100%">
      <VStack m="2" justifyContent="space-between">
        <Heading>Create Public Profile</Heading>
        <Input
          placeholder="username"
          onChangeText={setUsername}
          value={username}
        />
        <Input
          placeholder="private pin"
          onChangeText={setPrivatePin}
          value={privatePin}
        />
        <Input
          placeholder="public pin"
          onChangeText={setPublicPin}
          value={publicPin}
        />
        <Button onPress={() => onSubmit(username, privatePin, publicPin)}>
          submit
        </Button>
      </VStack>
    </Center>
  );
}
