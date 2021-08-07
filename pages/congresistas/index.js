import SidebarLayout from 'components/layout/SidebarLayout';
import CongressmanProfileCard from 'components/CongressmanProfileCard';

export default function Congresspeople() {
  return (
    <SidebarLayout>
      <h1>Congresistas</h1>
      <CongressmanProfileCard />
    </SidebarLayout>
  );
}
