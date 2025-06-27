export const validationRules = {
    register: {
        username: {
            required: "Имя пользователя обязательно",
            minLength: {
                value: 3,
                message: "Минимум 3 символа",
            },
            maxLength: {
                value: 20,
                message: "Максимум 20 символов",
            },
        },
        email: {
            required: "Email обязателен",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный email",
            },
        },
        password: {
            required: "Пароль обязателен",
            minLength: {
                value: 6,
                message: "Минимум 6 символов",
            },
            maxLength: {
                value: 40,
                message: "Максимум 40 символов",
            },
        },
        repeatPassword: (password: string) => ({
            required: "Повторите пароль",
            validate: {
                matchesPassword: (value: string | undefined) =>
                    value === password || "Пароли не совпадают",
            },
        }),
        acceptTerms: {
            required: "Необходимо согласие с обработкой данных",
        },
    },

    login: {
        email: {
            required: "Email обязателен",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный email",
            },
        },
        password: {
            required: "Пароль обязателен",
        },
    },

    profile: {
        username: {
            required: "Имя пользователя обязательно",
        },
        email: {
            required: "Email обязателен",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный email",
            },
        },
        password: {
            minLength: {
                value: 6,
                message: "Минимум 6 символов",
            },
            maxLength: {
                value: 40,
                message: "Максимум 40 символов",
            },
        },
        image: {
            pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
                message: "Некорректный URL",
            },
            validate: (value: string | null | undefined) => {
                if (value === null || value === undefined || value === "")
                    return true;
                return (
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(
                        value,
                    ) || "Некорректный URL"
                );
            },
        },
    },
    article: {
        title: {
            required: "Название обязательно",
            minLength: {
                value: 3,
                message: "Минимум 3 символа",
            },
            maxLength: {
                value: 100,
                message: "Максимум 100 символов",
            },
        },
        description: {
            required: "Описание обязательно",
            minLength: {
                value: 10,
                message: "Минимум 10 символов",
            },
            maxLength: {
                value: 200,
                message: "Максимум 200 символов",
            },
        },
        body: {
            required: "Текст обязателен",
            minLength: {
                value: 10,
                message: "Минимум 10 символов",
            },
        },
    },
};
