import * as CUI from '@chakra-ui/react';

export default function CongresspersonInfoTab() {
  const politicalParties = [
    ' Bachiller en Educacion por la universidad',
    'Bachiller en Educacion por la universidad',
  ];

  const educationDetails = [
    ' Bachiller en Educacion por la universidad Cesar Vallejo',
    'Bachiller en Educacion por la universidad Cesar Vallejo',
  ];

  const congresspersonTabs = [
    {
      id: 0,
      label: 'Información personal',
      content: (
        <TabPanelLayout title="Información personal">
          <LabelWithText label="EDAD" text="54 años" />
          <LabelWithText label="LUGAR DE NACIMIENTO" text="San Borja, Lima" />
          <LabelWithText label=" LUGAR DE RESIDENCIA" text="San Borja, Lima" />
        </TabPanelLayout>
      ),
    },
    {
      id: 1,
      label: 'Educación',
      content: (
        <TabPanelLayout title="Educación">
          <LabelWithText label="NIVEL ALCANZADO" text="Postgrado" />
          <LabelWithListItems
            label="DETALLE DE ESTUDIOS"
            items={educationDetails}
          />
        </TabPanelLayout>
      ),
    },
    {
      id: 2,
      label: 'Historial político',

      content: (
        <TabPanelLayout title="Partidos a los que perteneció">
          <LabelWithListItems label="2020" items={politicalParties} />
          <LabelWithListItems label="2020" items={politicalParties} />
        </TabPanelLayout>
      ),
    },
    {
      id: 3,
      label: 'Sanciones',
      content: (
        <TabPanelLayout title="Sanciones e Infracciones">
          <LabelWithText
            label="SENTENCIAS EN EL PODER JUDICIAL"
            text="sanciones"
          />
        </TabPanelLayout>
      ),
    },
  ];

  return (
    <CUI.Tabs>
      <CUI.Box overflowY="hidden">
        <CUI.TabList border="none" mb="6" whiteSpace="nowrap">
          {congresspersonTabs.map(({ id, label }) => (
            <CUI.Tab key={id}>{label}</CUI.Tab>
          ))}
        </CUI.TabList>
      </CUI.Box>

      <CUI.TabPanels>
        {congresspersonTabs.map(({ id, content }) => (
          <CUI.TabPanel key={id} p="6" bg="gray.50" borderRadius="base">
            {content}
          </CUI.TabPanel>
        ))}
      </CUI.TabPanels>
    </CUI.Tabs>
  );
}

const TabPanelLayout = ({ title, children }) => (
  <CUI.Box>
    <CUI.Text fontSize="xl" fontWeight="medium" mb="4">
      {title}
    </CUI.Text>
    <CUI.VStack spacing="4" color="secondary.500" align="flex-start">
      {children}
    </CUI.VStack>
  </CUI.Box>
);

const LabelWithText = ({ label, text }) => (
  <CUI.Box>
    <CUI.Text fontWeight="bold" fontSize="xs" mb="1">
      {label}
    </CUI.Text>
    <CUI.Text fontSize="md">{text}</CUI.Text>
  </CUI.Box>
);

const LabelWithListItems = ({ label, items }) => (
  <CUI.Box>
    <CUI.Text fontWeight="bold" fontSize="xs" mb="1">
      {label}
    </CUI.Text>
    <CUI.UnorderedList>
      {items.map((item, idx) => (
        <CUI.ListItem key={idx}>{item}</CUI.ListItem>
      ))}
    </CUI.UnorderedList>
  </CUI.Box>
);
