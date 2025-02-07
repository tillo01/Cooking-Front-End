/** @format */

import { serverApi } from "../../lib/config";
import axios from "axios";
import {
   LoginInput,
   Member,
   MemberInput,
   MemberUpdateInput,
} from "../../lib/types/member";
import { METHODS } from "http";

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

   // SignUp Start

   public async signup(input: MemberInput): Promise<Member> {
      try {
         const url = this.path + "/member/signup";

         const result = await axios.post(url, input, { withCredentials: true });

         console.log("signup ", result);
         const member: Member = result.data.member;
         console.log("member", member);
         localStorage.setItem("memberData", JSON.stringify(member));
         return member;
      } catch (err) {
         console.log("Error on signup");
         throw err;
      }
   }

   // SignUp End

   // Login Start

   public async login(input: LoginInput): Promise<Member> {
      try {
         const url = this.path + "/member/login";
         const result = await axios.post(url, input, { withCredentials: true });
         console.log("Login in ", result);
         const member: Member = result.data.member;
         localStorage.setItem("memberData", JSON.stringify(member));
         return member;
      } catch (err) {
         console.log("Error on login ");
         throw err;
      }
   }

   public async logout(): Promise<void> {
      try {
         const url = this.path + "/member/logout";
         const result = await axios.post(url, {}, { withCredentials: true });
         console.log("Logged Out", result);
         localStorage.removeItem("memberData");
         return result.data.logout;
      } catch (err) {
         console.log("Error on Logout");
         throw err;
      }
   }

   public async updateMember(input: MemberUpdateInput): Promise<Member> {
      try {
         const formData = new FormData();
         formData.append("memberNick", input.memberNick || "");
         formData.append("memberPhone", input.memberPhone || "");
         formData.append("memberAddress", input.memberAddress || "");
         formData.append("memberDesc", input.memberDesc || "");
         formData.append("memberImage", input.memberImage || "");

         const result = await axios(`${serverApi}/member/update`, {
            method: "POST",
            data: formData,
            withCredentials: true,
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         console.log("updateMember", result);
         const member: Member = result.data;
         localStorage.setItem("memberData", JSON.stringify(member));
         return member;
      } catch (err) {
         console.log("Error on signup=>>>>>>>");
         throw err;
      }
   }
}
// LogOut end
export default MemberService;
