"use client";
import { Image } from "@nextui-org/react";
import FileSaver from "file-saver";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";

interface DownloadAbleImageProps {
  image_name: string;
  isMobileScreen: boolean;
}

const FullSizeImage: React.FC<DownloadAbleImageProps> = ({
  image_name,
  isMobileScreen,
}) => {
  if (!image_name) return null;
  const imagePath = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}${image_name}`;
  return (
    <div className="relative inline-block">
      <Image
        src={`${imagePath}/public`}
        height={isMobileScreen ? "auto" : 853}
        width={isMobileScreen ? "100%" : 0}
        alt={image_name}
        className={isMobileScreen ? "h-auto w-full" : "h-96 w-auto"}
      />
      <DownloadIcon
        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white z-50 p-1 rounded-md hover:cursor-pointer"
        onClick={() => {
          FileSaver.saveAs(`${imagePath}/public`, image_name);
        }}
      />
    </div>
  );
};

export default FullSizeImage;
