import * as CUI from '@chakra-ui/react';
import last from 'lodash.last';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import BillCard from 'components/BillCard';
import Pagination from 'components/Pagination';
import { useQuery } from 'react-query';

const routes = [
  { label: 'Inicio', route: '/' },
  { label: 'Proyectos de ley', route: '/proyectos-de-ley' },
];

const useCommittees = () => {
  const response = useQuery({
    queryKey: 'committees',
    queryFn: async () =>
      fetch(`${process.env.api}committee`).then(res => res.json()),
  });
  return {
    ...response,
    isCommitteesLoading: response.isLoading,
    isCommitteesSuccess: response.isSuccess,
    committees: response.data?.data ?? [],
  };
};

// TODO: remove placeholders
const legislaturaOptions = [
  'Julio 2021 - Diciembre 2022',
  'junio 2021 - Octubre 2022',
];
const estadoOptions = ['En comisión', 'En comisión2'];

export default function Bills({ bills, metadata }) {
  const { isCommitteesLoading, isCommitteesSuccess, committees } =
    useCommittees();

  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />
      <CUI.Stack
        spacing="4"
        py="3.75rem"
        px="12"
        mt="4"
        mb="6"
        borderRadius="md"
        direction="column"
        backgroundImage="url(/images/home-bg.png)"
        backgroundSize="cover"
        backgroundPosition={{ base: 'left', md: 'center' }}>
        <CUI.Heading
          as="h1"
          maxW={{ base: '85%', md: '55%' }}
          textAlign={{ base: 'center', md: 'left' }}
          fontSize={{ base: 'xl', md: '3xl' }}>
          Listado de proyectos de ley
        </CUI.Heading>
        <CUI.Text maxW="60%">
          Aquí podrás encontrar el listado de los proyectos que publican todas
          las comisiones del congreso, así como el estado actual en el que se
          encuentran y quiénes están participando como autores.
        </CUI.Text>
        <CUI.Grid
          templateColumns="repeat(auto-fill, minmax(15.25rem, 1fr))"
          alignItems="center"
          gap="6">
          <CUI.FormControl id="legislature">
            <CUI.FormLabel fontWeight="bold">
              Filtrar por Legislatura
            </CUI.FormLabel>
            <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
              {legislaturaOptions.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </CUI.Select>
          </CUI.FormControl>
          {isCommitteesLoading ? (
            <CUI.Box textAlign="center">
              <CUI.Spinner color="white" />
            </CUI.Box>
          ) : (
            isCommitteesSuccess && (
              <CUI.FormControl id="comission">
                <CUI.FormLabel fontWeight="bold">
                  Filtrar por comisión
                </CUI.FormLabel>

                <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
                  {committees.map(committee => (
                    <option
                      key={committee.committee_id}
                      value={committee.committee_id}>
                      {committee.committee_short_name}
                    </option>
                  ))}
                </CUI.Select>
              </CUI.FormControl>
            )
          )}
          <CUI.FormControl id="status">
            <CUI.FormLabel fontWeight="bold">Estado</CUI.FormLabel>
            <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
              {estadoOptions.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </CUI.Select>
          </CUI.FormControl>
        </CUI.Grid>
      </CUI.Stack>
      <CUI.List spacing="4">
        {bills.map(
          ({
            id,
            last_status,
            authorship,
            title,
            last_committee,
            presentation_date,
            tracking,
          }) => (
            <BillCard
              key={id}
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
              committeeName={last_committee ?? void 0}
              publicationDate={presentation_date}
              status={last_status ?? ''}
              lastUpdate={last(tracking).date}
              as={CUI.ListItem}
            />
          ),
        )}
      </CUI.List>
      <Pagination numberOfPages={metadata.totalPages} active={1} />
    </SidebarLayout>
  );
}

export const getStaticProps = () =>
  fetch(`${process.env.api}bill`)
    .then(data => data.json())
    .then(data => ({ props: { bills: data.data, metadata: data } }))
    .catch(error => ({ props: { error: error.toString() } }));
