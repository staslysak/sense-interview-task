import { Modal } from 'antd';

import { EditForm } from './edit-form';

const EditModal = ({ visible, onClose, onSubmit }) => {
    const handleSubmit = (form) => {
        form.validateFields()
            .then((values) => {
                onSubmit(values);
            })
            .then(() => {
                onClose();
            });
    };

    return (
        <Modal
            destroyOnClose
            visible={visible}
            title='Edit user'
            footer={null}
            onCancel={onClose}
        >
            <EditForm onSubmit={handleSubmit} />
        </Modal>
    );
};

export default EditModal;
