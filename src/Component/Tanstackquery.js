import useAuth from "@/app/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
 


export const useRole=()=>{
    const { data: Role = [], isLoading,refetch } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axios.get(`https://evs-delta.vercel.app/users`)
            return res.data;
 
        }
      }
    });
  
    return { role: data, refetch };
  };
  