import { Button, useDisclosure } from '@chakra-ui/react';

import './App.css';
import Modal from './components/Modal/Modal';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="app">
      <Button colorScheme='blue' onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default App;
