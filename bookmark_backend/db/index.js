import pkg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const{Pool} = pkg;

const URL= process.env.DATABASE_URL



 const pool = new Pool ({
    connectionString: URL,

})
export default pool