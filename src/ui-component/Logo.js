// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo12.jpg';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <div>
            <img src={logo} alt="Berry" width="120" />
        </div>
    );
};

export default Logo;
