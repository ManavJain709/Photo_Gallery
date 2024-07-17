import AllMembers from "../_components/AllMembers";
import Member from "../_components/Member";

const Page = ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  const { id } = searchParams;
  return <div className="p-10">{id ? <Member id={id} /> : <AllMembers />}</div>;
};

export default Page;
