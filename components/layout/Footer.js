import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import TwitterFooterIcon from 'public/images/icons/twitter-footer.svg';
import LinkedinIcon from 'public/images/icons/linkedin.svg';
import InstagramIcon from 'public/images/icons/instagram.svg';

const SocialButton = ({ children, label, href }) => {
  return (
    <NextCUILink
      isExternal
      w="8"
      h="8"
      cursor="pointer"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="'background 0.3s ease">
      <CUI.VisuallyHidden>{label}</CUI.VisuallyHidden>
      {children}
    </NextCUILink>
  );
};

export default function Footer() {
  return (
    <CUI.Box
      as="footer"
      bg="gray.100"
      minh="64"
      zIndex="docked"
      py={{ base: '6', md: '10' }}
      pr={{ base: '6', md: '10' }}
      pl={{
        base: '6',
        md: 'calc(var(--chakra-sizes-sidebarWidth) + 0.375rem)',
      }}>
      <CUI.Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between">
        <CUI.Stack spacing="4" maxW={{ base: 'full', md: '32%' }}>
          <CUI.Text
            as={NextCUILink}
            href="/"
            lineHeight="9"
            fontFamily="ClashDisplay"
            fontSize="3xl"
            fontWeight="bold">
            Tuku
          </CUI.Text>
          <CUI.Text fontSize="sm" color="gray.500">
            La plataforma donde podrás encontrar información y hacer seguimiento
            a las actividades del Congreso de la República del Perú.
          </CUI.Text>
          <CUI.Box direction="row" spacing="6">
            <SocialButton
              label="LinkedIn"
              href="https://www.linkedin.com/company/open-pol%C3%ADtica/mycompany/">
              <LinkedinIcon />
            </SocialButton>
            <SocialButton
              label="Twitter"
              href="https://twitter.com/openpolitica?lang=es">
              <TwitterFooterIcon />
            </SocialButton>
            <SocialButton
              label="Instagram"
              href="https://www.instagram.com/open.politica/?hl=es">
              <InstagramIcon />
            </SocialButton>
          </CUI.Box>
          <CUI.Text fontSize="sm" color="gray.500">
            © 2021 Open Política. Todos los derechos reservados.
          </CUI.Text>
        </CUI.Stack>
        <CUI.Flex
          position="relative"
          justifyContent="space-between"
          maxW={{ base: 'full', md: '60%' }}
          mt={{ base: '8', md: '0' }}
          flexWrap="wrap">
          <CUI.Stack
            spacing={{ base: '0', md: '1' }}
            pr="12"
            _after={{
              base: 'none',
              md: {
                content: "''",
                width: '1px',
                background: '#CBD5E0',
                position: 'absolute',
                height: '56px',
                top: '0',
                left: '80',
              },
            }}>
            <CUI.Text fontWeight="semibold" color="gray.600">
              Ayúdanos a seguir creando soluciones:
            </CUI.Text>
            <CUI.Link
              isExternal
              color="primary.500"
              href="https://www.patreon.com/openpolitica">
              patreon.com/openpolitica
            </CUI.Link>
          </CUI.Stack>
          <CUI.Stack
            mt={{ base: '4', md: '0' }}
            spacing={{ base: '0', md: '1' }}>
            <CUI.Text fontWeight="semibold" color="gray.600">
              ¿Tienes alguna duda?
            </CUI.Text>
            <CUI.Link
              href="mailto:hola@openpolitica.com"
              color="primary.500"
              mt={{ base: '0', md: 'initial' }}>
              hola@openpolitica.com
            </CUI.Link>
          </CUI.Stack>
        </CUI.Flex>
      </CUI.Flex>
    </CUI.Box>
  );
}
