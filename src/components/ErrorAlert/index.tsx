import { Alert } from "antd";

import classes from "./index.module.scss";

const ErrorAlert = () => {
    return <Alert description="Что-то пошло не так" type="error" className={classes.errorAlert} />;
};

export default ErrorAlert;
