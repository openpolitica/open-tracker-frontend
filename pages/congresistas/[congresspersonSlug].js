import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import CongresspersonProfileCard from 'components/CongresspersonProfileCard';
import Breadcrumb from 'components/Breadcrumb';
import { capitalizeNames } from 'utils';
import CongresspersonInfoTab from 'components/CongresspersonInfoTab';

export default function Congresspeople({ congressperson }) {
  const parliamentaryGroupName =
    congressperson.congressperson_parliamentary_groups?.[0].parliamentary_group
      ?.parliamentary_group_name;

  const parliamentaryGroupSlug =
    congressperson.congressperson_parliamentary_groups?.[0].parliamentary_group
      ?.parliamentary_group_slug;

  const routes = [
    { label: 'Inicio', route: '/' },
    { label: 'Bancadas', route: '/bancadas' },
    {
      label: `Bancada ${capitalizeNames(parliamentaryGroupName)}`,
      route: `/bancadas/${parliamentaryGroupSlug}`,
    },
    {
      label: capitalizeNames(
        `${congressperson.id_name} ${congressperson.id_first_surname}`,
      ),
      route: '#',
    },
  ];

  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />
      <CUI.VStack align="stretch" spacing="10" mt="6" maxW="41rem" w="full">
        <CongresspersonProfileCard
          avatarUrl={congressperson.link_photo}
          fullName={`${congressperson.id_name} ${congressperson.id_first_surname} ${congressperson.id_second_surname}`}
          gender={congressperson.id_gender}
          location={congressperson.location?.location_name}
          politicalPartyName={congressperson.political_party_name}
          parliamentaryGroupName={parliamentaryGroupName}
          parliamentaryGroupSlug={parliamentaryGroupSlug}
          isActiveMember={
            congressperson?.congressperson_parliamentary_groups?.[0]
              ?.role_detail?.role_name === 'Portavoz'
          }
          socialNetworkList={congressperson?.social_networks
            ?.map(socialNetwork => ({
              socialNetworkUrl: socialNetwork?.social_network_url,
              socialNetworkName:
                socialNetwork.social_network?.social_network_name.toLowerCase(),
            }))
            .filter(network => network.socialNetworkUrl)}
          // isSuspendedMember={}
        />
        <CongresspersonInfoTab />
      </CUI.VStack>
    </SidebarLayout>
  );
}

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.api}congressperson`);
  const data = await response.json();
  const entries = data.data.filter(congressperson =>
    congressperson.position_elected.includes('CONGRESISTA'),
  );
  const paths = entries.map(congressperson => ({
    params: {
      congresspersonSlug: congressperson.congressperson_slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const congresspersonSlug = params?.congresspersonSlug;
  try {
    const response = await fetch(
      `${process.env.api}congressperson/${congresspersonSlug}`,
    );
    const data = await response.json();
    const congressperson = data.data;
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
