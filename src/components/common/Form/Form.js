import React from "react";
import styled from './Form.module.css';

const Form = ({input,meta,typeForm,...props}) => {

    const s = ({touched,invalid,warning}) => {
        if(touched) {
            if(invalid){
                return 'red'
            } else if(warning){
                return 'orange'
            }
            return '#00000045'
        }
    };

    const typesForm = {
        TEXTAREA: 'textarea',
        INPUT: 'input'
    };

    const isTypeForm = (type,props,input,style) => {
      switch (type) {
          case typesForm.TEXTAREA: {
              return <textarea {...props} {...input} style={style}/>
          }
          case typesForm.INPUT: {
              return <input {...props} {...input} style={style}/>
          }
          default: break;
      }
    };

    const isStyle = (type,style) => {
        switch (type) {
            case typesForm.TEXTAREA: {
                return {...style,top:'15px',right:'64px'}
            }
            case typesForm.INPUT: {
                return {...style,top:'3px',right:'7px'}
            }
            default: break;
        }
    };

    let errorMessage = meta.error || meta.warning;
    return (
        <div className={styled.form__input}>
            {isTypeForm(typeForm,props,input,{border:`1px solid ${s(meta)}`})}
            {meta.touched && errorMessage && <span style={isStyle(typeForm,{color:`${s(meta)}`})}>{errorMessage}</span>}
        </div>
    )
};

export default Form;