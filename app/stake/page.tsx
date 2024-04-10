"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'

const Stake = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/")
  }, [router])
};

export default Stake
