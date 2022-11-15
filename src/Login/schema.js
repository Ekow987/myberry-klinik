import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
    password: Yup.string()
        .required('This field is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    confirmPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    code: Yup.number().required('Enter the code you recieved')
});

export default signupSchema;
