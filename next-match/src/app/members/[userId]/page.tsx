import { getMemberByUserId } from "@/app/actions/memberActions"
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";


export default async function MemberDetailedPage({params}: {params: {userId: string}}) {
  const {userId} = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        {member.description}
      </CardBody>
    </>
  )
}