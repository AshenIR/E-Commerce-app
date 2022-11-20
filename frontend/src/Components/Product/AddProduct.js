import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

const AddProduct = ({ toggle, setToggle, categories }) => {

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
                    Product added sucessfully
                </Alert>
            </Snackbar>

            <Button variant="contained" onClick={handleClickOpen} size="medium" startIcon={<AddIcon />}>
                Add Products
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Products
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        boardMemberName: '',
                        category: '',
                        brand: '',
                        price: '',
                        photo: null,
                        description: ''
                    }}
                    validationSchema={Yup.object({
                        productName: Yup.string()
                            .required('Required'),
                        brand: Yup.string()
                            .required('Required'),
                        price: Yup.string()
                            .required('Required'),
                        category: Yup.string()
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
                        console.log('values', values)
                        let formData = new FormData();
                        formData.append('file', values.photo)
                        formData.append('productName', values.productName)
                        formData.append('categoryID', values.category)
                        formData.append('brand', values.brand)
                        formData.append('price', values.price)
                        formData.append('fileName', values.photo && values.photo.name)
                        formData.append('description', values.description)

                        axios.post("http://localhost:5000/products/create", formData).then((res) => {
                            handleClick()
                            setToggle(!toggle)
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
                                    <FormLabel sx={{ color: "black" }}>Product Name* :</FormLabel>
                                    <TextField name='productName' onChange={props.handleChange} value={props.values.productName} style={{ width: 258 }} id="outlined-basic" size="small" label="Product Name*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="productName">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={3}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Category :</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='category'
                                        label="Category"
                                        defaultValue=''
                                        value={props.values.category}
                                        onChange={props.handleChange}
                                        style={{ width: 258 }}
                                    >
                                        {categories && categories.map((category) => (
                                            <MenuItem value={category._id}>{category.categoryName}</MenuItem>
                                        )
                                        )}

                                    </Select>
                                </Stack>
                                <ErrorMessage name="designation">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={3}>
                                    <FormLabel sx={{ color: "black" }}>Brand* :</FormLabel>
                                    <TextField name='brand' onChange={props.handleChange} value={props.values.brand} style={{ width: 258 }} id="outlined-basic" size="small" label="Brand*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="brand">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={3}>
                                    <FormLabel sx={{ color: "black" }}>Price* :</FormLabel>
                                    <TextField name='price' onChange={props.handleChange} value={props.values.price} style={{ width: 258 }} id="outlined-basic" size="small" label="Price*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="price">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={7} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Upload Photo* :</FormLabel>
                                    <input id="file" name="file" type="file" onChange={(e) => props.setFieldValue("photo", e.currentTarget.files[0])} />
                                </Stack>
                                <ErrorMessage name="photo">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Description :</FormLabel>
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        name='description'
                                        onChange={props.handleChange}
                                        value={props.values.description}
                                        minRows={3}
                                        placeholder="Description"
                                        style={{ width: 258, paddingLeft: 8 }}
                                    />
                                </Stack>
                                <ErrorMessage name="description">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                            </DialogContent>
                            <div style={{ margin: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button autoFocus onClick={handleClose} variant='contained' color="error">
                                        Close
                                    </Button>
                                    <Button type='submit' autoFocus variant='contained'>
                                        Add Product
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

export default AddProduct