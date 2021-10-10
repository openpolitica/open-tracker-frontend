import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import CongresspersonProfileCard from 'components/CongresspersonProfileCard';
import Breadcrumb from 'components/Breadcrumb';
import { capitalizeNames, groupByKey } from 'utils';
import CongresspersonInfoTab from 'components/CongresspersonInfoTab';

const getMonth = dateString => {
  return dateString.substring(
    dateString.indexOf('/') + 1,
    dateString.lastIndexOf('/'),
  );
};

const getDay = dateString => {
  return dateString.substring(0, dateString.indexOf('/'));
};

const getYear = dateString => {
  return dateString && dateString.includes('/')
    ? dateString.substring(dateString.lastIndexOf('/') + 1)
    : 'N/A';
};

const getAge = dateString => {
  const year = getYear(dateString);
  const month = getMonth(dateString);
  const day = getDay(dateString);
  const birthday = new Date(`${year}-${month}-${day}`);
  const ageDiffMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default function Congresspeople({ congressperson }) {
  const parliamentaryGroup =
    congressperson.congressperson_parliamentary_groups?.find(
      parliamentaryGroup => parliamentaryGroup.end_date === null,
    );
  const parliamentaryGroupName =
    parliamentaryGroup?.parliamentary_group.parliamentary_group_name;

  const parliamentaryGroupSlug =
    parliamentaryGroup?.parliamentary_group.parliamentary_group_slug;

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

  const birthPlace = capitalizeNames(
    `${congressperson.birth_province}, ${congressperson.birth_department}`,
  );
  const residencePlace = capitalizeNames(
    `${congressperson.residence_province}, ${congressperson.residence_department}`,
  );

  const educationList = congressperson.education
    ?.map(ed => ({
      educationPlace: capitalizeNames(ed.study_centre ?? ''),
      educationCareer: capitalizeNames(ed.career ?? ''),
    }))
    .filter(ed => ed.educationPlace && ed.educationCareer);

  const politicalHistory = congressperson.affiliations?.length
    ? congressperson.affiliations.map(item => ({
        year: getYear(item.affiliation_begin),
        politicalPartyName: item.political_party
          ? `Partido ${capitalizeNames(item.political_party)}`
          : null,
      }))
    : [];

  const politicalHistoryGroupByYear = groupByKey(politicalHistory, 'year');

  const judgments = congressperson.judgments
    ?.map(item => ({
      crime: item.crime,
      type: item.type,
    }))
    .filter(item => item.crime);
  const judgmentsGroupByType = groupByKey(judgments, 'type');

  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />
      <CUI.VStack align="stretch" spacing="10" mt="6" maxW="41rem" w="full">
        <CongresspersonProfileCard
          avatarUrl={congressperson.plenary.link_photo}
          fullName={`${congressperson.id_name} ${congressperson.id_first_surname} ${congressperson.id_second_surname}`}
          gender={congressperson.id_gender}
          location={congressperson.location?.location_name}
          politicalPartyName={congressperson.political_party_name}
          parliamentaryGroupName={parliamentaryGroupName}
          parliamentaryGroupSlug={parliamentaryGroupSlug}
          isActiveMember={
            parliamentaryGroup?.role_detail?.role_name === 'Portavoz'
          }
          socialNetworkList={congressperson?.social_networks
            ?.map(socialNetwork => ({
              socialNetworkUrl: socialNetwork?.social_network_url,
              socialNetworkName:
                socialNetwork.social_network?.social_network_name.toLowerCase(),
            }))
            .filter(network => network.socialNetworkUrl)}
          // isSuspendedMember={}
          webPageLink={congressperson?.plenary?.web_page}
          emailAddress={congressperson?.plenary?.email}
        />
        <CongresspersonInfoTab
          congresspersonData={{
            age: getAge(congressperson.birth_date),
            birthPlace,
            residencePlace,
            topEducationType: capitalizeNames(
              congressperson.extra_data?.education_higher_level ?? '',
            ),
            educationList,
            politicalHistory: politicalHistoryGroupByYear,
            judgments: judgmentsGroupByType,
          }}
        />
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
