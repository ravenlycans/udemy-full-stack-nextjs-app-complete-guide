import { getMemberByUserId } from "@/app/actions/memberActions"
import { notFound } from "next/navigation";


export default async function MemberDetailedPage({params}: {params: {userId: string}}) {
  const {userId} = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div className="p-6">{member.name}</div>
  )
}