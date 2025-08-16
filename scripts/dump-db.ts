import dbConnect from '../src/lib/mongodb';
import Market from '../src/lib/models/Market';
import LiveResult from '../src/lib/models/LiveResult';
import JodiCell from '../src/lib/models/JobiCell';
import PanelWeek from '../src/lib/models/PanelWeek';
import * as fs from 'fs';

async function dumpDatabase() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');
    const data = {
      markets: await Market.find({}).lean(),
      liveResults: await LiveResult.find({}).lean(),
      jodiCells: await JodiCell.find({}).lean(),
      panelWeeks: await PanelWeek.find({}).lean()
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `db-dump-${timestamp}.json`;

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Database dumped to ${filename}`);

    console.log(`Markets: ${data.markets.length}`);
    console.log(`Live Results: ${data.liveResults.length}`);
    console.log(`Jodi Cells: ${data.jodiCells.length}`);
    console.log(`Panel Weeks: ${data.panelWeeks.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Dump failed:', error);
    process.exit(1);
  }
}

dumpDatabase();
