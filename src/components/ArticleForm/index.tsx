import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import {
    IArticleFormProps,
    ICreateArticle,
} from "../../types/ArticleInterfaces";
import { validationRules } from "../../utils/validationRules";
import classes from "./index.module.scss";

const { TextArea } = Input;
const { Title } = Typography;

const ArticleForm = ({
    mode,
    initialData,
    onSubmit,
    isLoading = false,
}: IArticleFormProps) => {
    const [tags, setTags] = useState<string[]>(
        initialData?.tagList?.length ? initialData.tagList : [""],
    );

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<ICreateArticle>({
        defaultValues: initialData,
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
            setTags(initialData.tagList?.length ? initialData.tagList : [""]);
        }
    }, [initialData, reset]);

    const onSubmitHandle = async (formValues: ICreateArticle) => {
        const nonEmptyTags = tags.filter((tag) => tag.trim() !== "");
        await onSubmit({
            ...formValues,
            tagList: nonEmptyTags,
        });
    };

    const handleTagChange = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, ""]);
    };

    const handleDeleteTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        if (newTags.length === 0) {
            setTags([""]);
        } else {
            setTags(newTags);
        }
    };

    return (
        <div className={classes.articleForm}>
            <Title level={2} className={classes.title}>
                {mode === "edit" ? "Edit article" : "Create new article"}
            </Title>

            <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmitHandle)}
            >
                <Controller
                    name="title"
                    control={control}
                    rules={validationRules.article.title}
                    render={({ field }) => (
                        <Form.Item
                            validateStatus={errors.title ? "error" : ""}
                            help={errors.title?.message}
                        >
                            <Input
                                {...field}
                                placeholder="Title"
                                size="large"
                            />
                        </Form.Item>
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    rules={validationRules.article.description}
                    render={({ field }) => (
                        <Form.Item
                            validateStatus={errors.description ? "error" : ""}
                            help={errors.description?.message}
                        >
                            <Input
                                {...field}
                                placeholder="Short description"
                                size="large"
                            />
                        </Form.Item>
                    )}
                />

                <Controller
                    name="body"
                    control={control}
                    rules={validationRules.article.body}
                    render={({ field }) => (
                        <Form.Item
                            validateStatus={errors.body ? "error" : ""}
                            help={errors.body?.message}
                        >
                            <TextArea
                                {...field}
                                placeholder="Text"
                                rows={8}
                                size="large"
                            />
                        </Form.Item>
                    )}
                />

                <div className={classes.tagsContainer}>
                    {tags.map((tag, index) => (
                        <div key={index} className={classes.tagItem}>
                            <Input
                                value={tag}
                                onChange={(e) =>
                                    handleTagChange(index, e.target.value)
                                }
                                placeholder="Tag"
                                size="large"
                                className={classes.tagInput}
                            />
                            <Button
                                type="default"
                                danger
                                onClick={() => handleDeleteTag(index)}
                                className={classes.tagButton}
                            >
                                Delete
                            </Button>
                            {index === tags.length - 1 && (
                                <Button
                                    type="dashed"
                                    onClick={handleAddTag}
                                    className={classes.tagButton}
                                >
                                    Add tag
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isLoading || (mode === "edit" && !isDirty)}
                    size="large"
                    className={classes.submitButton}
                >
                    {isLoading ? "Saving..." : "Send"}
                </Button>
            </form>
        </div>
    );
};

export default ArticleForm;
