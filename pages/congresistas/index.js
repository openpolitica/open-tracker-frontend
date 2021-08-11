import SidebarLayout from 'components/layout/SidebarLayout';
import CongresspersonProfileCard from 'components/CongresspersonProfileCard';

export default function Congresspeople() {
  return (
    <SidebarLayout>
      <h1>Congresistas</h1>
      <CongresspersonProfileCard />
    </SidebarLayout>
  );
}
