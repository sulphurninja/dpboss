import dbConnect from '../src/lib/mongodb';
import Market from '../src/lib/models/Market';
import LiveResult from '../src/lib/models/LiveResult';
import JodiCell from '../src/lib/models/JobiCell';
import PanelWeek from '../src/lib/models/PanelWeek';

async function seedData() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Market.deleteMany({});
    await LiveResult.deleteMany({});
    await JodiCell.deleteMany({});
    await PanelWeek.deleteMany({});

    // Seed Markets
    const markets = [
      { slug: 'kalyan', name: 'Kalyan', priority: 100, active: true },
      { slug: 'mumbai-main', name: 'Mumbai Main', priority: 90, active: true },
      { slug: 'milan-day', name: 'Milan Day', priority: 80, active: true },
      { slug: 'milan-night', name: 'Milan Night', priority: 75, active: true },
      { slug: 'sunday-bazar-night', name: 'Sunday Bazar Night', priority: 70, active: true }
    ];

    await Market.insertMany(markets);
    console.log('Markets seeded');

    // Seed Live Results
    const liveResults = [
      { marketSlug: 'kalyan', label: 'KALYAN', value: '123-45-678', updatedAt: new Date() },
      { marketSlug: 'mumbai-main', label: 'MUMBAI MAIN', value: '456-78-901', updatedAt: new Date() },
      { marketSlug: 'milan-day', label: 'MILAN DAY', value: '789-01-234', updatedAt: new Date() }
    ];

    await LiveResult.insertMany(liveResults);
    console.log('Live results seeded');

    // Seed minimal Jodi data
    const jodiCells = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        jodiCells.push({
          marketSlug: 'kalyan',
          row,
          col,
          raw: `${row}${col}`,
          isR: Math.random() < 0.1 // 10% chance of being highlighted
        });
      }
    }

    await JodiCell.insertMany(jodiCells);
    console.log('Jodi cells seeded');

    // Seed minimal Panel data
    const panelWeeks = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i * 7);

      panelWeeks.push({
        marketSlug: 'kalyan',
        dateLabel: `${date.getDate()}/${date.getMonth() + 1}<br>${date.getFullYear()}`,
        mon: { triple: '123', pair: '45', isR: false },
        tue: { triple: '234', pair: '56', isR: false },
        wed: { triple: '345', pair: '67', isR: true },
        thu: { triple: '456', pair: '78', isR: false },
        fri: { triple: '567', pair: '89', isR: false },
        sat: { triple: '678', pair: '90', isR: false },
        sun: { triple: '789', pair: '01', isR: false }
      });
    }

    await PanelWeek.insertMany(panelWeeks);
    console.log('Panel weeks seeded');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedData();
