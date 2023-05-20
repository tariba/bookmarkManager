import pkg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const{Pool} = pkg;

const URL= process.env.DATABASE_URL
console.log('I am pg.pool', URL)


 const pool = new Pool ({
    connectionString: URL,

})
export default pool