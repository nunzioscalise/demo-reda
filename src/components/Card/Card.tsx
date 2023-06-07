import { FC } from "react";
import { Avatar, Box, Card as ChakraCard, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';

interface Props {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}

const Card: FC<Props> = ({ firstName, lastName, email, avatar }) => {
    return (
        <ChakraCard style={{ minWidth: '350px' }}>
            <CardHeader>
                <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={ `${firstName} ${lastName}` } src={avatar} />
                        <Box>
                            <Heading size='sm'>{ firstName } { lastName }</Heading>
                            <Text>{ email }</Text>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
        </ChakraCard>
    );
};

export default Card;