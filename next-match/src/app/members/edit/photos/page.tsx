import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Update Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3 p-5">
            {photos && photos.map(photo => (
                <div key={photo.id} className="relative">
                    <Image 
                        width={220}
                        height={220}
                        src={photo.url}
                        alt='Image of '
                    />
                </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
