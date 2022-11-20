import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CategoryCard from './CategoryCard';
import RemoveCategory from './RemoveCategory';

const CategoryList = ({ categories, toggle, setToggle }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={3}>
            {categories.map((category, index) => (

                <Grid item xs={12} md={8} lg={4}>

                    <Card sx={{ maxWidth: 360, mt: 4 }}>

                        <CardHeader
                            action={<>
                                <RemoveCategory id={category._id} setToggle={setToggle} toggle={toggle} />
                            </>
                            }
                            title={category.categoryName}

                        />

                        <CardMedia
                            component="img"
                            height="194"
                            image={category.avatar}
                            alt="Paella dish"
                        />
                        <div style={{ margin: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <CategoryCard category={category} setToggle={setToggle} toggle={toggle} />

                            </div>
                        </div>
                    </Card>
                </Grid>

            ))}
        </Grid>
    )
}

export default CategoryList