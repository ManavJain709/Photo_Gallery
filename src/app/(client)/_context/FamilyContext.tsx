import { createContext } from "react";

export type FamilyDetails = {
  name: string | null;
  family: string;
  result: {
    image_name: string;
  }[];
  members: {
    id: number;
    name: string | null;
  }[];
};

type FamilyContextType = {
  isLoading: boolean;
  error: any;
  data: FamilyDetails | null;
  fetchMember: (id: number) => Promise<void>;
  isFamilyMember: (id: number) => boolean;
};

const FamilyContext = createContext<FamilyContextType>({
  isLoading: true,
  error: null,
  data: null,
  fetchMember: async () => {},
  isFamilyMember: () => false,
});

export default FamilyContext;
