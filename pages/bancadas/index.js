import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import ParliamentaryGroupCard from 'components/ParliamentaryGroupCard';
import Breadcrumb from 'components/Breadcrumb';

const messages = {
  infoAlert: {
    title: '¿Cómo se conforma una bancada?',
    description:
      'Según el reglamento del congreso, para formar una bancada se debe tener al menos 5 integrantes.',
  },
};

const Alert = ({ title, description, type = 'info' }) => (
  <CUI.Alert status={type} variant="left-accent">
    <CUI.AlertIcon />
    <CUI.Box flex="1">
      <CUI.AlertTitle>{title}</CUI.AlertTitle>
      <CUI.AlertDescription display="block">{description}</CUI.AlertDescription>
    </CUI.Box>
  </CUI.Alert>
);

export default function ParlimentaryGroup({ parliamentaryGroups }) {
  return (
    <SidebarLayout>
      <Breadcrumb
        routes={[
          { label: 'Inicio', route: '/' },
          { label: 'Bancadas', route: '/bancadas' },
        ]}
      />
      <CUI.Box display="grid" gridRowGap="2" my="6">
        <CUI.Heading size="md">
          Bancadas para el periodo legislativo 2021 – 2026
        </CUI.Heading>
        <CUI.Text fontSize="md">
          Estos son los congresistas que te representarán durante este periodo.
        </CUI.Text>
        <Alert {...messages.infoAlert} />
      </CUI.Box>
      <CUI.Wrap spacing="4">
        {parliamentaryGroups
          .filter(parliamentaryGroup => !parliamentaryGroup.end_date)
          .map(activeParliamentaryGroup => (
            <ParliamentaryGroupCard
              key={activeParliamentaryGroup.parliamentary_group_id}
              nameParty={activeParliamentaryGroup.parliamentary_group_name}
            />
          ))}
      </CUI.Wrap>
    </SidebarLayout>
  );
}

export const getStaticProps = () =>
  fetch(`${process.env.api}parliamentary-group`)
    .then(data => data.json())
    .then(data => ({ props: { parliamentaryGroups: data.data } }))
    .catch(error => ({ props: { error: error.toString() } }));
