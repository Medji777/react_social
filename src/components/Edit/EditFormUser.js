import React from 'react';
import {Field} from "redux-form";
import styled from './Edit.module.css';
import InputForm from "../common/InputForm/InputForm";
import Loading from "../common/Loading/Loading";

const validOnInput = (value) => {
    if (!value) return 'Input is REQUIRED';
    return undefined;
};

const validOnInputContacts = (value) => {
    if (value && !(/^https:\/\/[a-z0-9]+\.[a-z]{2,5}/i.test(value))) {
        return 'Site not corrected'
    }
    return undefined;
};


const EditFormUser = ({initialValues, handleSubmit, isLoadEdit}) => {

    //  console.log(initialValues);

    const wrap = {transform: 'translateY(-20%)', minHeight: 'auto'};

    if (!initialValues) {
        return <div className={styled.edit__loading}><Loading wrap={wrap}/></div>
    }

    const {contacts} = initialValues;

    return <form onSubmit={handleSubmit} className={styled.form__edit}>
        <div className={styled.form__edit_left}>
            <div>
                <label htmlFor='fullName'>Full name: </label>
                <Field component={InputForm} id='fullName' type='text' name='fullName'
                       validate={[validOnInput]}/>
            </div>
            <div>
                <label htmlFor='aboutMe'>About Me</label>
                <Field component={InputForm} id='aboutMe' type='text' name='aboutMe'/>
            </div>
            <div>
                <label>Contacts: </label>
                <div className={styled.contacts__wrap}>
                    {contacts && Object.keys(contacts).map((key) =>
                        <Field component={InputForm} id={`${key}`} key={key} type='text'
                               name={`contacts.${key}`}
                               placeholder={`${key}`} validate={[validOnInputContacts]}/>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor={'lookingForAJob'}>looking for a job: </label>
                <Field component={InputForm} id='lookingForAJob' type='checkbox'
                       name='lookingForAJob'/>
            </div>
            <div>
                <label htmlFor={'lookingForAJobDescription'}>looking for a job, description: </label>
                <Field component={InputForm} id='lookingForAJobDescription' type='text'
                       name='lookingForAJobDescription'/>
            </div>
            <button type='submit' disabled={isLoadEdit}>Save</button>
        </div>
        <div className={styled.form__edit_right}>
            {isLoadEdit && <Loading wrap={wrap}/>}
        </div>
    </form>
};

export default EditFormUser;
