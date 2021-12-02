import * as CUI from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import SidebarLayout from 'components/layout/SidebarLayout';
import ListOfCongresspeople from 'components/ListOfCongresspeople';
import BillCard from 'components/BillCard';
import { getLogoByPGSlug, groupByKey } from 'utils';

export default function Home({ congresspeople }) {
  return (
    <SidebarLayout>
      <CUI.Flex
        position="relative"
        w="full"
        h={{ base: '19.50rem', md: '14.75rem' }}
        justify="space-between"
        align="center"
        borderRadius="md"
        overflow="hidden"
        direction={{ base: 'column', md: 'row' }}
        pt={{ base: 10, md: 0 }}
        pr={{ base: 4, md: 16 }}
        pl={{ base: 4, md: 12 }}
        backgroundImage="url(/images/home-bg.png)"
        backgroundSize="cover"
        backgroundPosition={{ base: 'left', md: 'center' }}>
        <CUI.Heading
          as="h1"
          maxW={{ base: '85%', md: '55%' }}
          textAlign={{ base: 'center', md: 'left' }}
          color="white"
          fontSize={{ base: 'xl', md: '3xl' }}>
          La información mas relevante sobre el congreso peruano en un solo
          lugar.
        </CUI.Heading>
        <CUI.Image
          position={{ base: 'relative', md: 'absolute' }}
          bottom={{ md: -14 }}
          right={{ md: '5%' }}
          maxW={{ md: '40%' }}
          mt={{ base: 6, md: 0 }}
          src="/images/home-illustration.png"
          alt="Hero Image"
          fit="scale-down"
          boxShadow="2xl"
        />
      </CUI.Flex>
      <CUI.Box mt="10" backgroundColor="blue.50" p="10">
        <CUI.Heading as="h2" mb="1" color="secondary.700" fontSize="xl">
          Proyectos de Ley
        </CUI.Heading>
        <CUI.Text fontSize="md" maxWidth="32rem" mb="4">
          Conoce los proyectos presentados en las comisiones del Congreso, el
          estado en el que se encuentran y sus respectivos autores.
        </CUI.Text>
        <CUI.Button
          as="a"
          colorScheme="teal"
          href="proyectos-de-ley"
          mb="6"
          rightIcon={<ArrowForwardIcon />}
          size="sm">
          Explorar los proyectos
        </CUI.Button>
        <CUI.Text
          display={{ xl: 'block', lg: 'none', md: 'none', sm: 'none' }}
          fontSize="md"
          fontWeight="bold"
          mb="2">
          Últimas actualizaciones
        </CUI.Text>
        <CUI.HStack
          display={{ xl: 'flex', lg: 'none', md: 'none', sm: 'none' }}
          spacing="4">
          {Array.from({ length: 3 }).map((_, index) => (
            <BillCard key={index} />
          ))}
        </CUI.HStack>
      </CUI.Box>
      <CUI.Box mt="10">
        <CUI.Heading as="h2" mb="4" color="secondary.700" fontSize="xl">
          Congresistas más votados
        </CUI.Heading>
        <ListOfCongresspeople congresspeople={congresspeople} />
      </CUI.Box>
    </SidebarLayout>
  );
}

export const getStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.api}congressperson`);
    const data = await response.json();
    const congresspeople = data.data
      .filter(congressperson =>
        congressperson.position_elected.includes('CONGRESISTA'),
      )
      .map(congressperson => ({
        cvId: congressperson.cv_id,
        fullName: `${congressperson.id_name} ${congressperson.id_first_surname} ${congressperson.id_second_surname}`,
        gender: congressperson.id_gender,
        isSpeaker:
          congressperson?.congressperson_parliamentary_groups?.find(
            parliamentaryGroup => parliamentaryGroup.end_date === null,
          )?.role_detail?.role_name === 'Portavoz',
        location: congressperson.location?.location_name.toLowerCase(),
        congresspersonSlug: congressperson.congressperson_slug,
        avatar: congressperson.plenary.link_photo,
        logoParty: getLogoByPGSlug(
          congressperson.congressperson_parliamentary_groups?.find(
            parliamentaryGroup => parliamentaryGroup.end_date === null,
          ).parliamentary_group.parliamentary_group_slug,
        ),
        votes: congressperson.plenary.vote,
      }));

    const congresspeopleGroupByLocation = groupByKey(
      congresspeople,
      'location',
    );

    const sortedByMostVotedCongresspersonByLocation = Object.entries(
      congresspeopleGroupByLocation,
    ).map(([location, congressperson]) =>
      congressperson.sort((a, b) => b.votes - a.votes),
    );

    const mostVotedCongresspersonByLocation =
      sortedByMostVotedCongresspersonByLocation
        .map(item => item[0])
        .sort((a, b) => a.location.localeCompare(b.location));

    return {
      props: { congresspeople: mostVotedCongresspersonByLocation },
    };
  } catch (err) {
    return { props: { error: err.toString() } };
  }
};
