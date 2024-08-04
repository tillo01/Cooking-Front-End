/** @format */

import { serverApi } from "../../lib/config";
import axios from "axios";
import { Member } from "../../lib/types/member";

class MemberService {
   private readonly path: string;
   constructor() {
      this.path = serverApi;
   }

   public async getTopUsers(): Promise<Member[]> {
      try {
         const url = this.path + "/member/top-users";
         const result = await axios.get(url);
         console.log("getTopUsers", result);

         return result.data;
      } catch (err) {
         console.log("Error, on getTopUsers", err);
         throw err;
      }
   }

   public async getRestaurant(): Promise<Member> {
      try {
         const url = this.path + "/member/restaurant";
         const result = await axios.get(url);
         console.log("getRestaurant", result);

         return result.data;
      } catch (err) {
         console.log("Error, on getRestaurant", err);
         throw err;
      }
   }
}

export default MemberService;
