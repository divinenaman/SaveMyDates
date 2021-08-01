import React, {useState, useEffect} from 'react';
import {Center, VStack, Box, Text} from 'native-base';

export default function DisplayFollowProfile({data}: any) {
  return (
    <Center w="100%" h="100%">
      <VStack justifyContent="space-between" width="80%">
        {data.length > 0 ? (
          data.map((x: any, i: any) => (
            <Box
              m={2}
              rounded="md"
              width="100%"
              alignSelf="center"
              justifyContent="center"
              key={`display_profile_${i}`}
              backgroundColor="black"
              p="2">
              <Text fontSize="md" color="white" textAlign="center">
                {x}
              </Text>
            </Box>
          ))
        ) : (
          <Text fontSize="xl" backgroundColor="black" color="white" p="2">
            No Profiles Followed
          </Text>
        )}
      </VStack>
    </Center>
  );
}
