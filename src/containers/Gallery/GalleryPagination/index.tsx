import {FC} from "react";
import {Pagination, PaginationProps} from "antd";
import {useDispatch, useSelector} from "react-redux";

import {
    currentPageSelector,
    searchImagesSelector
} from "../../../redux/selectors/gallery.selectors";
import {AppDispatch} from "../../../redux/state";
import {changePage} from "../../../redux/slices/gallery.slice";

const GalleryPagination: FC = () => {
    const images = useSelector(searchImagesSelector);
    const currentPage = useSelector(currentPageSelector);

    const dispatch: AppDispatch = useDispatch();

    const handlePageChange: PaginationProps["onChange"] = (page) => {
        dispatch(changePage(page));
    };

    return (
        <Pagination
            defaultCurrent={1}
            total={images.length}
            current={currentPage}
            pageSize={5}
            onChange={handlePageChange}
        />
    );
};

export default GalleryPagination;
