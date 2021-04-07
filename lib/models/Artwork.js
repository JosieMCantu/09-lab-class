//MODEL


const pool = require('../utils/pool');


module.exports = class Artwork {
id;
pieceName;
title;
artist;

constructor(row) {
    this.id = row.id;
    this.pieceName = row.piece_name;
    this.title = row.title;
    this.artist = row.artist;
}

static async insert(artwork) {
    const { rows } = await pool.query(
        'INSERT INTO art (piece_name, title, artist) VALUES ($1, $2, $3) RETURNING *', [artwork.pieceName, artwork.title, artwork.artist]
    );
    return new Artwork(rows[0]);
}

static async select() {
    const { rows } = await pool.query(
        'SELECT * FROM art');
        return rows.map(row => new Artwork(row));
}

static async selectId(id) {
    const { rows } = await pool.query(
        'SELECT * FROM art WHERE id=$1', [id]);
        return new Artwork(rows[0]);
}

static async updateId(id, {pieceName}) {
    const { rows } = await pool.query(
        'UPDATE art SET piece_name = $1 WHERE id = $2 RETURNING *', [pieceName, id]);
        return new Artwork(rows[0]);
}

static async deleteId(id) {
    const { rows } = await pool.query(
        'DELETE from art WHERE id=$1 RETURNING *', [id]);
        return new Artwork(rows[0]);
}

}