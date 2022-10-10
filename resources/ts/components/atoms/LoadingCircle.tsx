import { memo, useState, useEffect, FC } from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number },
) => {
    return (
    <Box  sx={{ position: 'relative', display: 'inline-flex', width:'100%', justifyContent:'center', my:'30px' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
            sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="caption"
                component="div"
                color="text.secondary"
            >{`${Math.round(props.value)}%`}</Typography>
        </Box>
    </Box>
    );
}

type Props = {
    interval: number;
}

const LoadingCircle:FC<Props> = memo((props) => {

    const { interval } = props;

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, interval);
        return () => {
        clearInterval(timer);
        };
    }, []);
    
    return <CircularProgressWithLabel value={progress} />;
}); 

export default LoadingCircle;