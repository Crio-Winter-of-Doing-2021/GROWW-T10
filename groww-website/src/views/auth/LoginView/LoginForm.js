import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { login } from 'src/actions/account';


function LoginForm({ className, onSubmitSuccess, ...rest }) {

    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                email: 'admin@groww.in',
                password: 'admin'
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {
                    await dispatch(login(values.email, values.password));
                    onSubmitSuccess();
                } catch (error) {
                    const message = (error.response && error.response.data.message) || 'Something went wrong';
                    setStatus({ success: false });
                    setErrors({ submit: message });
                    setSubmitting(false);
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    {...rest}
                >
                    <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        autoFocus
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}

                    />
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                    />
                    <Box mt={2}>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Continue
            </Button>
                        {errors.submit && (
                            <Box mt={3}>
                                <FormHelperText error>
                                    {errors.submit}
                                </FormHelperText>
                            </Box>
                        )}
                    </Box>
                </form>
            )}
        </Formik>
    );
}

LoginForm.propTypes = {
    className: PropTypes.string,
    onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
    onSubmitSuccess: () => { }
};

export default LoginForm;
