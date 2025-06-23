import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Alert, Form, Typography } from 'antd';
import classes from './index.module.scss';
import Loader from '../Loader';
import ErrorAlert from '../ErrorAlert';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { updateUserProfile, fetchCurrentUser } from '../../store/UserSlice';
import { validationRules } from '../../utils/validationRules';
import { ProfileFormData } from '../../types/UserInterfaces';

const { Title } = Typography;

const Profile = () => {
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.user);

    const {
        control,
        handleSubmit,
        formState: { touchedFields, isDirty },
        reset,
    } = useForm<ProfileFormData>({
        mode: 'onBlur',
    });

    useEffect(() => {
        if (!user) {
            dispatch(fetchCurrentUser());
        } else {
            reset({
                username: user.username,
                email: user.email,
                password: '',
                image: user.image || '',
            });
        }
    }, [user, dispatch, reset]);

    const onSubmit = (data: ProfileFormData) => {
        const updateData: Partial<ProfileFormData> = {};

        if (data.username !== user?.username) updateData.username = data.username;
        if (data.email !== user?.email) updateData.email = data.email;
        if (data.password) updateData.password = data.password;
        if (data.image !== user?.image) updateData.image = data.image;

        if (Object.keys(updateData).length > 0) {
            dispatch(updateUserProfile(updateData));
        }
    };

    if (isLoading && !user) {
        return <Loader />;
    }

    if (!user) {
        return <ErrorAlert />;
    }

    return (
        <div className={classes.profile}>
            <Title level={2} className={classes.title}>
                Редактировать профиль
            </Title>

            {error && <Alert message={error} type="error" className={classes.error} />}

            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="username"
                    control={control}
                    rules={validationRules.profile.username}
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

                <Controller
                    name="email"
                    control={control}
                    rules={validationRules.profile.email}
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
                    rules={validationRules.profile.password}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            validateStatus={
                                fieldState.error && touchedFields.password ? 'error' : ''
                            }
                            help={touchedFields.password && fieldState.error?.message}
                        >
                            <Input.Password placeholder="Новый пароль" {...field} />
                        </Form.Item>
                    )}
                />

                <Controller
                    name="image"
                    control={control}
                    rules={validationRules.profile.image}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            validateStatus={fieldState.error && touchedFields.image ? 'error' : ''}
                            help={touchedFields.image && fieldState.error?.message}
                        >
                            <Input
                                placeholder="Аватар (URL)"
                                {...field}
                                value={field.value || ''}
                            />
                        </Form.Item>
                    )}
                />

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={classes.button}
                        loading={isLoading}
                        disabled={isLoading || !isDirty}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </form>
        </div>
    );
};

export default Profile;
