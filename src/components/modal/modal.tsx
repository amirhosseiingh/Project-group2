import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputAddon,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface IPropsModal {
    isOpen : boolean ,
    onClose : ()=> void
}

function AddingModal({  onClose , isOpen } :IPropsModal ) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input variant="filled" placeholder="Products name" />
            <Input variant="filled" placeholder="Products price" />
            <Input variant="filled" placeholder="Products inventory" />
            <InputGroup size="sm">
              <InputLeftAddon>https://</InputLeftAddon>
              <Input placeholder="mysite" />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddingModal;
