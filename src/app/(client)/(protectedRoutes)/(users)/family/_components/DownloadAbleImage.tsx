import FileSaver from "file-saver";
import { Button, Image } from "@nextui-org/react";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

interface DownloadAbleImageProps {
  image_name: string;
  classname?: string;
}

const DownloadAbleImage: React.FC<DownloadAbleImageProps> = ({
  image_name,
  classname,
}) => {
  if (!image_name) return null;
  const imagePath = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}${image_name}`;
  return (
    <div className="relative inline-block">
      <Image
        src={`${imagePath}/thumbnail`}
        height={208}
        width={0}
        loading="lazy"
        fallbackSrc={"./placeholder.png"}
        alt={image_name}
        className={classname ?? "h-52 w-auto"}
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

export default DownloadAbleImage;
