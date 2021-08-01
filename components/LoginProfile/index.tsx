import React, {useState} from 'react';

import {Center, VStack, Heading, Input, Button} from 'native-base';

interface createProfileProps {
  onSubmit: (a: string, b: string) => void;
}

export default function CreateProfile({onSubmit}: createProfileProps) {
  const [username, setUsername] = useState('');
  const [privatePin, setPrivatePin] = useState('');
  return (
    <Center w="100%" h="100%">
      <VStack m="2" justifyContent="space-between">
        <Heading>Login Public Profile</Heading>
        <Input
          placeholder="username"
          onChangeText={setUsername}
          value={username}
        />
        <Input
          type="password"
          placeholder="private pin"
          onChangeText={setPrivatePin}
          value={privatePin}
        />
        <Button onPress={() => onSubmit(username, privatePin)}>submit</Button>
      </VStack>
    </Center>
  );
}
