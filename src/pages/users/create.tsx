import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import Link from "next/link";
import {Input} from "../../components/Form/Input";
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";


export default function CreateUser()
{
    const router = useRouter();

    type CreateFormData =
    {
        name:string;
        email:string;
        password:string;
        password_confirmation:string;
    }
    
    const createFormSchema = yup.object().shape({
        name: yup.string().required('Nome obrigatório'),
        email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
        password: yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
        password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'A senhas não coincidem')
    })

    
    const {register, handleSubmit, formState} = useForm({ resolver: yupResolver(createFormSchema)});
    const {errors} = formState;
    
    //usar mutation, consigo monitorar a situação através das variáveis dentro dela
    const createUser = useMutation(async (user:CreateFormData)=>{
        const response = await api.post('users',{
            user:
            {
                ...user,
                created_at: new Date(),
            }
        })

        return response.data.user;
        
        //limpa os dados guardados em cache
    }, { onSuccess: ()=>{queryClient.invalidateQueries('users')  }} ); 

    const handlCreateUser: SubmitHandler<CreateFormData> = async (values) =>
    {
        // await new Promise (resolve => setTimeout(resolve, 2000));

        await createUser.mutateAsync(values)

        router.push('/users');
    }

  
  
    return(
            <Box>
            <Header/>
            <Flex width="100%" marginY="6" maxWidth={1480} marginX="auto" paddingX="6">
                <Sidebar/>
                <Box flex="1" borderRadius={8} bgColor="gray.800" padding={["6","8"]} as="form"
                    onSubmit={handleSubmit(handlCreateUser)}
                >
                    <Heading size="large" fontWeight="normal">
                        Criar Usuário
                    </Heading>

                    <Divider marginY="6" borderColor="gray.700"/>

                    <VStack spacing={["6","8"]}>
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%"> 
                            <Input name="name" label="Nome Completo" {...register('name')}
                                error={errors.name}
                            />
                            <Input name="email" type="email" label="E-mail" {...register('email')}
                                error={errors.email}
                            />
                  
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%"> 
                            <Input name="password" type="password" label="Senha" {...register('password')}
                                error={errors.password}
                            />
                            <Input name="password_confirmation" type="password" label="Confirmar senha" 
                                    {...register('password_confirmation')}
                                    error={errors.password_confirmation}
                            />
                  
                        </SimpleGrid>
                    </VStack>

                    <Flex marginTop="8" justify="flex-end">
                        <HStack spacing="4" >
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>

                    </Flex>


                </Box>
            </Flex>
        </Box>
    );
}