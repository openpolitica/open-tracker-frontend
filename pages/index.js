import * as CUI from '@chakra-ui/react';
import SidebarLayout from 'components/layout/SidebarLayout';

export default function Home() {
  return (
    <SidebarLayout>
      <CUI.Flex
        position="relative"
        w="full"
        h={{ base: '19.50rem', md: '14.75rem' }}
        justify="space-between"
        align="center"
        borderRadius="md"
        overflow="hidden"
        direction={{ base: 'column', md: 'row' }}
        pt={{ base: 10, md: 0 }}
        pr={{ base: 4, md: 16 }}
        pl={{ base: 4, md: 12 }}
        backgroundImage="url(/images/home-bg.png)"
        backgroundSize="cover"
        backgroundPosition={{ base: 'left', md: 'center' }}>
        <CUI.Heading
          as="h1"
          maxW={{ base: '85%', md: '55%' }}
          textAlign={{ base: 'center', md: 'left' }}
          color="white"
          fontSize={{ base: 'xl', md: '3xl' }}>
          La información mas relevante sobre el congreso peruano en un solo
          lugar.
        </CUI.Heading>
        <CUI.Image
          position={{ base: 'relative', md: 'absolute' }}
          bottom={{ md: -14 }}
          right={{ md: '5%' }}
          maxW={{ md: '40%' }}
          mt={{ base: 6, md: 0 }}
          src="/images/home-illustration.png"
          alt="Hero Image"
          fit="scale-down"
          boxShadow="2xl"
        />
      </CUI.Flex>
    </SidebarLayout>
  );
}
