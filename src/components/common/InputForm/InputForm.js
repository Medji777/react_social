import React from "react";
import styled from './InputForm.module.css';

const InputForm = ({input,meta,...props}) => {

   const s = (meta) => {
        if(meta.touched) {
            if(meta.invalid){
                return 'red'
            } else if(meta.warning){
                return 'orange'
            }
            return 'transparent'
        }
    };

    let errorMessage = meta.error || meta.warning;
    return (
        <div className={styled.form__input}>
            <input {...props} {...input} style={{border:`1px solid ${s(meta)}`}}/>
            {meta.touched && errorMessage && <span style={{color:`${s(meta)}`}}>{errorMessage}</span>}
        </div>
    )
};

export default InputForm;