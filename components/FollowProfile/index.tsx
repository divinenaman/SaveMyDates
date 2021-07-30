import React, {useState} from 'react';

import {Center, VStack, Heading, Input, Button} from 'native-base';

interface followProfileProps {
  onSubmit: (a: string, b: string) => void;
  children: React.ReactNode;
}

export default function FollowProfile({
  onSubmit,
  children,
}: followProfileProps) {
  const [username, setUsername] = useState('');
  const [publicPin, setPublicPin] = useState('');

  return (
    <Center w="100%" h="100%">
      <VStack w="80%" m="5">
        <Heading alignSelf="center">Follow</Heading>
        <Input placeholder="work" onChangeText={setUsername} value={username} />
        <Input
          placeholder="public pin"
          onChangeText={setPublicPin}
          value={publicPin}
        />
        <Button onPress={() => onSubmit(username, publicPin)}>submit</Button>
      </VStack>
      {children}
    </Center>
  );
}
