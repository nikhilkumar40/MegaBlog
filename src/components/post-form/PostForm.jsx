import React, { useCallback, useEffect } from 'react'
import { Input, Button, PostCard } from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dbConfigService from '../../appwrite/DbConfig'
import { useForm } from 'react-hook-form'
import fileService from '../../appwrite/file'


function PostForm(post) {

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || ''
        }
    });

    const submit = async (data) => {
        if (post) {
            const file = await data.image[0] ? fileService.uploadFile(data.image[0]) : null;
            if (file) {
                fileService.deleteFile(post.featuredImage)
            }
            const dbPost = await dbConfigService.updatePost(post.$id, { ...data, featuredImage: file ? file.id : undefined })
            if (dbPost) {
                navigate(`post/${post.$id}`)
            }
        }

        else {
            const file = await fileService.uploadFile(data.image[0])
            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await dbConfigService.createPost({ ...data, userId: userData.$id })

                if (dbPost) {
                    navigate(`post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((slug) => {
        if (slug != '' && typeof (slug) == "string") {
            return slug.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return ''
    }, [])

    useEffect(() => {

        const subscription = watch((value, { name }) => {
            if (name == 'title') {
                setValue('slug', slugTransform(value.title),
                    { shouldValidate: true })
            }
        })

    }, [slugTransform, setValue, watch])
    return (
           <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm