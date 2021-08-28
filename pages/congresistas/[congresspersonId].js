import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import CongresspersonProfileCard from 'components/CongresspersonProfileCard';
import Breadcrumb from 'components/Breadcrumb';
import { getCongresspeople, getCongressperson } from 'utils/congresspeople';
import { capitalizeStrings } from 'utils/misc';

export default function Congresspeople({ congressperson }) {
  const routes = [
    { label: 'Inicio', route: '/' },
    { label: 'Bancadas', route: '/bancadas' },
    {
      // TODO: add slug in route
      label: `Bancada ${capitalizeStrings(
        congressperson.congressperson_parliamentary_groups?.[0]
          .parliamentary_group?.parliamentary_group_name,
      )}`,
      route: '/bancadas/slug-party-name',
    },
    {
      label: capitalizeStrings(
        `${congressperson?.id_name} ${congressperson?.id_first_surname}`,
      ),
      route: '#',
    },
  ];

  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />
      <CUI.Box mt="6">
        <CongresspersonProfileCard
          congresspersonId={congressperson.cv_id}
          avatarUrl={congressperson.link_photo}
          fullName={`${congressperson.id_name} ${congressperson.id_first_surname} ${congressperson.id_second_surname}`}
          location={congressperson.location?.location_name}
          politicalPartyName={congressperson.political_party_name}
          parliamentaryGroup={
            congressperson.congressperson_parliamentary_groups?.[0]
              .parliamentary_group?.parliamentary_group_name
          }
          isActiveMember={
            congressperson?.congressperson_parliamentary_groups?.[0]
              ?.role_detail?.role_name === 'Portavoz'
          }
          // isSuspendedMember={}
          // parliamentaryGroupSlug=""
        />
      </CUI.Box>
    </SidebarLayout>
  );
}

export const getStaticPaths = async () => {
  const entries = await getCongresspeople();
  const paths = entries.map(congressperson => ({
    params: {
      congresspersonId: congressperson.cv_id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const congresspersonId = params?.congresspersonId;

  try {
    const congressperson = await getCongressperson(congresspersonId);
    if (!congressperson) {
      return { notFound: true };
    }
    return {
      props: { congressperson },
    };
  } catch {
    return { notFound: true };
  }
};
