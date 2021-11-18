import * as CUI from '@chakra-ui/react';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import BillCard from 'components/BillCard';
import statusMap from 'components/BillCard/statusMap';

const routes = [
  { label: 'Inicio', route: '/' },
  { label: 'Proyectos de ley', route: '/proyectos-de-ley' },
];

const legislaturaOptions = [
  'Julio 2021 - Diciembre 2022',
  'junio 2021 - Octubre 2022',
];

const comisionOptions = [
  'Defensa del Consumidor...',
  'Defensa del Consumidor2...',
];

const estadoOptions = ['En comisión', 'En comisión2'];
export default function Bills() {
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
          <CUI.Box>
            <CUI.Text fontWeight="bold">Filtrar por Legislatura</CUI.Text>
            <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
              {legislaturaOptions.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </CUI.Select>
          </CUI.Box>
          <CUI.Box>
            {/* label */}
            <CUI.Text fontWeight="bold">Filtrar por comisión</CUI.Text>
            <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
              {comisionOptions.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </CUI.Select>
          </CUI.Box>
          <CUI.Box>
            <CUI.Text fontWeight="bold">Estado</CUI.Text>
            <CUI.Select placeholder="Select option" bg="#fff" fontSize="sm">
              {estadoOptions.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </CUI.Select>
          </CUI.Box>
        </CUI.Grid>
      </CUI.Stack>
      <CUI.Stack spacing="4">
        {Object.keys(statusMap).map(status => (
          <BillCard key={status} status={status} />
        ))}
      </CUI.Stack>
    </SidebarLayout>
  );
}
