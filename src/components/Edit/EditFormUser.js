import React from 'react';
import {Field, reduxForm} from "redux-form";
import Loading from "../common/Loading/Loading";
import Form from "../common/Form/Form";
import styled from './Edit.module.css';

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

const EditFormUser = React.memo(({initialValues, handleSubmit, isLoadEdit,isWidthResizeMode}) => {

    const wrap = {transform: 'translateY(-20%)', minHeight: 'auto'};

    if (!initialValues) return <div className={styled.edit__loading}><Loading wrap={wrap}/></div>;

    const {contacts} = initialValues;

    return <form onSubmit={handleSubmit} className={styled.form__edit}>
        <div className={styled.form__edit_left}>
            <div>
                <label htmlFor='fullName'>Full name: </label>
                <Field component={Form} id='fullName' type='text' name='fullName'
                       validate={[validOnInput]} typeForm={'input'}/>
            </div>
            <div>
                <label htmlFor='aboutMe'>About Me</label>
                <Field component={Form} id='aboutMe' type='text' name='aboutMe' typeForm={'textarea'}/>
            </div>
            <div>
                <label>Contacts: </label>
                <div className={styled.contacts__wrap}>
                    {contacts && Object.keys(contacts).map((key) =>
                        <Field component={Form} id={`${key}`} key={key} type='text'
                               name={`contacts.${key}`}
                               placeholder={`${key}`} validate={[validOnInputContacts]} typeForm={'input'}/>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor={'lookingForAJob'}>looking for a job: </label>
                <Field component={Form} id='lookingForAJob' type='checkbox'
                       name='lookingForAJob' typeForm={'input'}/>
            </div>
            <div>
                <label htmlFor={'lookingForAJobDescription'}>looking for a job, description: </label>
                <Field component={Form} id='lookingForAJobDescription' type='text'
                       name='lookingForAJobDescription' typeForm={'input'}/>
            </div>
            <button type='submit' disabled={isLoadEdit}>Save</button>
        </div>
        {!isWidthResizeMode && <div className={styled.form__edit_right}>
            {isLoadEdit && <Loading wrap={wrap}/>}
        </div>}
    </form>
},(prevProps,nextProps) => {
    if(prevProps.initialValues === nextProps.initialValues && prevProps.isLoadEdit === nextProps.isLoadEdit) {
        return true
    }
});

export default reduxForm({form: 'editForm'})(EditFormUser);