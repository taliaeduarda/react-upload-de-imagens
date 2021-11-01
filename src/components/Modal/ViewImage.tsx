/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="transparent">
        <ModalBody>
          <Image
           maxWidth="900px"
            maxHeight="600px"
            src={imgUrl}
            alt="Imagem" />
        </ModalBody>
        <ModalFooter maxWidth="900px" backgroundColor="pGray.800">
          <Link href={imgUrl} position="absolute" maxWidth="900px" left="10px" color='pGray.50' border="none" isExternal>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
