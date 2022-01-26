import { Fragment } from 'react';
import * as CUI from '@chakra-ui/react';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';
import statusMap from 'components/BillCard/statusMap';
import { upperCaseFirstLetter } from 'utils/upperLowerCaseFirstLetter';
import { applyPeruCapitalizations } from 'utils/applyCountryCapitalizations';
import NextCUILink from 'components/NextCUILink';
import { capitalizeNames } from 'utils';
import TimeIcon from 'public/images/icons/time.svg';
import ExternalLink from 'public/images/icons/small-link.svg';

//TODO: remove placeholders
export default function Bill({
  authors = [
    { slug: 'congressperson-slug-1', name: 'congressperon slug 1' },
    { slug: 'congressperson-slug-2', name: 'congressperon slug 2' },
  ],
  coauthors = [
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
        <CUI.Text maxW="56rem" fontSize="xl" mb="4">
          {billTitle}
        </CUI.Text>
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
              <Label>Fecha de publicación</Label>
              <CUI.Text as="dd" fontSize="md" color="secondary.700">
                {publicationDate}
              </CUI.Text>
            </CUI.Box>
            {authors.length ? (
              <CUI.Box mb="4">
                <Label>Autores</Label>
                <CUI.Box color="primary.500" as="dd">
                  {authors.map((author, idx) => (
                    <Fragment key={author.slug}>
                      <NextCUILink
                        href={`/congresistas/${author.slug}`}
                        fontSize="md"
                        ml="1">
                        {capitalizeNames(author.name)}
                      </NextCUILink>
                      {authors.length - 1 === idx ? null : ','}
                    </Fragment>
                  ))}
                </CUI.Box>
              </CUI.Box>
            ) : null}
            <CUI.Box mb="4">
              <Label>Co-Autores</Label>
              <CUI.Box color="primary.500" as="dd">
                {coauthors.map((author, idx) => (
                  <Fragment key={author.slug}>
                    <NextCUILink
                      href={`/congresistas/${author.slug}`}
                      fontSize="md">
                      {capitalizeNames(author.name)}
                    </NextCUILink>
                    {coauthors.length - 1 === idx ? null : ', '}
                  </Fragment>
                ))}
              </CUI.Box>
            </CUI.Box>
            <CUI.Box mb="4">
              <Label>Estado</Label>
              <CUI.Text as="dd" fontSize="md" color="secondary.700">
                El proyecto se encuentra actualmente{' '}
                <CUI.Text as="strong"> {status}</CUI.Text>
              </CUI.Text>
            </CUI.Box>
          </CUI.Box>
          <CUI.Stack pt="6" as="dl" spacing="4" fontSize="sm">
            <CUI.Flex align="center">
              <CUI.Icon
                mr="2"
                minW="6"
                minH="6"
                color="secondary.600"
                as={ExternalLink}
              />
              <CUI.Text as="dd">
                <NextCUILink href="#" color="primary.500" isExternal>
                  Ver proyecto de ley en el portal del congreso
                </NextCUILink>
              </CUI.Text>
            </CUI.Flex>
            <CUI.Flex align="center">
              <CUI.Icon as={TimeIcon} mr="2" minW="6" minH="6" />
              <CUI.Text as="dt" color="secondary.500" fontWeight="semibold">
                Última actualización
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