import React from "react";

const InputForm = (props) => {
    return (
        <>
            <input {...props} />
            <span>Filed is required</span>
        </>
    )
};

export default InputForm;