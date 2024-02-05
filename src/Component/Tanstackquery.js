import useAuth from "@/app/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const isRole = () => {
    const { user } = useAuth();
    
    const { data, refetch } = useQuery({
      queryKey: ['role'],
      queryFn: async () => {
        try {
          const res = await axios.get(`http://localhost:5000/users/${user?.email}`);
          return res.data;
        } catch (error) {
          console.error('Error fetching user role:', error);
          throw error;
        }
      }
    });
  
    return { role: data, refetch };
  };
  