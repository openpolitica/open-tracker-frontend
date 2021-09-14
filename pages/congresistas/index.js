import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import CongresspersonCard from 'components/CongresspersonCard';
import Breadcrumb from 'components/Breadcrumb';

const routes = [
  { label: 'Inicio', route: '/' },
  { label: 'Congresistas', route: '/congresistas' },
];

export default function Congresspeople({ congresspeople }) {
  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />
      <CUI.Heading
        as="h1"
        fontSize={{ base: 'xl', md: '2xl' }}
        mt="6"
        mb="2"
        color="secondary.900">
        Congresistas para el periodo legislativo 2021 – 2026
      </CUI.Heading>
      <CUI.Text mb="5" color="secondary.500">
        Estos son los congresistas que te representarán durante este periodo.
      </CUI.Text>
      {/* TODO: Add select component and isSuspenderMember */}
      <CUI.Wrap spacing="4">
        {congresspeople.map(congressperson => (
          <CUI.WrapItem key={congressperson.cv_id}>
            <CongresspersonCard
              congresspersonSlug={congressperson.congressperson_slug}
              avatar={congressperson.link_photo}
              logoParty={
                congressperson.congressperson_parties?.[0]?.political_party
                  ?.political_party_logo_url
              }
              fullName={`${congressperson.id_name} ${congressperson.id_first_surname} ${congressperson.id_second_surname}`}
              gender={congressperson.id_gender}
              isActiveMember={
                congressperson?.congressperson_parliamentary_groups?.[0]
                  ?.role_detail?.role_name === 'Portavoz'
              }
              location={congressperson.location?.location_name}
              // isSuspendedMember={}
            />
          </CUI.WrapItem>
        ))}
      </CUI.Wrap>
    </SidebarLayout>
  );
}

export const getStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.api}congressperson`);
    const data = await response.json();
    const congresspeople = data.data.filter(congressperson =>
      congressperson.position_elected.includes('CONGRESISTA'),
    );

    if (!congresspeople) {
      return { notFound: true };
    }
    return {
      props: { congresspeople },
    };
  } catch {
    return { notFound: true };
  }
};
