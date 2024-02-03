import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useRole=()=>{
    const { data: Role = [], isLoading,refetch } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users`)
            return res.data;
        }
    })
    return [Role, isLoading,refetch]
}