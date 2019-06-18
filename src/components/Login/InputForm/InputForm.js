import React from "react";

const InputForm = ({input,meta,...props}) => {
    return (
        <>
            <input {...props} {...input}/>
            {meta.touched && meta.invalid && <span>{meta.error}</span>}
            {meta.touched && meta.warning && <span>{meta.warning}</span>}
        </>
    )
};

export default InputForm;