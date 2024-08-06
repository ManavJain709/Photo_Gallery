import { Tab, Tabs } from "@nextui-org/react";

const DashboardTabs = ({ pathname }: { pathname: string }) => {
  return (
    <Tabs
      selectedKey={pathname}
      variant="bordered"
      aria-label="Tabs"
      radius="md"
    >
      <Tab
        key="/admin/dashboard"
        id="/admin/dashboard"
        href="/admin/dashboard"
        title="Family"
      />
      <Tab
        key="/admin/member"
        id="/admin/member"
        href="/admin/member"
        title="Member"
      />
    </Tabs>
  );
};

export default DashboardTabs;
