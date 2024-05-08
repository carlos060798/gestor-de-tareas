import { CorsOptions } from 'cors';
const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
export default corsOptions;