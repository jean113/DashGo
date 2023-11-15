import { Flex,  Button, Stack, FormLabel, FormControl} from '@chakra-ui/react';
import {Input} from '../components/Form/Input';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export default function SignIn() {

  
  type SignFormData =
  {
    email:string;
    password:string;
  }
  
  const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória')
  })
  
  const {register, handleSubmit, formState} = useForm({ resolver: yupResolver(signInFormSchema)});
  const {errors} = formState;
  
  const handleSignIn: SubmitHandler<SignFormData> = async (values) =>
  {
    await new Promise (resolve => setTimeout(resolve, 2000));

    console.log(values);
  }


  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">

      <Flex width="100%" maxWidth={360} backgroundColor="gray.800" padding="8"
        borderRadius={8} flexDirection="column"
        as="form"
        onSubmit={handleSubmit(handleSignIn)}>

          {/* Trata como se fosse uma pilha de elementos e vc pode definir
          o espacamento entre eles */}
          <Stack spacing="4"> 

            <Input name="email" label="E-mail" type="email" error={errors.email}
              // ref={register} não é mais usado
              {...register('email')}
            />
            <Input name="password" label="Senha" type="password" error={errors.password}
            // ref={register} não é mais usado
            {...register('password')}
            />

            <Button type="submit" marginTop="6" colorScheme='pink'
            
              isLoading={formState.isSubmitting}
            > Entrar </Button>

          </Stack>
      </Flex>  
      
    </Flex>
  )
}
