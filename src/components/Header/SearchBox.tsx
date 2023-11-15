import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchBox()
{
    // isto estilo controlled componentes - vc contral o valor dentro do componente
    // const [search, setSearch] = useState('');

    
    //paradigmas de construção de interface: imperativa x declarativa
    
    
    // vamos usar o uncontrolled components que usa referencias para isso com o cód abaixo
    //imperativa - quando dize exatamente o quer pro código
    //ex. abaixo
    const searchInputRef = useRef<HTMLInputElement>(null);


    //declarativa - quando digo o que espero através de uma açãoe e aquilo acotnece de forma automatica
    //ex.: propriedades dentro das tags HTML como autofocus

    return (
        <Flex
                as="label"
                flex="1"
                paddingY="4"
                paddingX="8"
                marginLeft="6"
                maxWidth={400}
                alignSelf="center"
                color="gray.200"
                position="relative"
                backgroundColor="gray.800"
                borderRadius="full"
                ref="searchInputRef"
                >
                    <Input
                        color="gray.50"
                        variant="unstyled"
                        paddingX="4"
                        marginRight="4"
                        placeholder="Buscar na plataforma"
                        _placeholder={{color: 'gray.400'}}
                    />
                    <Icon as={RiSearchLine} fontSize="20"/>
            </Flex>
    )
}