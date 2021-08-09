import SidebarLayout from 'components/layout/SidebarLayout';
import ParliamentaryGroupCard from 'components/ParliamentaryGroupCard';

export default function Home() {
  return (
    <SidebarLayout>
      <h1>HomePage</h1>
      <ParliamentaryGroupCard />
    </SidebarLayout>
  );
}
