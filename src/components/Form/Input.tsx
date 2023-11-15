import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps
{
    name: string;
    label?: string;
    error: FieldError;
}

//foi declardo desta forma para podermos fazer o encaminhamento da ref 
//que vem do componente pai até aqui
const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error, ...rest }, ref  ) =>
{
    return (
        <FormControl isInvalid={!!error}>
            { !!label &&  <FormLabel htmlFor={name}>{label}</FormLabel>}
            {/* focusBorderColor - não existe no CSS, é do chakra mesmo*/}
            <ChakraInput name={name} id={name} type="email" focusBorderColor='pink.500'
                backgroundColor="gray.900" variant="filled" size="lg"
                _hover={{
                backgroundColor: "gray.900" 
                }}
                {...rest}
                ref={ref}
            />
            {
                !!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )
            }
        </FormControl>
    )
}

export const Input = forwardRef(InputBase);
