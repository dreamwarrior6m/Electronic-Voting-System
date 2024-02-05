/* eslint-disable react-hooks/rules-of-hooks */
import useAuth from "@/app/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
 
 
export const isRole = () => {
    const { user } = useAuth();
    
    const { data, refetch } = useQuery({
      queryKey: ['role'],
      queryFn: async () => {
        try {
          const res = await axios.get(`https://evs-delta.vercel.app/users/${user?.email}`);
          return res.data;
        } catch (error) {
          console.error('Error fetching user role:', error);
          throw error;
 

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
  