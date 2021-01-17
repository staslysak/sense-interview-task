import { Redirect, useRouteMatch, Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { performLogin, performSignup } from '../../redux/auth/actions';
import css from './styles.module.scss';

function Auth() {
    const isLogin = useRouteMatch({ path: '/login' });
    const [form] = Form.useForm();
    const authorized = useSelector((state) => state.auth.authorized);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        if (isLogin) {
            dispatch(performLogin(values));
        } else {
            dispatch(performSignup(values));
        }
    };

    if (authorized) {
        return <Redirect to='/' />;
    }

    return (
        <div className={css['auth-page']}>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item name='username' rules={[{ required: true }]}>
                    <Input placeholder='Username' />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true }]}>
                    <Input.Password placeholder='Password' />
                </Form.Item>
                <Row justify='center'>
                    <Col>
                        <Button htmlType='submit' type='primary'>
                            Submit
                        </Button>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <Link to={isLogin ? '/signup' : '/login'}>
                            {isLogin
                                ? "Don't have an account?"
                                : 'Already a member?'}
                        </Link>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Auth;
