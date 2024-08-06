"use client";
import { motion } from "framer-motion";
import { use, useEffect, useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import { Modal, ModalContent } from "@nextui-org/react";

export default function ImageModal({
  images,
  photoId,
  showModal,
  onClose,
}: {
  images: any[];
  photoId: number;
  showModal: boolean;
  onClose?: () => void;
}) {
  const index = photoId;
  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    onClose?.();
  }

  useEffect(() => {
    setCurIndex(photoId ? Number(photoId) : 0);
  }, [photoId, showModal]);

  function changePhotoId(newVal: number) {
    if (newVal > curIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
  }

  useKeypress("ArrowRight", () => {
    if (curIndex + 1 < images.length) {
      changePhotoId(curIndex + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (curIndex > 0) {
      changePhotoId(curIndex - 1);
    }
  });

  return (
    <Modal isOpen={showModal} onClose={handleClose} size="full">
      <ModalContent>
        <SharedModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={() => {
            handleClose();
          }}
          navigation={true}
        />
      </ModalContent>
    </Modal>
  );
}
