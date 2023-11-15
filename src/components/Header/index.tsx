import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";
import Logo from "./Logo";
import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import SearchBox from "./SearchBox";


export default function Header()
{
    const isWideVersion = useBreakpointValue({
        base: false,
        lg:false,
    })

    const {onOpen} = useSidebarDrawer();

    return (

        <Flex as="header" width="100%" maxWidth={1480}
            height="20" marginTop="4" marginX="auto" paddingX="6"
            align="center">

            {
                !isWideVersion && (
                    <IconButton
                        aria-label="Open Navigation"
                        icon={<Icon as={RiMenuLine}/>}
                        fontSize="24"
                        variant="unstyled"
                        onClick={onOpen}
                        marginRight="2"
                    >

                    </IconButton>
                )
            }
            
            <Logo/>
            
            {isWideVersion && <SearchBox/> }
            
            <Flex
                align="center"
                marginLeft="auto"   
            >
                <NotificationsNav/>

                <Profile showProfileData={isWideVersion}/>
            </Flex>

        </Flex>
    
    )
}