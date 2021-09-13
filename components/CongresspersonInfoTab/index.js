import * as CUI from '@chakra-ui/react';

const mapEducationLevelLabel = {
  BASICA: 'Primaria Incompleta',
  BASICA_PRIMARIA: 'Primaria Completa',
  BASICA_SECUNDARIA: 'Secundaria Completa',
  NO_UNIVERSITARIA: 'Técnico superior',
  UNIVERSITARIA: 'Universitaria',
  POSTGRADO: 'Postgrado',
};

export default function CongresspersonInfoTab({ congresspersonData }) {
  const congresspersonTabs = [
    {
      id: 0,
      label: 'Información personal',
      content: (
        <TabPanelLayout title="Información personal">
          <LabelWithText label="EDAD" text={`${congresspersonData.age} años`} />
          <LabelWithText
            label="LUGAR DE NACIMIENTO"
            text={congresspersonData.birthPlace}
          />
          <LabelWithText
            label=" LUGAR DE RESIDENCIA"
            text={congresspersonData.residencePlace}
          />
        </TabPanelLayout>
      ),
    },
    {
      id: 1,
      label: 'Educación',
      content: (
        <TabPanelLayout title="Educación">
          <LabelWithText
            label="NIVEL ALCANZADO"
            text={mapEducationLevelLabel[congresspersonData.topEducationType]}
          />
          {congresspersonData.educationList.length ? (
            <LabelWithListItems
              label="DETALLE DE ESTUDIOS"
              items={congresspersonData.educationList.map(
                item => `${item.educationCareer} por la ${item.educationPlace}`,
              )}
            />
          ) : null}
        </TabPanelLayout>
      ),
    },
    {
      id: 2,
      label: 'Historial político',
      content: (
        <TabPanelLayout title="Partidos a los que perteneció">
          {Object.entries(congresspersonData.politicalHistory || {})?.length ? (
            Object.entries(congresspersonData.politicalHistory).map(
              ([year, parties]) => (
                <LabelWithListItems
                  key={year}
                  label={year}
                  items={parties.map(item => item.politicalPartyName)}
                />
              ),
            )
          ) : (
            <LabelWithText text="No registra historial politico" />
          )}
        </TabPanelLayout>
      ),
    },
    {
      id: 3,
      label: 'Sanciones',
      content: (
        <TabPanelLayout title="Sanciones e Infracciones">
          {Object.entries(congresspersonData.judgments || {})?.length ? (
            Object.entries(congresspersonData.judgments).map(
              ([type, sentences]) => (
                <LabelWithListItems
                  key={type}
                  label={
                    type === 'Penal'
                      ? 'SENTENCIAS PENALES'
                      : 'SENTENCIAS CIVILES'
                  }
                  items={sentences.map(item => item.crime)}
                />
              ),
            )
          ) : (
            <LabelWithText text="No tiene sentencias registradas" />
          )}
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
    {label ? (
      <CUI.Text fontWeight="bold" fontSize="xs" mb="1">
        {label}
      </CUI.Text>
    ) : null}
    <CUI.Text fontSize="md">{text}</CUI.Text>
  </CUI.Box>
);

const LabelWithListItems = ({ label, items }) => (
  <CUI.Box>
    <CUI.Text fontWeight="bold" fontSize="xs" mb="1">
      {label}
    </CUI.Text>
    <CUI.UnorderedList>
      {items?.map((item, idx) => (
        <CUI.ListItem key={idx}>{item}</CUI.ListItem>
      ))}
    </CUI.UnorderedList>
  </CUI.Box>
);
