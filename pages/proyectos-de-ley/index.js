import React from 'react';
import * as CUI from '@chakra-ui/react';
import last from 'lodash.last';
import omit from 'lodash.omit';
import omitBy from 'lodash.omitby';
import isEmpty from 'lodash.isempty';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import BillCard from 'components/BillCard';
// import Pagination from 'components/Pagination';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

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
    isLegislaturesLoading: response.isLoading,
    isLegislaturesSuccess: response.isSuccess,
    legislatures: response.data?.data ?? [],
  };
};

const useBillStatus = () => {
  const response = useQuery({
    queryKey: 'bill-status',
    queryFn: async () =>
      fetch(`${process.env.api}bill-status`).then(res => res.json()),
  });
  return {
    isBillStatusLoading: response.isLoading,
    isBillStatusSuccess: response.isSuccess,
    billStatus: response.data?.data ?? [],
  };
};

const useBills = ({ filter, page }) => {
  const response = useQuery({
    queryKey: ['bills', filter],
    queryFn: async () => {
      const queryParams = new URLSearchParams(
        omitBy(
          {
            legislature: filter.legislatura,
            committee: filter.comision,
            billStatus: filter.estado,
            page: filter.pagina,
          },
          isEmpty,
        ),
      ).toString();
      const url = `${process.env.api}bill?` + queryParams;
      return fetch(url).then(res => res.json());
    },
  });
  return {
    isBillsLoading: response.isLoading,
    isBillsSuccess: response.isSuccess,
    bills: response.data?.data ?? [],
    metadata: omit(response?.data, ['data']) ?? [],
  };
};

const PaginationSelect = ({ totalPages, onChange, page, ...props }) =>
  totalPages ? (
    <CUI.FormControl id="pagination" {...props}>
      <CUI.Select
        name="pagina"
        value={page ?? ''}
        onChange={onChange}
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
  ) : null;

export default function Bills() {
  const route = useRouter();
  const { query } = route;

  const { isCommitteesLoading, isCommitteesSuccess, committees } =
    useCommittees();
  const { isLegislaturesLoading, isLegislaturesSuccess, legislatures } =
    useLegislatures();
  const { isBillStatusLoading, isBillStatusSuccess, billStatus } =
    useBillStatus();
  const { isBillsLoading, isBillsSuccess, bills, metadata } = useBills({
    filter: query,
  });

  const handleChange = e => {
    const newQuery = {
      ...query,
      [e.target.name]: e.target.value === '' ? null : e.target.value,
      // Page reset
      [e.target.name !== 'pagina' ? 'pagina' : '']:
        e.target.name !== 'pagina' ? '1' : null,
    };
    route.push({
      pathname: '/proyectos-de-ley',
      query: omitBy(newQuery, isEmpty),
      options: { shallow: true },
    });
  };

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
                Filtrar por legislatura
              </CUI.FormLabel>
              <CUI.Select
                bg="#fff"
                cursor="pointer"
                fontSize="sm"
                value={query.legislatura ?? ''}
                name="legislatura"
                onChange={handleChange}>
                <option value="">Selecciona una opcion</option>
                {legislatures.map(legislature => (
                  <option
                    key={legislature.legislature_id}
                    value={legislature.legislature_order}>
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
                <CUI.Select
                  bg="#fff"
                  cursor="pointer"
                  fontSize="sm"
                  name="comision"
                  value={query.comision ?? ''}
                  onChange={handleChange}>
                  <option value="">Selecciona una opcion</option>
                  {committees.map(committee => (
                    <option
                      key={committee.committee_id}
                      value={committee.committee_slug}>
                      {committee.committee_short_name}
                    </option>
                  ))}
                </CUI.Select>
              </CUI.FormControl>
            )
          )}
          {isBillStatusLoading ? (
            <CUI.Box textAlign="center">
              <CUI.Spinner color="white" />
            </CUI.Box>
          ) : (
            isBillStatusSuccess && (
              <CUI.FormControl id="comission">
                <CUI.FormLabel fontWeight="bold">
                  Filtrar por estado
                </CUI.FormLabel>
                <CUI.Select
                  bg="#fff"
                  cursor="pointer"
                  fontSize="sm"
                  name="estado"
                  value={query.estado ?? ''}
                  onChange={handleChange}>
                  <option value="">Selecciona una opcion</option>
                  {billStatus.map(status => (
                    <option
                      key={status.bill_status_id}
                      value={status.bill_status_slug}>
                      {status.bill_status_name}
                    </option>
                  ))}
                </CUI.Select>
              </CUI.FormControl>
            )
          )}
        </CUI.Grid>
      </CUI.Stack>
      <PaginationSelect
        page={query.pagina}
        totalPages={metadata?.totalPages}
        onChange={handleChange}
        mb="4"
      />
      {isBillsLoading ? (
        <CUI.Box textAlign="center">
          <CUI.Spinner color="primary" />
        </CUI.Box>
      ) : isBillsSuccess && bills.length ? (
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
      ) : isBillsSuccess && !bills.length ? (
        <CUI.Text>No se encontraron resultados</CUI.Text>
      ) : null}
      {/* <Pagination numberOfPages={metadata.totalPages} active={1} /> */}
      {isBillsSuccess && bills.length ? (
        <PaginationSelect
          page={query.pagina}
          totalPages={metadata?.totalPages}
          onChange={handleChange}
          mt="4"
        />
      ) : null}
    </SidebarLayout>
  );
}
