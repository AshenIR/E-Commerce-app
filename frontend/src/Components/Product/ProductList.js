import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProductsCard from './ProductCard';
import RemoveProduct from './RemoveProduct';

const ProductList = ({ products, toggle, setToggle }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={3}>
            {products.map((product, index) => (

                <Grid item xs={12} md={8} lg={4}>

                    <Card sx={{ maxWidth: 360, mt: 4 }}>

                        <CardHeader
                            action={<>
                                <RemoveProduct id={product._id} setToggle={setToggle} toggle={toggle} />
                            </>
                            }
                            title={product.productName}
                            subheader={<><p>{product.brand}</p> <>{product.price}</></>}

                        />

                        <CardMedia
                            component="img"
                            height="320"
                            image={product.avatar}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        </CardContent>
                        <div style={{ margin: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ProductsCard product={product} setToggle={setToggle} toggle={toggle} />

                            </div>
                        </div>
                    </Card>
                </Grid>

            ))}
        </Grid>
    )
}

export default ProductList