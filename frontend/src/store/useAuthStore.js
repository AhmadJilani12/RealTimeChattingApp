import { create } from "zustand";
import { axiosInstance } from "../lib/axios.jsx";


export const useAuthStore = ((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check-auth');
            set({authUser:res.data});
        } catch (error) {
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
    }

    
}))