import React, {useState, useEffect} from 'react';
import {Center, VStack, Box, Text} from 'native-base';

export default function DisplayFollowProfile({data, children}: any) {
  return (
    <Center w="100%" h="100%">
      <VStack m="5">
        {children}
        {data.length > 0 ? (
          data.map((x: any, i: any) => (
            <Box mb={2} key={`display_profile_${i}`}>
              <Text fontSize="sm" highlight mb="2">
                {x.username}
              </Text>
            </Box>
          ))
        ) : (
          <Text fontSize="xl">No Profiles Followed</Text>
        )}
      </VStack>
    </Center>
  );
}
