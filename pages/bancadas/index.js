import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import ParliamentaryGroupCard from 'components/ParliamentaryGroupCard';
import Breadcrumb from 'components/Breadcrumb';
import { getLogoByPGSlug } from 'utils';

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

const onlyActiveParliamentaryGroups = parliamentaryGroup =>
  !parliamentaryGroup.end_date;

const notEmptyParliamentaryGroups = parliamentaryGroup =>
  +parliamentaryGroup.count > 0;

export default function ParlimentaryGroups({ parliamentaryGroups }) {
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
      <CUI.Wrap spacing="4" direction={{ base: 'column', md: 'row' }}>
        {parliamentaryGroups
          .filter(onlyActiveParliamentaryGroups)
          .filter(notEmptyParliamentaryGroups)
          .map(
            ({
              count,
              parliamentary_group_id,
              parliamentary_group_name,
              parliamentary_group_slug,
            }) => (
              <CUI.WrapItem
                key={parliamentary_group_id}
                display={{ base: 'block', md: 'flex' }}>
                <ParliamentaryGroupCard
                  partyLogoURL={getLogoByPGSlug(parliamentary_group_slug)}
                  members={count}
                  partyName={parliamentary_group_name}
                  parliamentaryGroupId={parliamentary_group_slug}
                />
              </CUI.WrapItem>
            ),
          )}
      </CUI.Wrap>
    </SidebarLayout>
  );
}

export const getStaticProps = () =>
  fetch(`${process.env.api}parliamentary-group`)
    .then(data => data.json())
    .then(data => ({ props: { parliamentaryGroups: data.data } }))
    .catch(error => ({ props: { error: error.toString() } }));
