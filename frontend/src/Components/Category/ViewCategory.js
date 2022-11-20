import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList'

const ViewCategory = () => {

    const [categories, setCategories] = useState([])
    const [toggle, setToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!searchTerm) {
            function getCategories() {
                axios.get("http://localhost:5000/categories/viewCategories").then((res) => {
                    console.log(res.data, "dddddddd")
                    setCategories(res.data)
                }).catch((err) => {
                    console.log(err.message);
                })
            }
            getCategories()
        }
    }, [toggle])

    return (
        <>
            <Container sx={{ mt: 4 }}>
                <Grid item sx={{ display: "flex", justifyContent: "flex-end" }} xs={12} md={8} lg={6}>
                    <AddCategory toggle={toggle} setToggle={setToggle} />
                </Grid>
            </Container>
            <CategoryList categories={categories} toggle={toggle} setToggle={setToggle} />
        </>
    )
}

export default ViewCategory