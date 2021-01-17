import { useState } from 'react';
import { Layout, Button, Space, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { logoutAction, updateSelf, deleteSelf } from '../../redux/auth/actions';
import css from './styles.module.scss';
import EditModal from '../../components/edit-modal';

export function AppLayout({ children }) {
    const [edit, setEdit] = useState();
    const dispatch = useDispatch();
    const authorized = useSelector((state) => state.auth.authorized);

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    const toggleEdit = () => setEdit((prev) => !prev);

    const handleUpdate = (values) => {
        dispatch(updateSelf(values));
    };

    const handleDelete = () => {
        dispatch(deleteSelf());
    };

    return (
        <Layout className={css['app-layout']}>
            {authorized && (
                <Layout.Header>
                    <Row justify='space-between' align='center'>
                        <Col>
                            <Button
                                danger
                                type='primary'
                                icon={<DeleteOutlined />}
                                onClick={handleDelete}
                            >
                                Delete account
                            </Button>
                        </Col>
                        <Col>
                            <Space>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                    onClick={toggleEdit}
                                >
                                    Edit user
                                </Button>
                                <Button type='primary' onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Layout.Header>
            )}
            <Layout.Content className={css['app-layout-content']}>
                {children}
                <EditModal
                    visible={edit}
                    onClose={toggleEdit}
                    onSubmit={handleUpdate}
                />
            </Layout.Content>
        </Layout>
    );
}
