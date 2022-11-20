import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const AddCategory = ({ toggle, setToggle }) => {

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleClick = () => {
        setOpen1(true);
    };

    return (
        <>
            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    Category added sucessfully
                </Alert>
            </Snackbar>

            <Button variant="contained" onClick={handleClickOpen} size="medium" startIcon={<AddIcon />}>
                Add Category
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Category
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        categoryName: '',
                        photo: null
                    }}
                    validationSchema={Yup.object({
                        categoryName: Yup.string()
                            .required('Required'),
                        photo: Yup.mixed()
                            .nullable()
                            .test(
                                "FILE_FORMAT",
                                "invalid format",
                                (value) => {
                                    if (!value) {
                                        return true
                                    }
                                    return value && SUPPORTED_FORMATS.includes(value?.type)
                                }
                            ),

                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)
                        let formData = new FormData();
                        formData.append('file', values.photo)
                        formData.append('categoryName', values.categoryName)
                        formData.append('fileName', values.photo && values.photo.name)

                        axios.post("http://localhost:5000/categories/create", formData).then((res) => {
                            setToggle(!toggle)
                            handleClick()
                            setOpen(false)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent dividers>
                                <Stack direction="row" spacing={8} alignItems='center'>
                                    <FormLabel sx={{ color: "black" }}>Category Name* :</FormLabel>
                                    <TextField name='categoryName' onChange={props.handleChange} value={props.values.categoryName} style={{ width: 258 }} id="outlined-basic" size="small" label="Category Name*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="categoryName">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={7} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Upload Photo* :</FormLabel>
                                    <input id="file" name="file" type="file" onChange={(e) => props.setFieldValue("photo", e.currentTarget.files[0])} />
                                </Stack>
                                <ErrorMessage name="photo">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                            </DialogContent>
                            <div style={{ margin: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button autoFocus onClick={handleClose} variant='contained' color="error">
                                        Close
                                    </Button>
                                    <Button type='submit' autoFocus variant='contained'>
                                        Add Category
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </BootstrapDialog>
        </>
    )
}

export default AddCategory