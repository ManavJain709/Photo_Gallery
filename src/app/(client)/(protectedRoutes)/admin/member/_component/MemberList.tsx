"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Spinner,
} from "@nextui-org/react";
import { FaceEncodings } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Family } from "@/app/api/family/route";

const getKey = (pageIndex: number, previousPageData: any[]) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/api/member?skip=${pageIndex * 40}&take=40`; // SWR key
};

const fetcher: Fetcher<FaceEncodings[]> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function MemberList({ families }: { families: Family[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState<string>("");
  const [familyId, setFamilyId] = useState<string | null>();
  const { mutate, setSize, size } = useSWRInfinite(getKey, fetcher);
  const [selectedMember, setSelectedMember] = useState<FaceEncodings>();

  const [members, setMembers] = useState<FaceEncodings[]>([]);

  const [showLoading, setShowLoading] = useState(true);

  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    const fetchedMembers = await mutate();
    if (members.length === fetchedMembers?.flat().length)
      return setShowLoading(false);
    setMembers(fetchedMembers?.flat() ?? []);
    setSize(size + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  return (
    <div className="w-full flex flex-col">
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          setName("");
          setFamilyId(null);
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Image
                  alt={selectedMember?.id.toString()}
                  src={
                    "http://localhost:3000/unknow_faces/" +
                    selectedMember?.id +
                    ".jpg"
                  }
                  width={150}
                  loading="lazy"
                />
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Autocomplete
                  label="Select Family"
                  onSelectionChange={(e) => {
                    setFamilyId(e?.toString() ?? null);
                  }}
                >
                  {families.map((family) => (
                    <AutocompleteItem key={family.id} value={family.name}>
                      {family.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    console.log(familyId, name);
                    if (!familyId || !name)
                      return alert("Please fill all fields");
                    try {
                      await fetch(`/api/member/${selectedMember!.id}`, {
                        method: "POST",
                        body: JSON.stringify({
                          name,
                          FAMILYID: familyId,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });
                    } catch (error) {
                      console.error(error);
                      alert("An error occurred");
                      return;
                    }
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-row gap-3 flex-wrap">
        {members?.map((member) => (
          <Card key={member.id} className="shadow-none border">
            <CardHeader>
              <Image
                alt={member.id.toString()}
                src={"http://localhost:3000/unknow_faces/" + member.id + ".jpg"}
                width={150}
                loading="lazy"
              />
            </CardHeader>
            <CardBody>
              <p>{member.name}</p>
              <p>{member.FAMILYID}</p>
              <p>{member.id}</p>
              <Button
                onPress={() => {
                  setSelectedMember(member);
                  onOpen();
                }}
              >
                Add Member detail
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      {showLoading && <Spinner ref={ref} />}
      {/* <button onClick={loadMoreUsers}>Load more</button> */}
    </div>
  );
}
