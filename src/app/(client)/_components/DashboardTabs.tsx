import { Tab, Tabs } from "@nextui-org/react";

const DashboardTabs = ({ pathname }: { pathname: string }) => {
  console.log(pathname);
  return (
    <Tabs
      selectedKey={pathname}
      variant="bordered"
      aria-label="Tabs"
      radius="md"
    >
      <Tab key="/dashboard" id="/dashboard" href="/dashboard" title="Family" />
      <Tab key="/member" id="/member" href="/member" title="Member" />
    </Tabs>
  );
};

export default DashboardTabs;
