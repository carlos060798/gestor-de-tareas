
import server from './server';

const port = 4500 ;


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
