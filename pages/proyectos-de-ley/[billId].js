import * as CUI from '@chakra-ui/react';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import statusMap from 'components/BillCard/statusMap';
import { upperCaseFirstLetter } from 'utils/upperLowerCaseFirstLetter';
import { applyPeruCapitalizations } from 'utils/applyCountryCapitalizations';
import NextCUILink from 'components/NextCUILink';
import { capitalizeNames } from 'utils';
import InfoIcon from 'public/images/icons/info.svg';
import TimeIcon from 'public/images/icons/time.svg';
import { ArrowDownIcon } from '@chakra-ui/icons';

//TODO: remove placeholders
export default function Bills({
  authorship = [
    { slug: 'congressperson-slug-1', name: 'congressperon slug 1' },
    { slug: 'congressperson-slug-2', name: 'congressperon slug 2' },
  ],
  billId = '1234',
  billTitle = 'Ley que propone declarar de interés nacional y necesidad pública incluir en el currículo nacional de la educación básica regular y alternativa la enseñanza del curso de cívica con enfoque en los derechos humanos.',
  committeeName = 'salud',
  lastUpdate = '15/11/2021 - 13:46hrs',
  publicationDate = '15/11/2021',
  status = 'en comisión',
}) {
  const routes = [
    { label: 'Inicio', route: '/' },
    { label: 'Proyectos de ley', route: '/proyectos-de-ley' },
    { label: `Proyecto ${billId}`, route: '#' },
  ];
  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />
      <CUI.Box my="4">
        <CUI.HStack spacing="2" mb="4">
          <CUI.Tag>{upperCaseFirstLetter(committeeName)}</CUI.Tag>
          <CUI.Tag variant={statusMap[status]?.variant}>
            {upperCaseFirstLetter(applyPeruCapitalizations(status))}
          </CUI.Tag>
        </CUI.HStack>
        <CUI.Flex direction={{ base: 'column', md: 'row' }}>
          <CUI.Text fontSize="md" mb="4">
            {billTitle}
          </CUI.Text>
          <CUI.Button
            as="a"
            href=""
            download
            variant="solid"
            ml={{ base: 0, md: '5' }}
            minW="44"
            rightIcon={<ArrowDownIcon />}>
            Descargar PDF
          </CUI.Button>
        </CUI.Flex>
        <CUI.Box
          bg="secondary.50"
          borderRadius="md"
          p="4"
          mt={{ base: '6', md: 0 }}>
          <CUI.Box
            borderBottom="1px"
            borderColor="secondary.200"
            as="dl"
            pb="2">
            <CUI.Text
              as="h2"
              color="secondary.700"
              mb="6"
              fontSize="lg"
              fontWeight="semibold">
              Detalles del proyecto
            </CUI.Text>
            <CUI.Box mb="4">
              <Label>Fecha de publicación:</Label>
              <CUI.Text as="dd" fontSize="md" color="secondary.700">
                {publicationDate}
              </CUI.Text>
            </CUI.Box>
            <CUI.Box mb="4">
              <Label>Autores:</Label>
              <CUI.Box as="dd">
                {authorship.map(author => (
                  <NextCUILink
                    key={author.slug}
                    href={`/congresistas/${author.slug}`}
                    color="primary.500"
                    fontSize="md"
                    mr="1">
                    {capitalizeNames(author.name)}
                  </NextCUILink>
                ))}
              </CUI.Box>
            </CUI.Box>
            <CUI.Box mb="4">
              <Label>Estado</Label>
              <CUI.Text as="dd" fontSize="md" color="secondary.700">
                El proyecto se encuentra actualmente en{' '}
                <CUI.Text as="strong"> {status}</CUI.Text>
              </CUI.Text>
            </CUI.Box>
            <CUI.Box mb="4">
              <Label>Proximos pasos</Label>
              <CUI.Text as="dd" fontSize="md" color="secondary.700">
                El proyecto deberá ser{' '}
                <CUI.Text as="strong">
                  debatido en la comisión de educación
                </CUI.Text>{' '}
                para ver si se modifica, aprueba o se archiva.
              </CUI.Text>
            </CUI.Box>
          </CUI.Box>
          <CUI.Stack pt="6" as="dl" spacing="4" fontSize="sm">
            <CUI.Flex align="center">
              <CUI.Icon as={InfoIcon} mr="2" minW="6" minH="6" />
              <CUI.Text as="dt" color="secondary.500" fontWeight="semibold">
                Fuente:
              </CUI.Text>
              <CUI.Text as="dd" ml="1">
                <NextCUILink
                  href="https://www.congreso.gob.pe/"
                  color="primary.500"
                  isExternal>
                  Portal del Congreso
                </NextCUILink>
              </CUI.Text>
            </CUI.Flex>
            <CUI.Flex align="center">
              <CUI.Icon as={TimeIcon} mr="2" minW="6" minH="6" />
              <CUI.Text as="dt" color="secondary.500" fontWeight="semibold">
                Última actualización:
              </CUI.Text>
              <CUI.Text as="dd" ml="1">
                {lastUpdate}
              </CUI.Text>
            </CUI.Flex>
          </CUI.Stack>
        </CUI.Box>
      </CUI.Box>
    </SidebarLayout>
  );
}

const Label = ({ children }) => {
  return (
    <CUI.Text
      fontSize="xs"
      color="secondary.500"
      fontWeight="bold"
      mb="1"
      textTransform="uppercase"
      as="dt">
      {children}
    </CUI.Text>
  );
};
