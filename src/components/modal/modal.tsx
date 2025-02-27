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
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addProduct } from "../../redux/reducers/productsReducer";
import { productsAPI } from "../../api/api";
interface IPropsModal {
  isOpen: boolean;
  onClose: () => void;
}

function AddingModal({ onClose, isOpen }: IPropsModal) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [inventory, setInventory] = useState(0);
  const [rating, setRating] = useState(0);

  const handleCreateProduct = async () => {
    try {
      const response = await productsAPI.createProduct({
        title,
        price,
        imageURL,
        inventory,
      });
      console.log(response);
      if (response?.status === 201) {
        dispatch(addProduct({ title, price, imageURL, inventory }));
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="filled"
              placeholder="Products name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="number"
              variant="filled"
              placeholder="Products price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Input
              type="number"
              variant="filled"
              placeholder="Products inventory"
              value={inventory}
              onChange={(e) => setInventory(Number(e.target.value))}
            />
            <InputGroup size="sm">
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                placeholder="mysite"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleCreateProduct();
              }}
              variant="ghost"
            >
              create product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddingModal;
