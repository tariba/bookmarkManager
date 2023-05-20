
import pool from "../db/index.js";

export async function getAllData () {
    const response = await pool.query("SELECT * FROM bookmark")
    return response.rows
}

export async function getDataByTitle(title) {
    const response = await pool.query ("SELECT * FROM bookmark WHERE LOWER(title) LIKE LOWER($1)", [`%${title}%`])
    return response.rows
}

export async function postData(data) {
    const response  = await pool.query ("INSERT INTO bookmark(title, link) VALUES($1, $2) RETURNING*", [data.title, data.link])
    console.log(response.rows)
    return response.rows
}

export async function deleteData (id) {
    const response = await pool.query("DELETE FROM bookmark WHERE id=$1 RETURNING*", [id])
    return response.rows
}

export async function updateData(id, data) {
    const response = await pool.query ("UPDATE bookmark SET title = $1, link = $2 WHERE id=$3 RETURNING*", [data.title, data.link, id])
    
    return response.rows
}