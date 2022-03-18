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
import last from 'lodash.last';

export default function Bill({ bill }) {
  const {
    id,
    last_status,
    authorship,
    title,
    last_committee,
    presentation_date,
    tracking,
  } = bill;

  const publicationDate = presentation_date;
  const lastUpdate = last(tracking).date;

  const authors = authorship
    .filter(author => author.authorship_type === 'AUTOR')
    .filter(author => author.congressperson?.congressperson_slug)
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
    );
  const coauthors = authorship
    .filter(author => author.authorship_type === 'COAUTOR')
    .filter(author => author.congressperson?.congressperson_slug)
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
    );

  const status = last_status?.bill_status_name;
  const committeeName = last_committee?.committee_name ?? 'Sin comisión';
  const routes = [
    { label: 'Inicio', route: '/' },
    { label: 'Proyectos de ley', route: '/proyectos-de-ley' },
    { label: `Proyecto ${id}`, route: '#' },
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
          {upperCaseFirstLetter(title)}
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
                        fontSize="md">
                        {capitalizeNames(author.name)}
                      </NextCUILink>
                      {authors.length - 1 === idx ? null : ', '}
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
                <NextCUILink
                  href={bill.file_url}
                  color="primary.500"
                  isExternal>
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

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.api}/bill`);
  const data = await response.json();
  const paths = data?.data.map(bill => ({
    params: {
      billId: bill.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const billId = params?.billId;
  try {
    const response = await fetch(`${process.env.api}bill/${billId}`);
    const data = await response.json();
    const bill = data.data;
    if (!bill) {
      return { notFound: true };
    }
    return {
      props: { bill },
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
};
