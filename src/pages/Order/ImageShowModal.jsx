import React from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

function ImageShowModal(props) {

    const ImageShowModalClose = () => {
        props.setImageURL("");
        props.setImageShowModal(false);
    }

    return (<>

        <Modal
            show={props.imageShowModal}
            onHide={ImageShowModalClose}
            backdrop="static"
            keyboard={false}
            id="product_image_modal"
            size="lg"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>Product Image</Modal.Title>
                {/* <h5>Tuesday. September 30</h5> */}
            </Modal.Header>
            <Modal.Body>
                <img src={props.ImageURL} alt='product_image' />
            </Modal.Body>

        </Modal >

    </>)
}

export default ImageShowModal