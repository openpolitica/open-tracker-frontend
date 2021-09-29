import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import CongresspersonCard from 'components/CongresspersonCard';
import Breadcrumb from 'components/Breadcrumb';

const onlyActiveParliamentaryMembers = parliamentaryMember =>
  !parliamentaryMember.end_date;

export default function ParliamentaryGroup({
  parliamentaryGroup: { data: parliamentaryGroup },
}) {
  const {
    parliamentary_group_name: parliamentaryGroupName,
    parliamentary_group_url: parliamentaryGroupLogoURL,
    congresspeople,
  } = parliamentaryGroup;

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
          <CUI.Image w="10" mx="auto" src={parliamentaryGroupLogoURL} />
        </CUI.Box>
        <CUI.Heading size="md">Bancada {parliamentaryGroupName}</CUI.Heading>
      </CUI.HStack>
      <CUI.Wrap spacing="4">
        {congresspeople.filter(onlyActiveParliamentaryMembers).map(
          ({
            congressperson: {
              cv_id,
              congressperson_slug,
              id_name,
              id_second_surname,
              plenary,
              location: { location_name },
              residence_ubigeo,
            },
          }) => (
            <CUI.WrapItem key={cv_id}>
              <CongresspersonCard
                avatar={plenary.link_photo}
                congresspersonSlug={congressperson_slug}
                fullName={`${id_name} ${id_second_surname}`}
                location={location_name}
                logoParty={parliamentaryGroupLogoURL}
              />
            </CUI.WrapItem>
          ),
        )}
      </CUI.Wrap>
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
