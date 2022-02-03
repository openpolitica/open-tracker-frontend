import { useState } from 'react';
import * as CUI from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const PagButton = props => {
  const activeStyle = {
    bg: 'primary.500',
    color: 'secondary.200',
  };
  return (
    <CUI.chakra.button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      color="secondary.700"
      opacity={props.disabled && 0.6}
      _hover={!props.disabled && activeStyle}
      cursor={props.disabled && 'not-allowed'}
      {...(props.active && activeStyle)}>
      {props.children}
    </CUI.chakra.button>
  );
};

const MButton = props => {
  const DoubleArrow = props.left ? ArrowLeftIcon : ArrowRightIcon;
  const [hovered, setHovered] = useState(false);
  return (
    <CUI.chakra.a
      w={8}
      py={2}
      color="primary.700"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      cursor="pointer"
      textAlign="center">
      {hovered ? (
        <CUI.Icon
          as={DoubleArrow}
          boxSize={3}
          cursor="pointer"
          color="primary.800"
        />
      ) : (
        <CUI.Icon
          as={HiDotsHorizontal}
          color="primary.100"
          boxSize={4}
          opacity={0.5}
        />
      )}
    </CUI.chakra.a>
  );
};

export default function Pagination({ numberOfPages = 50, active = 7 }) {
  return (
    <CUI.Flex
      bg="secondary.50"
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center">
      <CUI.Flex>
        <PagButton>
          <CUI.Icon as={IoIosArrowBack} color="secondary.700" boxSize={4} />
        </PagButton>
        {active !== 1 ? <PagButton>1</PagButton> : null}
        {active - 1 > 1 ? <MButton left /> : null}
        {active - 2 > 1 ? <PagButton>{active - 2}</PagButton> : null}
        {active - 1 > 1 ? <PagButton>{active - 1}</PagButton> : null}
        <PagButton active>{active}</PagButton>
        {active + 1 < numberOfPages ? (
          <PagButton>{active + 1}</PagButton>
        ) : null}
        {active + 2 < numberOfPages ? (
          <PagButton>{active + 2}</PagButton>
        ) : null}
        {active + 2 < numberOfPages ? <MButton right /> : null}
        {active !== numberOfPages ? (
          <PagButton>{numberOfPages}</PagButton>
        ) : null}
        <PagButton>
          <CUI.Icon as={IoIosArrowForward} color="secondary.700" boxSize={4} />
        </PagButton>
      </CUI.Flex>
    </CUI.Flex>
  );
}
