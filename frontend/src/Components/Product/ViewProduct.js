import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import FilterProduct from "./FiltterProduct";
import ProductSearchBar from "./ProductSearchBar";

const ViewProduct = () => {

    const [products, setProducts] = useState([])
    const [toggle, setToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = React.useState([]);
    const [filter, setFilter] = useState()

    useEffect(() => {
        if (!searchTerm && !filter) {
            function getProducts() {
                axios.get("http://localhost:5000/products/viewProducts").then((res) => {
                    console.log(res.data)
                    setProducts(res.data)
                }).catch((err) => {
                    alert(err.message);
                    console.log(err.message);
                })
            }
            getProducts()
        }
    }, [toggle, searchTerm])

    useEffect(() => {
        if (filter) {
            let query = `?categoryID=${filter}`
            axios.get(`http://localhost:5000/products/filter${query}`)
                .then((res) => {
                    console.log(res.data, "res.data")
                    let arr = res.data;
                    let i;
                    let list = [];
                    for (i = 0; i < arr.length; i++) {
                        list.push(arr[i]);
                    }
                    setProducts(list)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [toggle])

    useEffect(() => {
        function getCategories() {
            axios.get("http://localhost:5000/categories/viewCategories").then((res) => {
                console.log(res.data, "dddddddd")
                setCategories(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getCategories()
    }, [])

    const findProducts = (productName) => {
        if (productName) {
            axios.get(`http://localhost:5000/products/search/${productName}`)

                .then((res) => {
                    let arr = res.data;
                    let i;
                    let list = [];
                    for (i = 0; i < arr.length; i++) {
                        list.push(arr[i]);
                    }
                    setProducts(list)
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    };

    return (
        <>
            <Container sx={{ ml: 40 }}>
                <ProductSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} findProducts={findProducts} />
            </Container>
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3} justifyContent="space-between">
                    <Grid item xs={12} md={8} lg={3}>
                        <FilterProduct categories={categories} filter={filter} setFilter={setFilter} toggle={toggle} setToggle={setToggle} />
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "flex-end" }} xs={12} md={8} lg={6}>
                        <AddProduct toggle={toggle} setToggle={setToggle} categories={categories} />
                    </Grid>
                </Grid>
            </Container>
            <ProductList products={products} toggle={toggle} setToggle={setToggle} />
        </>
    )
}

export default ViewProduct

