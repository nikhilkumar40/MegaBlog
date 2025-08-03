import React from 'react'
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

                if(dbPost){
                    navigate(`post/${dbPost.$id}`)
                }
            }
        }
    }

    return (
        <div>PostForm</div>
    )
}

export default PostForm