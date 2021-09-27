import { useCombobox } from 'downshift';
import React from 'react';
import * as CUI from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { CongresspersonSmallCard, ParliamentaryGroupSmallCard } from './Cards';
import { capitalizeNames, useDebounce } from 'utils';
import SearchIcon from '/public/images/icons/search.svg';

const debounceInputDelayMs = 800;

export default function OmniSearch() {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const debouncedSetQuery = useDebounce(setQuery, debounceInputDelayMs);
  const router = useRouter();
  const {
    isLoading: isLoadingRequest,
    error,
    isSuccess,
    parliamentaryGroups,
    congresspeople,
  } = useGlobalSearchResults({ query });

  const isLoading = loading || isLoadingRequest;
  const hasNoResults =
    isSuccess && !congresspeople?.length && !parliamentaryGroups?.length;
  const results =
    !isLoading && isSuccess
      ? [
          { type: 'congresistas', options: congresspeople },
          { type: 'bancadas', options: parliamentaryGroups },
        ]
      : [];

  const handleChangeQuery = value => {
    setLoading(true);
    debouncedSetQuery(() => {
      setLoading(false);
      return value;
    });
  };

  const {
    isOpen,
    openMenu,
    closeMenu,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: flattenGroupOptions(results),
    itemToString: itemToPartyName,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem?.congressperson_slug) {
        router.push(`/congresistas/${selectedItem.congressperson_slug}`);
      }
      if (selectedItem?.parliamentary_group_slug) {
        router.push(`/bancadas/${selectedItem.parliamentary_group_slug}`);
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        closeMenu();
      }
      handleChangeQuery(inputValue);
    },
  });

  return (
    <CUI.Box position="relative">
      <CUI.Box {...getComboboxProps()}>
        <CUI.InputGroup minW="21.75rem">
          <CUI.InputLeftElement pointerEvents="none">
            <CUI.Icon color="secondary.400" fontSize="xl" as={SearchIcon} />
          </CUI.InputLeftElement>
          <CUI.Input
            {...getInputProps({
              onFocus: () => !isOpen && query && openMenu(),
              placeholder: 'Ingresa el nombre de un congresista',
            })}
          />
        </CUI.InputGroup>
      </CUI.Box>
      <CUI.Box
        {...getMenuProps()}
        maxHeight="31.25rem"
        minWidth="26.15rem"
        overflowY="scroll"
        bg="white"
        position="absolute"
        boxShadow="xl"
        borderRadius="8"
        mt="4"
        right="0"
        w="full">
        {isOpen && (
          <CUI.Flex p="6" direction="column">
            <CUI.Heading fontSize="lg" fontWeight="bold" color="secondary.700">
              Resultados
            </CUI.Heading>
            {isLoading ? (
              <ResultsLoader />
            ) : hasNoResults ? (
              <NoResultFound query={query} />
            ) : null}
            {
              results.reduce(
                (results, section, sectionIdx) => {
                  results.sections.push(
                    <CUI.Box
                      mt="3"
                      key={sectionIdx}
                      display={section.options.length ? 'block' : 'none'}>
                      <CUI.Text
                        fontSize="md"
                        textTransform="capitalize"
                        color="secondary.600"
                        mb="3">
                        {section.type}
                      </CUI.Text>
                      {section.options.map((option, optionIdx) => {
                        const resultIdx = results.itemIndex++;
                        return (
                          <CUI.WrapItem
                            key={resultIdx}
                            cursor="pointer"
                            bg={
                              highlightedIndex === resultIdx
                                ? 'secondary.100'
                                : 'white'
                            }
                            {...getItemProps({
                              item: option,
                              index: resultIdx,
                            })}>
                            {section.type === 'bancadas' ? (
                              <ParliamentaryGroupSmallCard
                                members={option?.congressperson_count}
                                partyLogo={option.parliamentary_group_url}
                                partyName={option.parliamentary_group_name}
                                slug={option.parliamentary_group_slug}
                              />
                            ) : section.type === 'congresistas' ? (
                              <CongresspersonSmallCard
                                avatar={option.link_photo}
                                fullName={`${option.id_name} ${option.id_first_surname}`}
                                location={option?.location?.location_name}
                                congresspersonSlug={option?.congressperson_slug}
                                // TODO: Fix parliamentaryGroup Logo
                                partyLogo="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.mandysam.com%2Fimg%2Frandom.jpg&f=1&nofb=1"
                                // partyLogo={
                                //   getLogoByParliamentaryGroupSlug(
                                //     option?.parliamentary_group?.find(
                                //       group => group.end_date === null,
                                //     )?.parliamentary_group_slug
                                //   )
                                // }
                              />
                            ) : null}
                          </CUI.WrapItem>
                        );
                      })}
                    </CUI.Box>,
                  );
                  return results;
                },
                { sections: [], itemIndex: 0 },
              ).sections
            }
            {error ? <ErrorMessage error={error} /> : null}
          </CUI.Flex>
        )}
      </CUI.Box>
    </CUI.Box>
  );
}

async function fetcher(...args) {
  const res = await fetch(...args);
  return res.json();
}

const flattenGroupOptions = options =>
  options.reduce((prev, curr) => {
    return [...prev, ...curr.options];
  }, []);

const getFullNameCongressperson = congressperson =>
  capitalizeNames(
    `${congressperson?.id_name} ${congressperson?.id_first_surname} ${congressperson?.id_second_surname}`,
  );

function useGlobalSearchResults({ query = '' } = {}) {
  const { data, error } = useSWR(
    query ? `${process.env.api}search?query=${query}` : null,
    fetcher,
  );
  return {
    parliamentaryGroups: data?.data?.parliamentary_group,
    congresspeople: data?.data?.congressperson,
    isLoading: !data & !error,
    error,
    isSuccess: data && !error,
  };
}

const itemToPartyName = item => {
  const parliamentaryGroupName = item?.parliamentary_group_name;
  const congresspersonFullName = getFullNameCongressperson(item);
  return item ? parliamentaryGroupName || congresspersonFullName : '';
};

const ResultsLoader = () => (
  <CUI.Stack w="full" mt="3" spacing="1">
    {Array.from({ length: 3 }).map((item, idx) => (
      <CUI.Skeleton
        key={idx}
        startColor="secondary.100"
        endColor="secondary.300"
        width="full"
        height="80px"
      />
    ))}
  </CUI.Stack>
);

const NoResultFound = ({ query }) => (
  <CUI.Box mt="3">
    <CUI.Text fontSize="md" color="secondary.500">
      No hay resultados para &quot;
      <CUI.Text as="span" color="secondary.700">
        {query}
      </CUI.Text>
      &quot;
    </CUI.Text>
  </CUI.Box>
);

const ErrorMessage = ({ error }) => (
  <CUI.Box mt="3" role="alert">
    <CUI.Text fontSize="md" color="red.500">
      Se ha producido un error:
      <CUI.Text as="pre" fontSize="md" color="red.500">
        {error}
      </CUI.Text>
    </CUI.Text>
  </CUI.Box>
);
