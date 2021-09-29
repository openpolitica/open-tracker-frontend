import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';
import CongresspersonCard from 'components/CongresspersonCard';
import Breadcrumb from 'components/Breadcrumb';
import { capitalizeNames } from 'utils';

const routes = [
  { label: 'Inicio', route: '/bancadas' },
  { label: 'Congresistas', route: '/congresistas' },
];

const electoralDistrict = congressperson =>
  congressperson?.location?.location_name?.toLowerCase();

const electoralDistrictsFromCongresspeople = congresspeople =>
  congresspeople
    .reduce(
      (prev, current) =>
        prev.includes(electoralDistrict(current))
          ? prev
          : [...prev, electoralDistrict(current)],
      [],
    )
    .sort();

const filterCongresspeopleByElectoralDistrict = (congresspeople, district) => {
  if (!district) {
    return congresspeople;
  }
  return congresspeople.filter(
    congressperson => electoralDistrict(congressperson) === district,
  );
};

const isAValidElectoralDistrict = (electoralDistricts, electoralDistrict) =>
  electoralDistricts.includes(electoralDistrict);

export default function Congresspeople({ congresspeople }) {
  const router = useRouter();
  const [filterSubset, setFilterSubset] = useState([]);
  const [districtFilter, setDistrictFilter] = useState(null);

  useEffect(() => {
    if (districtFilter === '') {
      router.push('congresistas', undefined, { shallow: true });
      return;
    }
    if (districtFilter) {
      router.push(`congresistas/?departamento=${districtFilter}`, undefined, {
        shallow: true,
      });
    }
  }, [districtFilter]);

  useEffect(() => {
    if (
      isAValidElectoralDistrict(
        electoralDistrictsFromCongresspeople(congresspeople),
        router.query.departamento,
      )
    ) {
      setDistrictFilter(router.query.departamento);
      setFilterSubset(
        filterCongresspeopleByElectoralDistrict(
          congresspeople,
          router.query.departamento,
        ),
      );
      return;
    }
    setFilterSubset(congresspeople);
  }, [router.query.departamento]);

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
      {/* TODO: Add isSuspenderMember */}
      <CUI.Text color="secondary.700" lineHeight="6" mb="2">
        Filtra por departamento
      </CUI.Text>
      <CUI.Select
        onChange={event => setDistrictFilter(event.target.value)}
        value={districtFilter ?? ''}
        cursor="pointer"
        w="64"
        mb="4">
        <option key="no-select" value="">
          Ver de todo el país
        </option>
        {electoralDistrictsFromCongresspeople(congresspeople).map(district => (
          <option key={district} value={district.toLowerCase()}>
            {capitalizeNames(district)}
          </option>
        ))}
      </CUI.Select>
      <CUI.Wrap spacing="4">
        {filterSubset.map(congressperson => (
          <CUI.WrapItem key={congressperson.cv_id}>
            <CongresspersonCard
              congresspersonSlug={congressperson.congressperson_slug}
              avatar={congressperson.plenary.link_photo}
              logoParty={
                congressperson.congressperson_parties?.[0]?.political_party
                  ?.political_party_logo_url
              }
              fullName={`${congressperson.id_name} ${congressperson.id_first_surname} ${congressperson.id_second_surname}`}
              gender={congressperson.id_gender}
              isSpeaker={
                congressperson?.congressperson_parliamentary_groups?.find(
                  parliamentaryGroup => parliamentaryGroup.end_date === null,
                )?.role_detail?.role_name === 'Portavoz'
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
