import * as CUI from '@chakra-ui/react';
import last from 'lodash.last';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import BillCard from 'components/BillCard';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useEffect } from 'react';

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

const ITEMS_PER_PAGE = 10;

const useInfiniteBills = () => {
  const response = useInfiniteQuery(
    'bills',
    ({ pageParam = 1 }) =>
      fetch(
        `${process.env.api}bill?page=${pageParam}&pageSize=${ITEMS_PER_PAGE}`,
      ).then(res => res.json()),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    },
  );

  return {
    ...response,
    isBillsLoading: response.isLoading,
    isBillsSuccess: response.isSuccess,
    bills: response.data,
  };
};

// TODO: remove placeholders
const estadoOptions = ['En comisión', 'En comisión2'];

export default function Bills() {
  const { isCommitteesLoading, isCommitteesSuccess, committees } =
    useCommittees();
  const { isLegislaturesLoading, isLegislaturesSuccess, legislatures } =
    useLegislatures();
  const {
    isBillsLoading,
    isFetchingNextPage,
    isBillsSuccess,
    bills,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteBills();

  useEffect(() => {
    let fetching = false;
    const onScroll = async event => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage]);

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
      {isBillsLoading ? <BillsSkeleton /> : null}
      <CUI.List spacing="4">
        {isBillsSuccess &&
          bills.pages.map(page =>
            page.data.map(
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
                  committeeName={last_committee?.name}
                  publicationDate={presentation_date}
                  status={last_status}
                  lastUpdate={last(tracking).date}
                  as={CUI.ListItem}
                />
              ),
            ),
          )}
        {isFetchingNextPage ? (
          <CUI.Box textAlign="center">
            <CUI.Spinner color="secondary" />
          </CUI.Box>
        ) : null}
      </CUI.List>
    </SidebarLayout>
  );
}

function BillsSkeleton() {
  return (
    <CUI.Stack w="full" mt="3" spacing="4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <CUI.Skeleton
          key={idx}
          startColor="secondary.100"
          endColor="secondary.300"
          width="full"
          height="209"
        />
      ))}
    </CUI.Stack>
  );
}
