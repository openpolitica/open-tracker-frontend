import { Fragment } from 'react';
import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import statusMap from 'components/BillCard/statusMap';
import {
  capitalizeNames,
  applyPeruCapitalizations,
  upperCaseFirstLetter,
} from 'utils';

const BillCard = ({
  authorship = [
    { slug: 'congressperson-slug-1', name: 'congressperon slug 1' },
    { slug: 'congressperson-slug-2', name: 'congressperon slug 2' },
  ],
  billId = '1234',
  billTitle = 'Ley que propone declarar de interés nacional y necesidad pública incluir en el currículo nacional de la educación básica regular y alternativa la enseñanza del curso de cívica con enfoque en los derechos humanos.',
  committeeName = 'Sin comisión',
  lastUpdate = '15/11/2021 - 13:46hrs',
  publicationDate = '15/11/2021',
  status = { bill_status_name: 'en comisión' },
  as,
}) => {
  return (
    <CUI.Flex
      direction="column"
      p="6"
      backgroundColor="white"
      border="1px"
      borderColor="secondary.200"
      borderRadius="4px"
      as={as}>
      <CUI.HStack spacing="2" mb="2">
        <CUI.Tag>{upperCaseFirstLetter(committeeName)}</CUI.Tag>
        <CUI.Tag variant={statusMap[status]?.variant}>
          {upperCaseFirstLetter(
            applyPeruCapitalizations(status?.bill_status_name),
          )}
        </CUI.Tag>
      </CUI.HStack>
      <CUI.Text fontSize="md" mb="4">
        {upperCaseFirstLetter(billTitle)}
      </CUI.Text>
      <CUI.Flex mb="1">
        <CUI.Text fontWeight="bold" fontSize="sm">
          Fecha de publicación:
        </CUI.Text>
        <CUI.Text ml="1" fontSize="sm">
          {publicationDate}
        </CUI.Text>
      </CUI.Flex>
      <CUI.Flex mb="1">
        <CUI.Text fontWeight="bold" fontSize="sm">
          Última actualización:
        </CUI.Text>
        <CUI.Text ml="1" fontSize="sm">
          {lastUpdate}
        </CUI.Text>
      </CUI.Flex>
      {authorship.length > 0 ? (
        <CUI.Flex mb="4" fontSize="sm" flexWrap="wrap">
          <CUI.Text fontWeight="bold" mr="1">
            Autores:
          </CUI.Text>
          <CUI.Box color="primary.500">
            {authorship.map((author, idx) => (
              <Fragment key={author.slug}>
                <NextCUILink href={`/congresistas/${author.slug}`}>
                  {capitalizeNames(author.name)}
                </NextCUILink>
                {authorship.length - 1 === idx ? null : ', '}
              </Fragment>
            ))}
          </CUI.Box>
        </CUI.Flex>
      ) : null}
      <CUI.Button
        as={NextCUILink}
        href={`/proyectos-de-ley/${billId}`}
        mt="auto"
        variant="outline"
        size="sm"
        _hover={{
          textDecoration: 'none',
          bg: 'secondary.100',
        }}
        w="24">
        Ver detalle
      </CUI.Button>
    </CUI.Flex>
  );
};

export default BillCard;
