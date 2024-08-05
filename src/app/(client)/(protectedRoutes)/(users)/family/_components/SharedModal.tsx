"use client";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeftIcon, ArrowRight, X } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import FullSizeImage from "./FullSizeImage";
import { useEffect, useState } from "react";
import { Avatar, Chip } from "@nextui-org/react";

type SharedModalProps = {
  index: number;
  images: any[];
  currentPhoto?: any;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
};

type Member = {
  id: number;
  name: string;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const isMobileScreen = window.innerWidth < 640;

  const [peopleInPhoto, setPeopleInPhoto] = useState<Member[]>([]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage = images ? images[index] : currentPhoto;

  const fetchPeopeleInPhoto = async (imageId: string) => {
    const response = await fetch(`/api/member?image_name=${imageId}`);
    const data = await response.json();
    console.log(data.members);
    setPeopleInPhoto(data.members);
  };

  useEffect(() => {
    setPeopleInPhoto([]);
    const imageId = images[index]?.IMAGEID;

    if (imageId) {
      fetchPeopeleInPhoto(imageId);
    }
  }, [index]);

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="flex items-center gap-2 p-3 text-white justify-start mt-5 ml-10">
        <button
          onClick={() => closeModal()}
          className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col h-full justify-center items-center">
        <div className="z-50 flex items-center" {...handlers}>
          {index > 0 && !isMobileScreen && (
            <button
              className="rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changePhotoId(index - 1)}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
          )}
          {/* Main image */}
          <div className="flex items-center justify-center px-2">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <FullSizeImage
                  image_name={currentImage?.IMAGEID}
                  isMobileScreen={isMobileScreen}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {index + 1 < images.length && !isMobileScreen && (
            <button
              className=" rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg  hover:bg-black/75 hover:text-white focus:outline-none"
              onClick={() => changePhotoId(index + 1)}
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className="flex flex-row gap-2 flex-wrap p-2 items-center justify-center">
          {peopleInPhoto.map((person) => (
            <div className="flex flex-row items-center justify-center space-x-2 border-2 border-green-300 p-[6px] rounded-full">
              <Avatar
                size="md"
                name={person.name}
                src={"./unknow_faces/" + person.id + ".jpg"}
              />
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
