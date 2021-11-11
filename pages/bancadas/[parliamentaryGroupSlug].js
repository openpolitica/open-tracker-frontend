import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import Breadcrumb from 'components/Breadcrumb';
import { getLogoByPGSlug } from 'utils';
import ListOfCongresspeople from 'components/ListOfCongresspeople';

const onlyActiveParliamentaryMembers = parliamentaryMember =>
  !parliamentaryMember.end_date;

export default function ParliamentaryGroup({
  parliamentaryGroup: { data: parliamentaryGroup },
}) {
  const {
    parliamentary_group_name: parliamentaryGroupName,
    parliamentary_group_slug: parliamentaryGroupSlug,
    congresspeople,
  } = parliamentaryGroup;

  const congresspeopleFiltered = congresspeople
    .filter(onlyActiveParliamentaryMembers)
    .map(({ congressperson, role_detail }) => ({
      cvId: congressperson.cv_id,
      fullName: `${congressperson.id_name} ${congressperson.id_first_surname} ${congressperson.id_second_surname}`,
      gender: congressperson.id_gender,
      isSpeaker: role_detail?.role_name === 'Portavoz',
      location: congressperson.location?.location_name.toLowerCase(),
      congresspersonSlug: congressperson.congressperson_slug,
      avatar: congressperson.plenary?.link_photo,
      logoParty: getLogoByPGSlug(parliamentaryGroupSlug),
    }));

  return (
    <SidebarLayout>
      <Breadcrumb
        routes={[
          { label: 'Inicio', route: '/bancadas' },
          { label: 'Bancadas', route: '/bancadas' },
          { label: parliamentaryGroupName, route: '#' },
        ]}
      />
      <CUI.HStack my="6" spacing="4">
        <CUI.Box>
          <CUI.Image
            w="10"
            mx="auto"
            src={getLogoByPGSlug(parliamentaryGroupSlug)}
          />
        </CUI.Box>
        <CUI.Heading size="md">Bancada {parliamentaryGroupName}</CUI.Heading>
      </CUI.HStack>
      <ListOfCongresspeople congresspeople={congresspeopleFiltered} />
    </SidebarLayout>
  );
}

export const getStaticPaths = () => {
  return fetch(`${process.env.api}parliamentary-group`)
    .then(data => data.json())
    .then(({ data: parliamentaryGroups }) => ({
      fallback: false,
      paths: parliamentaryGroups.map(parliamentaryGroup => ({
        params: {
          parliamentaryGroupSlug: parliamentaryGroup.parliamentary_group_slug,
        },
      })),
    }))
    .catch(error => ({ props: { error: error.toString() } }));
};

export const getStaticProps = ({ params }) =>
  fetch(
    `${process.env.api}parliamentary-group/${params?.parliamentaryGroupSlug}`,
  )
    .then(data => data.json())
    .then(parliamentaryGroup => ({ props: { parliamentaryGroup } }))
    .catch(error => ({ props: { error: error.toString() } }));
