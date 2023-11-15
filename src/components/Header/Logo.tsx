import { Text } from "@chakra-ui/react";

export default function Logo() 
{
    return (
        <Text
        fontSize={["2xl", "3xl", "4xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        //não é pixels, é um valor do Chackra - para saber em quantos pixels olhar na documentacao do chackra 
        width="64" 
        >
            dashgo
            <Text as="span" marginLeft={1} color="pink.500">.</Text>  
        </Text>
    );
}