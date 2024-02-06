 
import useAuth from "@/app/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useRole=()=>{
    const { data: Role = [], isLoading,refetch } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axios.get(`https://evs-delta.vercel.app`)
            return res.data;
export const isRole = () => {
    const { user } = useAuth();

    const { data, refetch } = useQuery({
      queryKey: ['role'],
      queryFn: async () => {
        try {
          const res = await axios.get(`https://evs-delta.vercel.app/${user?.email}`);
          return res.data;
        } catch (error) {
          console.error('Error fetching user role:', error);
          throw error;
        }
    }),
    return [Role, isLoading,refetch]
}
      }
    });

    return { role: data, refetch };
  };
 
