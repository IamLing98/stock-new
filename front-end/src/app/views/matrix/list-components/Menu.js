import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0'
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5)
            },
            '&:active': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
            }
        }
    }
}));

export default function CustomizedMenus({ defaultValues, data, setData, defaultData }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (number, text) => {
        console.log('Text');
        setAnchorEl(null);
        setTitle(text);
        if (number === 1) {
            setData(defaultData);
        } else if (number === 2) {
            let newData = defaultData?.filter(
                (item) => parseInt(item?.SCORE?.value) > 0 && parseInt(item?.Volume?.value?.replace(',', '')) > 200000
            );
            setData(newData);
        } else if (number === 3) {
            let newData = defaultData?.filter((item) => {
                console.log(item);
                return item?.G24?.value?.startsWith('+') || item?.G25?.value?.startsWith('+');
            });
            console.log('New data:', newData);
            setData(newData);
        }
    };

    const [title, setTitle] = React.useState('Chế độ 1');

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {title}{' '}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={(e) => {
                    handleClose();
                }}
            >
                <MenuItem onClick={(e) => handleClose(1, 'Chế độ 1')} disableRipple>
                    Chế độ 1
                </MenuItem>
                <MenuItem onClick={(e) => handleClose(2, 'Chế độ 2')} disableRipple>
                    Chế độ 2
                </MenuItem>
                <MenuItem onClick={(e) => handleClose(3, 'Chế độ 3')} disableRipple>
                    Chế độ 3
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
