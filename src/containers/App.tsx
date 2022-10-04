import {FC} from "react";
import {Button, Input, Col, InputProps} from "antd";

import Gallery from "./Gallery";
import Header from "../components/Header";

import "./style.scss";
import AddImageModal from "./Gallery/Modals/AddImageModal";
import {useSwitch} from "../utils/hooks/switch";
import {AppDispatch} from "../redux/state";
import {useDispatch} from "react-redux";
import {changeSearchString} from "../redux/slices/gallery.slice";

const App: FC = () => {
    const [addImageModalOpen, openAddImageModal, closeAddImageModal] =
        useSwitch();

    const dispatch: AppDispatch = useDispatch();

    const handlePageChange: InputProps["onChange"] = (e) => {
        dispatch(changeSearchString(e.target.value));
    };

    return (
        <div className="app-wrapper">
            <Header>
                <Input.Group compact>
                    <Col span={5}>
                        <Button type="primary" onClick={openAddImageModal}>
                            Add Image
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Input placeholder="Search" onChange={handlePageChange}/>
                    </Col>
                </Input.Group>
            </Header>
            <Gallery/>
            <AddImageModal open={addImageModalOpen} onClose={closeAddImageModal}/>
        </div>
    );
};

export default App;
