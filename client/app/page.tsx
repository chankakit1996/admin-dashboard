"use client";
import Link from "next/link";
import { useAppSelector } from "@/lib/hook";
import { useGetUserQuery } from "@/lib/features/api/apiSlice";

export default function App() {
  // const userId = useAppSelector((state) => state.user.userId);
  // const { data, isLoading } = useGetUserQuery(userId);
  // console.log({ data });

  return (
    <>
      <Link href="/homepage">homepage</Link>
      <Link href="/client">client</Link>
    </>
  );
}
