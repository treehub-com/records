const fetch = require('node-fetch');
const moment = require('moment');
const save = require('../lib/save.js');

const now = moment().format('YYYY-MM-DD HH:mm:SS');
const repository_id = 1;

scrape()
  .then((collections) => index(collections))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


async function scrape() {
  const res = await fetch('https://familysearch.org/search/collectioninfo?summary=true&facets=OFF&offset=0&count=3000', {

  });

  if (!res.ok) {
    console.error(res.headers);
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const json = await res.json();
  console.log(`${json.totalHits} collections`);

  return json.collections;
}

async function index(collections) {
  const data = [];
  for (const collection of collections) {
    data.push({
      external_id: collection.collectionId,
      title: collection.title,
      description: '',
      url: `https://familysearch.org/search/collection/${collection.collectionId}`,
      records: collection.count > 0 ? collection.count : undefined,
      images: collection.imageCount,
      indexed: collection.searchable ? 1 : 0,
      repository_id,
      updated: moment(collection.lastUpdateMillis).format('YYYY-MM-DD'),
      last_scraped: now,
    });
  }
  await save(data);
}
