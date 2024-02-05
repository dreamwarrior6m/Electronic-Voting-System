/* eslint-disable react-hooks/rules-of-hooks */
import useAuth from "@/app/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
 

<<<<<<< HEAD
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
=======

export const useRole=()=>{
    const { data: Role = [], isLoading,refetch } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axios.get(`https://evs-delta.vercel.app/users`)
            return res.data;
 
>>>>>>> 8b9ff1d76a92d03fa242f5b048b0ce00692b78f9
        }
      }
    });
  
    return { role: data, refetch };
  };
  