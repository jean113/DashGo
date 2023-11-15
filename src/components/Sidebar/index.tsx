import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";
import SidebarNav from "./SideBarNav";


export default function Sidebar()
{
    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    })

    const {isOpen,onClose} = useSidebarDrawer();

    if(isDrawerSidebar)
    {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent backgroundColor="gray.800" padding="4">
                        <DrawerCloseButton marginTop="6"/>
                        <DrawerHeader>Navegação</DrawerHeader>
                        <DrawerBody>
                            <SidebarNav/>  
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>

            </Drawer>
        )
    }

    return (
        <Box as="aside" width="64" marginRight="8">
          <SidebarNav/>  
        </Box>
    )
}