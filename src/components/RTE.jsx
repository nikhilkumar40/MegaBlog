import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'


function RTE({ name, label, control, defaultValue = '' }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || 'content'}
                control={control}
                render={({ feild: { onChange } }) => {
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            menubar:true,
                            height: 500,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:16px }'
                        }
                        }
                        onEditorChange={onchange}
                    />
                }}
            />
        </div>
    )
}

export default RTE