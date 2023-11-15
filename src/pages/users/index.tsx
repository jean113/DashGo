import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, Spinner, Link } from "@chakra-ui/react"
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri"
import Header from "../../components/Header"
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar"
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

// export default function UserList({users}) - use essa linha quando usar SSR
export default function UserList()
{
    const [page, setPage] = useState(1);

    // const {data, isLoading, error, isFetching} = useUsers(page, {initialData: users}); - use essa linha quando usar SSR
    const {data, isLoading, error, isFetching} = useUsers(page); 

    async function handlePrefetchUser(userId:string)
    {
        await queryClient.prefetchQuery(['user', userId],async () => {
            const response = await api.get(`users/${userId}`);
            return response.data;
        }, {staleTime: 1000 * 60 * 10}); //10 minutos
    }

    return(
            <Box>
            <Header/>
            <Flex width="100%" marginY="6" maxWidth={1480} marginX="auto" paddingX="6">
                <Sidebar/>
                <Box flex="1" borderRadius={8} bgColor="gray.800" padding="8">

                    <Flex marginBottom="8" justify="space-between" align="center">

                        <Heading size="lg" fontWeight="normal">
                            Usuários 
                            {!isLoading && isFetching && (<Spinner size='sm' color='gray.500'/>)}
                        </Heading>

                        <NextLink href="/users/create" passHref>
                            <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as ={RiAddLine} fontSize="20"/>}> 
                                Criar Novo
                            </Button>
                        </NextLink>


                    </Flex>

                   {isLoading ? (<Flex justify="center"><Spinner/></Flex>) : error ? 
                    (<Flex><Text>Falha ao obter dados</Text></Flex>) : (
                        <>
                             <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th paddingX="6" color="gray.300" width="8">
                                            <Checkbox colorScheme="pink"/>
                                        </Th>
                                        <Th>
                                            Usuário
                                        </Th>
                                        <Th>Data de cadastro</Th>
                                        <Th paddingX="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.users.map(user => {
                                        return(
                                            <Tr key={user.id}>
                                                <Td paddingX="6">
                                                <Checkbox colorScheme="pink"/>
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                <Td>
                                                    {user.createdAt}
                                                </Td>
                                                <Td paddingX="8">
                                                    <Button as="a" size="sm" fontSize="sm" colorScheme="purple" 
                                                        leftIcon={<Icon as ={RiPencilLine} fontSize="16"/>}> 
                                                        Editar
                                                    </Button>

                                                    
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

/*mostrado como fazer a integração entre react-query e o SSR (server side response)

Devido ao fato doo miragejs não dar suporte ao lado do servidor, somente do cliente, então as 
requisições realmente não vão funcionar corretamente com o getServerSideProps utilizando o miragejs.
Por isso deixarei desativado aqui como exemplo a ser usado em outras aplicações

O Diego em aula mostra aquele exemplo apenas para exemplificar como utilizar o react-query fazendo uma 
primeira request pelo lado do SSR, mas realmente com o miragejs não funcionaria, mas você pode testar com outras API's que 
vai funcionar normalmente, essa apenas é uma peculiaridade do miragejs.

export const getServerSideProps: GetServerSideProps = async () =>
{
    const {users, totalCount} = await getUsers(1);

    return {
        props:
        {
            users,
        }
    }
}
*/