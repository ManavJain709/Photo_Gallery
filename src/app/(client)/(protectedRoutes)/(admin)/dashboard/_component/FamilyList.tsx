import { FamilyDetails } from "@/app/api/family/[id]/route";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";

const FamilyList = ({ families }: { families: FamilyDetails[] }) => {
  return (
    <div className="flex flex-wrap gap-4 w-full p-10">
      {families.map((family) => (
        <Card key={family.family} className="shadow-none border">
          <CardHeader>{family.name}</CardHeader>
          <Divider />
          <CardBody>
            <Image
              alt={family.result?.[0]?.image_name ?? family.family}
              src={family.result?.[0]?.image_name}
              width={150}
              loading="lazy"
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex flex-col">
              {family.members?.map((member) => (
                <div key={member.id} className="flex flex-row gap-3 flex-wrap">
                  <p>{member.name}</p>
                  <p>{member.id}</p>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FamilyList;
