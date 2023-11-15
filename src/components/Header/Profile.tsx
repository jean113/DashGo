import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps 
{
    showProfileData?: boolean;
}

export default function Profile({showProfileData = true} : ProfileProps)
{
    return (
        <Flex align="center">
            {
                showProfileData && (

                    <Box marginRight="4" textAlign="right">
                        <Text>Jean Luiz Dias</Text>
                        <Text color="gray.300" fontSize="small">
                            jean@gmail.com
                        </Text>
                    </Box>
                )
            }

            <Avatar size="md" name="Jean Luiz Dias" src="https://github.com/jean113.png"/>
        </Flex>
    );
}