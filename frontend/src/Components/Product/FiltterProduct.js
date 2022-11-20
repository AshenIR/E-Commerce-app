import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const FilterProduct = ({ categories, setFilter, toggle, setToggle }) => {

    const handleChange = (event) => {
        setFilter(event.target.value)
        setToggle(!toggle)
    };

    return (
        <Box sx={{minWidth:50}}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Event Status"
                    onChange={handleChange}
                >
                    <MenuItem value={''}>{'None'}</MenuItem>
                    {categories && categories.map((category) => (
                        <MenuItem value={category._id}>{category.categoryName}</MenuItem>
                    )
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterProduct