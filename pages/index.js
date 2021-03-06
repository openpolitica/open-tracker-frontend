import * as CUI from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import SidebarLayout from 'components/layout/SidebarLayout';
import ListOfCongresspeople from 'components/ListOfCongresspeople';
import BillCard from 'components/BillCard';
import { getLogoByPGSlug, groupByKey } from 'utils';
import NextCUILink from 'components/NextCUILink';
import last from 'lodash.last';
import { useBills } from 'pages/proyectos-de-ley';
import BannerArrow from 'public/images/icons/banner-arrow.svg';

export default function Home({ congresspeople }) {
  const { isBillsLoading, isBillsSuccess, bills } = useBills();

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
          w={{ base: '85%', md: '26rem' }}
          mb={{ md: '6' }}
          textAlign={{ base: 'center', md: 'left' }}
          fontFamily="ClashDisplay"
          fontSize={{ base: '1.3rem', md: '2rem' }}>
          <CUI.Box mb="2" display={{ base: 'none', md: 'block' }}>
            <BannerArrow />
          </CUI.Box>
          Toda la información sobre el Congreso peruano en un solo lugar.
        </CUI.Heading>
        <CUI.Image
          position={{ base: 'relative', md: 'absolute' }}
          bottom={4}
          right={{ md: '5%' }}
          maxW={{ md: '40%' }}
          mt={{ base: 6, md: 0 }}
          src="/images/home-illustration.svg"
          alt="Hero Image"
          fit="scale-down"
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
          as={NextCUILink}
          variant="solid"
          href="/proyectos-de-ley"
          mb="6"
          rightIcon={<ArrowForwardIcon />}
          size="sm"
          _hover={{
            textDecoration: 'none',
            bg: 'primary.600',
          }}>
          Explorar los proyectos
        </CUI.Button>
        <CUI.Text
          display={{ base: 'none', xl: 'block' }}
          fontSize="md"
          fontWeight="bold"
          mb="2">
          Últimas actualizaciones
        </CUI.Text>
        <CUI.Box display={{ base: 'none', xl: 'block' }}>
          {isBillsLoading ? (
            <CUI.Box textAlign="center">
              <CUI.Spinner color="primary" />
            </CUI.Box>
          ) : isBillsSuccess && bills.length ? (
            <CUI.HStack align="stretch" as="ul" spacing="4">
              {bills
                .slice(0, 3)
                .map(
                  ({
                    id,
                    last_status,
                    authorship,
                    title,
                    last_committee,
                    presentation_date,
                    tracking,
                  }) => (
                    <CUI.Flex as="li" key={id} flex="1">
                      <BillCard
                        authorship={authorship
                          .filter(author => author.authorship_type === 'AUTOR')
                          .map(
                            ({
                              congressperson: {
                                congressperson_slug,
                                id_name,
                                id_first_surname,
                                id_second_surname,
                              },
                            }) => ({
                              slug: congressperson_slug,
                              name: `${id_name} ${id_first_surname} ${id_second_surname}`,
                            }),
                          )}
                        billId={id}
                        billTitle={title}
                        committeeName={last_committee?.committee_name ?? void 0}
                        publicationDate={presentation_date}
                        status={last_status ?? ''}
                        lastUpdate={last(tracking).date}
                      />
                    </CUI.Flex>
                  ),
                )}
            </CUI.HStack>
          ) : null}
        </CUI.Box>
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
