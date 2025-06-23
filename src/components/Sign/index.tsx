import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { registerUser, loginUser } from '../../store/UserSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import classes from './index.module.scss';
import { validationRules } from '../../utils/validationRules';
import { AuthFormData, AuthFormProps } from '../../types/UserInterfaces';

const { Text } = Typography;

const Sign = ({ mode }: AuthFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.user);

    const {
        control,
        handleSubmit,
        watch,
        formState: { touchedFields },
    } = useForm<AuthFormData>({
        mode: 'onBlur',
        defaultValues: {
            acceptTerms: false,
        },
    });

    const onSubmitHandle = async (data: AuthFormData) => {
        try {
            if (mode === 'login') {
                const res = await dispatch(
                    loginUser({
                        email: data.email,
                        password: data.password,
                    }),
                ).unwrap();
                if (res) {
                    navigate('/');
                }
            } else {
                const res = await dispatch(
                    registerUser({
                        email: data.email,
                        password: data.password,
                        username: data.username!,
                    }),
                ).unwrap();
                if (res) {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };

    return (
        <div className={classes.sign}>
            <Typography.Title level={2} className={classes.title}>
                {mode === 'login' ? 'Вход' : 'Создать аккаунт'}
            </Typography.Title>

            {error && <Alert message={error} type="error" className={classes.error} />}

            <form className={classes.form} onSubmit={handleSubmit(onSubmitHandle)}>
                {mode === 'register' && (
                    <Controller
                        name="username"
                        control={control}
                        rules={validationRules.register.username}
                        render={({ field, fieldState }) => (
                            <Form.Item
                                validateStatus={
                                    fieldState.error && touchedFields.username ? 'error' : ''
                                }
                                help={touchedFields.username && fieldState.error?.message}
                            >
                                <Input placeholder="Имя пользователя" {...field} />
                            </Form.Item>
                        )}
                    />
                )}

                <Controller
                    name="email"
                    control={control}
                    rules={
                        mode === 'login'
                            ? validationRules.login.email
                            : validationRules.register.email
                    }
                    render={({ field, fieldState }) => (
                        <Form.Item
                            validateStatus={fieldState.error && touchedFields.email ? 'error' : ''}
                            help={touchedFields.email && fieldState.error?.message}
                        >
                            <Input placeholder="Email" type="email" {...field} />
                        </Form.Item>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={
                        mode === 'login'
                            ? validationRules.login.password
                            : validationRules.register.password
                    }
                    render={({ field, fieldState }) => (
                        <Form.Item
                            validateStatus={
                                fieldState.error && touchedFields.password ? 'error' : ''
                            }
                            help={touchedFields.password && fieldState.error?.message}
                        >
                            <Input.Password placeholder="Пароль" {...field} />
                        </Form.Item>
                    )}
                />

                {mode === 'register' && (
                    <>
                        <Controller
                            name="repeatPassword"
                            control={control}
                            rules={validationRules.register.repeatPassword(watch('password'))}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    validateStatus={
                                        fieldState.error && touchedFields.repeatPassword
                                            ? 'error'
                                            : ''
                                    }
                                    help={touchedFields.repeatPassword && fieldState.error?.message}
                                >
                                    <Input.Password placeholder="Повторите пароль" {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name="acceptTerms"
                            control={control}
                            rules={validationRules.register.acceptTerms}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    validateStatus={
                                        fieldState.error && touchedFields.acceptTerms ? 'error' : ''
                                    }
                                    help={touchedFields.acceptTerms && fieldState.error?.message}
                                >
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    >
                                        Я согласен на обработку персональных данных
                                    </Checkbox>
                                </Form.Item>
                            )}
                        />
                    </>
                )}

                <Button
                    type="primary"
                    htmlType="submit"
                    className={classes.button}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>

                <Text className={classes.question}>
                    {mode === 'login' ? (
                        <>
                            Нет аккаунта?{' '}
                            <Link className={classes.link} to="/sign-up">
                                Зарегистрируйтесь.
                            </Link>
                        </>
                    ) : (
                        <>
                            Уже есть аккаунт?{' '}
                            <Link className={classes.link} to="/sign-in">
                                Войдите.
                            </Link>
                        </>
                    )}
                </Text>
            </form>
        </div>
    );
};

export default Sign;
