import { Modal, Form, Input, Button, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

const mapInitialValues = (data) => {
    return {
        username: data?.username?._text ?? '',
        password: '',
    };
};

const EditModal = ({ visible, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const initialValues = useSelector((state) =>
        mapInitialValues(state.auth.user)
    );

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                onSubmit(values);
            })
            .then(() => {
                form.resetFields();
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
            <Form
                form={form}
                initialValues={initialValues}
                onFinish={handleSubmit}
            >
                <Form.Item name='username' rules={[{ min: 5 }]}>
                    <Input placeholder='Username' />
                </Form.Item>
                <Form.Item name='password'>
                    <Input.Password placeholder='Password' />
                </Form.Item>
                <Row justify='center'>
                    <Col>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default EditModal;
