/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onClose, onOpen } = useDisclosure()

  // TODO SELECTED IMAGE URL STATE
  const [imageUrl, setImageUrl] = useState('');
  function handleOpenModal(url: string): void {
    setImageUrl(url)
    onOpen()
  }
  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
      {cards.map(card => (
        <Card data={card} viewImage={() => handleOpenModal(card.url)} />
      ))}
      </SimpleGrid>
      
       <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl}/>

      {/* TODO MODALVIEWIMAGE */}
     
    </>
  );
}
