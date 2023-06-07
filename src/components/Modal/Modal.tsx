import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner
} from "@chakra-ui/react";
import { FC, useState } from "react";
import useUserList from "../../useUserList";
import Card from "../Card/Card";
import ToogleBar from "../ToogleBar/ToogleBar";

import './Modal.css'

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<Props> = ({ isOpen, onClose }) => {
    const [size, setSize] = useState<number>(10);
    const [userList, loading] = useUserList(size);
    const [selectedUser, setSelectedUser] = useState<any>();
    const isError = size > 20 ? true : false;

    const onToogleBarClick = (user: any) => {
        setSelectedUser(user);
    }

    return (
        <ChakraModal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                {
                    loading ? (
                        <>
                            <ModalBody>
                                <Spinner size='xl' />
                            </ModalBody>
                        </>
                    ) : (
                        <>
                            <ModalHeader>Users</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form className="form" onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const usersNumber = formData.get('usersNumber');
                                    setSize(Number(usersNumber));
                                }}>
                                    <FormControl className="user-input" isInvalid={isError}>
                                        <FormLabel>Set number of Users</FormLabel>
                                        <Input name="usersNumber" type="number" defaultValue={size} />
                                        {isError && <FormErrorMessage>The maximum number that can be selected is 20.</FormErrorMessage>}
                                    </FormControl>
                                    <Button colorScheme="blue" type="submit" className="submit-btn">
                                        Start Search
                                    </Button>
                                </form>
                                <ToogleBar data={userList} handleClick={onToogleBarClick} />
                                {
                                    selectedUser && <Card
                                                        firstName={selectedUser.first_name}
                                                        lastName={selectedUser.last_name}
                                                        email={selectedUser.email}
                                                        avatar={selectedUser.avatar}
                                                    />
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )
                }
            </ModalContent>
        </ChakraModal>
    )
}

export default Modal;