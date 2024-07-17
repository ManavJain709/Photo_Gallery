import { Tab, Tabs } from "@nextui-org/react";

const FamilyTabs = ({ pathname }: { pathname: string }) => {
  return (
    <Tabs
      selectedKey={pathname}
      variant="bordered"
      aria-label="Tabs"
      radius="md"
    >
      <Tab key="/family" id="/family" href="/family" title="Family" />
      <Tab
        key="/family/member"
        id="/family/member"
        href="/family/member"
        title="Member"
      />
    </Tabs>
  );
};

export default FamilyTabs;
