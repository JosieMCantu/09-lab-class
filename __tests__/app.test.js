const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Artwork = require('../lib/models/Artwork');

describe('artwork database tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
let artwork;
  beforeEach(async () => {
    artwork = await Artwork.insert({
      pieceName: 'testingpiece', 
      title: 'testingtitle', 
      artist: 'testingartist'});
  });

  it('POST creates a new piece of artwork in the art database', async () => {
    // return request(app)
    // .post('/api/v1/art')
    // .send({pieceName: 'anotherpiecename', title: 'anothertitle', artist: 'anotherartist'})
    // .then(() => {
    //   expect().toEqual({
    //     "id": "1",
    //     "pieceName": "anotherpiecename",
    //     "title": "anothertitle",
    //     "artist": "anotherartist"});
    // });

    const res = await request(app)
    .post('/api/v1/art')
    .send({pieceName: 'first-piece', title: 'first-title', artist: 'first-artist'});

    expect(res.body).toEqual({
          "id": "2",
          "pieceName": "first-piece",
          "title": "first-title",
          "artist": "first-artist"});
  });

  it('GET it gets all artwork from the art database', async () => {
    const res = await request(app)
    .get('/api/v1/art');
    expect(res.body).toEqual([
      {
          "id": "1",
          "pieceName": "testingpiece",
          "title": "testingtitle",
          "artist": "testingartist"
      }
  ])
  })

  it('GET it gets one piece of art by ID from the art database', async () => {
    const res = await request(app)
    .get('/api/v1/art/1');
    expect(res.body).toEqual({
      "id": "1",
      "pieceName": "testingpiece",
      "title": "testingtitle",
      "artist": "testingartist"});
  })

  it('PUT updates a piece of artwork by id', async () => {
    const res = await request(app)
    .put(`/api/v1/art/${artwork.id}`)
    .send({
      "id": "1",
      "pieceName": "testingpieceTWO",
      "title": "testingtitle",
      "artist": "testingartist"});

    expect(res.body).toEqual({
      "id": "1",
      "pieceName": "testingpieceTWO",
      "title": "testingtitle",
      "artist": "testingartist"});
  })

  it('DELETE it should delete an entry on the database', async () => {
    const res = await request(app)
    .delete('/api/v1/art/1');
    expect(res.body).toEqual({
      "id": "1",
      "pieceName": "testingpiece",
      "title": "testingtitle",
      "artist": "testingartist"});
  })

});
