/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const page = () => {
  const { id } = useParams();
  const [allPoll, setAllPoll] = useState();
  const [pollAns, setPollAns] = useState();

  const { data, refetch } = useQuery({
    queryKey: ["create-poll"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-poll");
      setAllPoll(res?.data);
      return res?.data;
    },
  });
  //   console.log(allPoll);
  const filterPoll = allPoll?.filter((poll) => poll?.userName == id);
  console.log(filterPoll);

  const { data2, refetch2 } = useQuery({
    queryKey: ["poll-ans"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/poll-ans");
      setPollAns(res?.data);
      return res?.data;
    },
  });
  //   console.log(pollAns);
  const filterPollAns = pollAns?.filter((ans) => ans?.userName == id);
  console.log(filterPollAns);

  return <div className="text-white">safdsadf</div>;
};

export default page;
