import * as CUI from '@chakra-ui/react';
import OpenLogo from 'public/images/icons/open-logo.svg';
import Separator from 'public/images/icons/separator.svg';
import TukuLogo from 'public/images/icons/tuku-logo.svg';

export function Bill({
  title,
  authorName,
  authorImageUrl,
  presentationDate,
  parliamentaryGroupName,
}) {
  return (
    <CUI.Box
      position="absolute"
      boxSizing="border-box"
      top={0}
      left={0}
      w={1200}
      h={630}
      pt={90}
      pl={90}
      pr={90}
      pb={62}
      fontFamily="Clash Display"
      backgroundImage="url(/images/og-bg.png)"
      backgroundSize="cover">
      <CUI.Heading
        as="h1"
        mt="0rem"
        mb="1rem"
        textAlign="left"
        color="black"
        fontSize="1.75rem"
        fontWeight="bold">
        Proyecto de ley
      </CUI.Heading>
      <CUI.Text>
        <strong>Fecha:</strong> {presentationDate}
      </CUI.Text>
      <CUI.Text as="h2" fontSize="2rem" fontWeight="normal" mt="0rem" mb="1rem">
        {title}
      </CUI.Text>

      {authorName ? (
        <CUI.Box position="absolute" bottom={62} left={90} fontSize="1.25rem">
          <CUI.Text fontWeight="bold" mt="0rem" mb="1rem">
            Autor del proyecto
          </CUI.Text>
          <CUI.Flex align="center">
            {authorImageUrl ? (
              <CUI.Image
                w={95}
                h={95}
                src={authorImageUrl}
                alt="Foto congresista"
                objectFit="cover"
                objectPosition="center"
                borderRadius={100}
              />
            ) : null}
            <CUI.Box mt="0rem" mb="0rem" ml="2rem">
              <CUI.Text fontWeight={700} mt="0rem" mb="0rem">
                {authorName}
              </CUI.Text>
              {parliamentaryGroupName ? (
                <CUI.Text mt="0rem" mb="0rem">
                  Congresista de {parliamentaryGroupName}
                </CUI.Text>
              ) : null}
            </CUI.Box>
          </CUI.Flex>
        </CUI.Box>
      ) : null}
      <CUI.Box position="absolute" bottom={80} right={90}>
        <CUI.HStack spacing="1rem">
          <CUI.Box w={139}>
            <TukuLogo width="100%" height="42" viewBox="0 0 114 36" />
          </CUI.Box>
          <Separator stroke="black" />
          <CUI.Text fontFamily="Recia" fontSize="1.25rem">
            hecho por
          </CUI.Text>
          <CUI.Box w={142}>
            <OpenLogo width="100%" height={29} viewBox="0 0 117 24" />
          </CUI.Box>
        </CUI.HStack>
      </CUI.Box>
    </CUI.Box>
  );
}
