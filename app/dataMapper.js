import client from './database.js';

const dataMapper = {

    getAllFigurines: async () => {
        const sql = 'SELECT * FROM figurine;';
        const result = await client.query(sql);
        return result.rows;
    },
    
    getOneFigurine: async (id) => {
        const sql = `SELECT * FROM figurine WHERE id = ${id};`;
        const result = await client.query(sql);
        return result.rows[0];
    },

    getOneFigurineWithReviews: (id)=> {
        const query = {
            text: `
            SELECT
              figurine.*,
              review.*
            FROM
              figurine
            INNER JOIN
              review
            ON
              figurine.id = review.figurine_id
            WHERE
              figurine.id = 1;`,
        values: [id],
        };
    }

};
export default dataMapper;