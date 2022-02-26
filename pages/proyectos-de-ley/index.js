import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as CUI from '@chakra-ui/react';
import last from 'lodash.last';
import isInteger from 'lodash.isinteger';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import BillCard from 'components/BillCard';
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

const useLegislatures = () => {
  const response = useQuery({
    queryKey: 'legislatures',
    queryFn: async () =>
      fetch(`${process.env.api}legislature`).then(res => res.json()),
  });
  return {
    ...response,
    isLegislaturesLoading: response.isLoading,
    isLegislaturesSuccess: response.isSuccess,
    legislatures: response.data?.data ?? [],
  };
};

// TODO: remove placeholders
const estadoOptions = ['En comisión', 'En comisión2'];

const routeName = 'proyectos-de-ley';
const isAValidPageNumber = (numberOfPages, pageNumber) => {
  if (isNaN(+pageNumber)) {
    return false;
  }
  if (
    isInteger(+pageNumber) &&
    +pageNumber >= 1 &&
    +pageNumber <= numberOfPages
  ) {
    return true;
  }
  return false;
};

const PaginationSelect = ({
  paginationFilter,
  totalPages,
  setPaginationFilter,
  ...props
}) => (
  <CUI.FormControl id="pagination" {...props}>
    <CUI.Select
      onChange={event => setPaginationFilter(event.target.value)}
      value={paginationFilter ?? ''}
      w={{ base: 'full', md: '64' }}
      cursor="pointer">
      <option key="no-select" value="">
        Seleccionar página
      </option>
      {[...Array(totalPages).keys()].map(page => {
        return (
          <option key={page} value={page + 1}>
            Página {page + 1}
          </option>
        );
      })}
    </CUI.Select>
  </CUI.FormControl>
);

export default function Bills({ data: { data: bills, ...metadata } }) {
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const [pageSubset, setPageSubset] = useState(bills);
  const [paginationFilter, setPaginationFilter] = useState(null);
  const { isCommitteesLoading, isCommitteesSuccess, committees } =
    useCommittees();
  const { isLegislaturesLoading, isLegislaturesSuccess, legislatures } =
    useLegislatures();

  useEffect(() => {
    if (paginationFilter === '') {
      router.push(routeName, undefined, { shallow: true });
      return;
    }
    if (paginationFilter) {
      router.push(`${routeName}/?pagina=${paginationFilter}`, undefined, {
        shallow: true,
      });
    }
  }, [paginationFilter]);

  useEffect(() => {
    if (isAValidPageNumber(metadata.totalPages, router.query.pagina)) {
      setPaginationFilter(router.query.pagina);
      fetch(`${process.env.api}bill?page=${router.query.pagina}`)
        .then(data => data.json())
        .then(data => {
          setPageSubset(data.data);
        })
        .catch(error => {
          setApiError(error.toString());
        });
    }
  }, [router.query.pagina]);

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
          {isLegislaturesLoading ? (
            <CUI.Box textAlign="center">
              <CUI.Spinner color="white" />
            </CUI.Box>
          ) : isLegislaturesSuccess && legislatures.length ? (
            <CUI.FormControl id="legislature">
              <CUI.FormLabel fontWeight="bold">
                Filtrar por Legislatura
              </CUI.FormLabel>
              <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
                {legislatures.map(legislature => (
                  <option
                    key={legislature.legislature_id}
                    value={legislature.legislature_id}>
                    {legislature.legislature_period}
                  </option>
                ))}
              </CUI.Select>
            </CUI.FormControl>
          ) : null}

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
      <PaginationSelect
        paginationFilter={paginationFilter}
        totalPages={metadata.totalPages}
        setPaginationFilter={setPaginationFilter}
        mb="4"
      />
      <CUI.List spacing="4">
        {apiError && <CUI.Text fontSize="md">Hubo un error</CUI.Text>}
        {pageSubset.map(
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
      <PaginationSelect
        paginationFilter={paginationFilter}
        totalPages={metadata.totalPages}
        setPaginationFilter={setPaginationFilter}
        mt="4"
      />
    </SidebarLayout>
  );
}

export const getStaticProps = () =>
  fetch(`${process.env.api}bill`)
    .then(data => data.json())
    .then(data => ({ props: { data } }))
    .catch(error => ({ props: { error: error.toString() } }));
