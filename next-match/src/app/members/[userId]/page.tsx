import { getMemberByUserId } from "@/app/actions/memberActions"
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";


export default async function MemberDetailedPage({params}: {params: {userId: string}}) {
  const {userId} = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <CardInnerWrapper 
      header='Profile'
      body={<div>{member.description}</div>}
    />
  )
}