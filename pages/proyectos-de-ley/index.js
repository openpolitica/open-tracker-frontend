import * as CUI from '@chakra-ui/react';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import BillCard from 'components/BillCard';

const routes = [
  { label: 'Inicio', route: '/' },
  { label: 'Proyectos de ley', route: '/proyectos-de-ley' },
];

// TODO: remove placeholders
const legislaturaOptions = [
  'Julio 2021 - Diciembre 2022',
  'junio 2021 - Octubre 2022',
];

const comisionOptions = [
  'Defensa del Consumidor...',
  'Defensa del Consumidor2...',
];

const estadoOptions = ['En comisión', 'En comisión2'];
export default function Bills({ bills }) {
  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />
      <CUI.Stack
        spacing="4"
        py="3.75rem"
        px="12"
        mt="4"
        mb="6"
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
          <CUI.FormControl id="comission">
            <CUI.FormLabel fontWeight="bold">
              Filtrar por comisión
            </CUI.FormLabel>
            <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
              {comisionOptions.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </CUI.Select>
          </CUI.FormControl>
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
      <CUI.Stack spacing="4">
        {bills.map(
          ({
            id,
            last_status,
            authorship,
            title,
            last_committee,
            presentation_date,
          }) => (
            <BillCard
              key={id}
              authorship={authorship.map(
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
              committeeName={last_committee ?? ''}
              publicationDate={presentation_date}
              status={last_status ?? ''}
            />
          ),
        )}
      </CUI.Stack>
    </SidebarLayout>
  );
}

export const getStaticProps = () =>
  fetch(`${process.env.api}bill`)
    .then(data => data.json())
    .then(data => ({ props: { bills: data.data } }))
    .catch(error => ({ props: { error: error.toString() } }));
