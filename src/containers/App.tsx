import { FC } from "react";
import { Button } from "antd";

import Gallery from "./Gallery";
import Header from "../components/Header";

import "./style.scss";
import AddImageModal from "./Gallery/Modals/AddImageModal";
import { useSwitch } from "../utils/hooks/switch";

const App: FC = () => {
  const [addImageModalOpen, openAddImageModal, closeAddImageModal] =
    useSwitch();

  return (
    <div className="app-wrapper">
      <Header>
        <Button type="primary" onClick={openAddImageModal}>
          Add Image
        </Button>
      </Header>
      <Gallery />
      <AddImageModal open={addImageModalOpen} onClose={closeAddImageModal} />
    </div>
  );
};

export default App;
