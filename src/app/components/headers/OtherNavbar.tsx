/** @format */

import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

interface OtherNavbarProps {
   cartItems: CartItem[];
   onAdd: (item: CartItem) => void;
   onRemove: (item: CartItem) => void;
   onDelete: (item: CartItem) => void;
   onDeleteAll: () => void;
   setSignupOpen: (isOpen: boolean) => void;
   setloginOpen: (isOpen: boolean) => void;
   // anchor and logout
   handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
   anchorEl: HTMLElement | null;
   handleCloseLogout: () => void;
   handleLogoutRequest: () => void;
   // anchor and logout
}

export default function OtherNavbar(props: OtherNavbarProps) {
   const {
      cartItems,
      onAdd,
      onRemove,
      onDelete,
      onDeleteAll,
      setSignupOpen,
      setloginOpen,
      // handclik
      handleLogoutClick,
      anchorEl,
      handleCloseLogout,
      handleLogoutRequest,
   } = props;
   const { authMember } = useGlobals();

   return (
      <div className="other-navbar">
         <Container className="navbar-container">
            <Stack className="menu">
               <Box>
                  <NavLink to={"/"}>
                     <img
                        className="brand-logo"
                        src="/icons/burak.svg"
                     />
                  </NavLink>
               </Box>

               <Stack className="links">
                  <Box className={"hover-line"}>
                     <NavLink to={"/"}>Home</NavLink>
                  </Box>
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/products"}
                        activeClassName="underline">
                        Products
                     </NavLink>
                  </Box>
                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/orders"}
                           activeClassName="underline">
                           Orders
                        </NavLink>
                     </Box>
                  ) : null}
                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/member-page"}
                           activeClassName="underline">
                           My Page
                        </NavLink>
                     </Box>
                  ) : null}
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/help"}
                        activeClassName="underline">
                        Help
                     </NavLink>
                  </Box>

                  <Basket
                     cartItems={cartItems}
                     onAdd={onAdd}
                     onRemove={onRemove}
                     onDelete={onDelete}
                     onDeleteAll={onDeleteAll}
                  />
                  {!authMember ? (
                     <Box>
                        <Button
                           onClick={() => setloginOpen(true)}
                           variant="contained"
                           className="login-button">
                           Login
                        </Button>
                     </Box>
                  ) : (
                     <img
                        className="user-avatar"
                        src={
                           authMember?.memberImage
                              ? `${serverApi}/${authMember?.memberImage}`
                              : "/icons/default-user.svg"
                        }
                        aria-haspopup={"true"}
                        onClick={handleLogoutClick}
                        // img
                     />
                  )}
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
