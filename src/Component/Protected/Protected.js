"use client"
import useAuth from "@/app/hook/useAuth";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Protected = ({children}) => {
    const {user,loading}= useAuth()
    const router = useRouter()
    const [ShowMessage, setShowMessage]= useState(false)
    console.log(user,loading)
    useEffect(() => {
      if (!user && !loading) {
          setShowMessage(true);
      }
      else if (user && !loading) {
        router.push("/about");
    }
  }, [user, loading,setShowMessage,router]);
  if(ShowMessage){
    return <div className="text-black">Please Login this page and verify admin</div>
  }
    if(loading){
      return <Loading></Loading>
    }
    if(user){
      return <>{children}</>
    }
    return router.push("/login") 
};


export default Protected;