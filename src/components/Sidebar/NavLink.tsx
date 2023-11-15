import { Icon, Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react";
import Link from "next/link";
import { ElementType } from "react"
import ActiveLink from "../ActiveLink";

interface NavLinkProps extends LinkProps
{
    //como está passando o nome e não a declaração, é usado ElementType
    icon: ElementType;
    children: string;
    href: string;
}

export default function NavLink({icon, children, href, ...rest} : NavLinkProps)
{
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" align="center" {...rest}>
                <Icon as={icon} fontSize="20"/>
                <Text marginLeft="4" fontSize="medium">{children}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}