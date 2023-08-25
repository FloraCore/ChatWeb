import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Card, CardContent, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";

interface Props {
    time?: string;
    uploader?: string;
    target?: string;
}

/**
 * 上传者
 */
const MetaData: React.FC<Props> = (props) => {
    const {
        time,
        uploader,
        target,
    } = props;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    return (
        <ThemeProvider theme={theme}>
            <Card sx={{width: '25%'}}>
                <CardContent>
                    <Typography variant="h6">
                        聊天查看器
                    </Typography>
                    <List
                        sx={{
                            width: '100%',
                        }}>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary="上传者"/>
                            <Typography>
                                {uploader}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="目标"/>
                            <Typography>
                                {target}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="上传时间"/>
                            <Typography>
                                {time}
                            </Typography>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default MetaData;
