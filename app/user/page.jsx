"use client";
import React, {useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const userParam= useSearchParams()
  const userParamId = userParam.get('id')
  const [userData, setuserData] = useState([]);
  if(!userParamId){
    router.push('/')
  }
  // console.log(userParamId);
  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`/api/users/${userParamId}`, {
        method: "GET",
        headers: {
          Authorization: session?.user.token,
        },
      });
      const data = await response.json();
      console.log(data);
      setuserData(data);
    };
    getUserData();
  }, []);

  return (
    <>
      {userData ? (
        <>
          <h2 className="text-3xl blue_gradient">{userData.userName}</h2>
          <p>{userData.email}</p>
        </>
      ) : (
        <>
          <h3>Error</h3>
          <p>You are Not authorised</p>
        </>
      )}
    </>
  );
};

export default page;

