/** @format */

import { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobals";
import { Member } from "../../lib/types/member";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const cookies = new Cookies();
   if (!cookies.get("accesToken")) localStorage.removeItem("memberData");
   const [authMember, setAuthMember] = useState<Member | null>(
      localStorage.getItem("memberData")
         ? JSON.parse(localStorage.getItem("memberData") as string)
         : null,
   );
   console.log("====verify====");
   const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
   return (
      <GlobalContext.Provider
         value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>
         {children}
      </GlobalContext.Provider>
   );
};

export default ContextProvider;
