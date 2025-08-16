import * as cheerio from 'cheerio';
import * as fs from 'fs';
import dbConnect from '../src/lib/mongodb';
import JodiCell from '../src/lib/models/JobiCell';
import PanelWeek from '../src/lib/models/PanelWeek';

const args = process.argv.slice(2);
const type = args.find(arg => arg.startsWith('--type='))?.split('=')[1];
const market = args.find(arg => arg.startsWith('--market='))?.split('=')[1];
const file = args.find(arg => arg.startsWith('--file='))?.split('=')[1];

if (!type || !market || !file) {
  console.log('Usage: bun run scripts/import-from-html.ts --type=jodi|panel --market="market-slug" --file=./seed/file.html');
  process.exit(1);
}

async function importJodiData(html: string, marketSlug: string) {
  const $ = cheerio.load(html);

  // Clear existing data
  await JodiCell.deleteMany({ marketSlug });

  const cells: any[] = [];

  $('tbody tr').each((rowIndex, row) => {
    $(row).find('td').each((colIndex, cell) => {
      const $cell = $(cell);
      cells.push({
        marketSlug,
        row: rowIndex,
        col: colIndex,
        raw: $cell.html() || '',
        isR: $cell.hasClass('r')
      });
    });
  });

  if (cells.length > 0) {
    await JodiCell.insertMany(cells);
    console.log(`Imported ${cells.length} jodi cells for ${marketSlug}`);
  }
}

async function importPanelData(html: string, marketSlug: string) {
  const $ = cheerio.load(html);

  // Clear existing data
  await PanelWeek.deleteMany({ marketSlug });

  const weeks: any[] = [];

  $('tbody tr').each((index, row) => {
    const $row = $(row);
    const tds = $row.find('td');

    if (tds.length >= 8) {
      const dateLabel = $(tds[0]).html() || '';
      const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

      const weekData: any = {
        marketSlug,
        dateLabel
      };

      days.forEach((day, dayIndex) => {
        const $td = $(tds[dayIndex + 1]);
        const content = $td.html() || '';
        const lines = content.split('<br>').map(line => line.trim()).filter(Boolean);

        weekData[day] = {
          triple: lines[0] || '',
          pair: lines[1] || '',
          isR: $td.hasClass('r')
        };
      });

      weeks.push(weekData);
    }
  });

  if (weeks.length > 0) {
    await PanelWeek.insertMany(weeks);
    console.log(`Imported ${weeks.length} panel weeks for ${marketSlug}`);
  }
}

async function main() {
  try {
    await dbConnect();

    const html = fs.readFileSync(file, 'utf8');

    if (type === 'jodi') {
      await importJodiData(html, market!);
    } else if (type === 'panel') {
      await importPanelData(html, market!);
    }

    console.log('Import completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

main();
