import dbConnect from '@/lib/mongodb';
import LiveResult from '@/lib/models/LiveResult';
import RefreshButton from '@/components/RefreshButton';
import RotatingLink from '@/components/RotatingLink';
import BottomRefreshButton from '@/components/BottomRefreshButton';
import ScrollRestorer from '@/components/ScrollRestorer';

export const runtime = 'nodejs';

type LiveRow = {
  label?: string;
  value?: string;
  extra?: string;
};

export default async function HomePage() {
  await dbConnect();
  const liveResults: LiveRow[] = await LiveResult.find({}).sort({ updatedAt: -1 }).lean();
  return (
    <>
      {/* Top banner */}
      <div className="m-icon">
        <img src="/header.png" alt="DPBOSS Banner" height={57} width={292} />
      </div>

      {/* Welcome strip (EXACT inline styles kept) */}
      <div
        style={{
          marginBottom: '5px',
          display: 'flex',
          padding: '5px',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '10px',
          border: '2px solid #ff182c',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 40%)',
        }}
      >
        <img src="/ganpati.jpg" alt="dpboss net LAXMI_PICTURE" width={90} height={68} />
        <p style={{ color: 'black', display: 'inline-block', fontSize: '16px' }}>
          !! Welcome to dpboss international !! Satta Matka Fast Result
        </p>
      </div>

      {/* Intro text (inline styles preserved) */}
      <div className="text2">
        <h1 style={{ fontSize: '16px', color: '#000', paddingBottom: '3px' }}>
          Satta Matka Dpboss.net Kalyan Matka Result
        </h1>
        <h2 style={{ color: '#444', fontSize: '14px' }}>
          DPBOSS.Service is the No. 1 Matka Sites welcomes you full-heartedly. Here below you can
          find the perfect guess by the top guesser along with the Fast Matka Result too. Aaj Ka
          Satta Kalyan Fix Single Jodi free update here you find top Matka Market of India Kalyan
          Main Milan Rajdhani* *kalyan Matka Tips *fast Matka Result *kalyan Main Rajdhani Matka
          Chart *Matka Guessing by DPBOSS By App Best Matka Site By DPBOSS 23
        </h2>
      </div>

      {/* Today Lucky Number (inline widths & borders preserved) */}
      <div className="f-pti">
        <h3>Today Lucky Number</h3>
        <div className="dflex">
          <div className="j52g4" style={{ borderRight: '1px solid #ff0016', width: '40%' }}>
            <h4>Golden Ank</h4>
            <p>4-9-3-8</p>
          </div>
          <div className="j52g4" style={{ width: '60%' }}>
            <h4>Final Ank</h4>
            <div className="amthltg">
              <p>
                MILAN MORNING - 4<br />
                SRIDEVI - 6<br />
                MAIN BAZAR MORNING - 2<br />
                KALYAN MORNING - 0<br />
                MADHURI - 4<br />
                SRIDEVI MORNING - 6<br />
                KARNATAKA DAY - 4<br />
                TIME BAZAR - 2<br />
                MILAN DAY - 0<br />
                NEW TIME BAZAR - 6<br />
                KALYAN - 2<br />
                SRIDEVI NIGHT - 8<br />
                MADHURI NIGHT - 4<br />
                MILAN NIGHT - 8<br />
                RAJDHANI NIGHT - 6<br />
                MAIN BAZAR - 8<br />
                BOMBAY DAY - 4<br />
                MUMBAI MORNING - 4<br />
                KALYAN NIGHT - 8<br />
                NAMASTHE - 4<br />
                OLD MAIN MUMBAI - 2<br />
                MADHUR DAY - 2<br />
                MADHUR NIGHT - 2<br />
                SUNDAY BAZAR - 4<br />
                SUNDAY BAZAR NIGHT - 0<br />
                MAIN KALYAN - 2<br />
                MAIN MARKET - 2<br />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE RESULT (HTML structure preserved) */}
      <div className="liv-rslt">
        <h4>☔LIVE RESULT☔</h4>
        <div className="lv-mc">
          Sabse Tezz Live Result Yahi Milega
          <span className="h8">KALYAN</span>
          <span className="h9">Loading...</span>
          <RefreshButton />

          <span className="h8">SUPER MATKA</span>
          <span className="h9">Loading...</span>
          <RefreshButton />

          <span className="h8">KALYAN MAIN BAZAR</span>
          <span className="h9"> 335-10-677</span>
          <RefreshButton />

          <span className="h8">NTR DAY</span>
          <span className="h9">Loading...</span>
          <RefreshButton />
          <br />
        </div>

        {Array.isArray(liveResults) && liveResults.length > 0 && (
          <div className="lv-mc">
            {liveResults.map((row, i) => (
              <div key={i}>
                {row.label && <span className="h8">{row.label}</span>}
                {row.value && <span className="h9">{row.value}</span>}
                {row.extra && <span className="h9">{row.extra}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Independence Day Notice (inline preserved) */}
      {/* <div
        className="text2"
        style={{
          marginBottom: '7px',
          fontSize: '16px',
          padding: '7px',
          lineHeight: '25px',
          color: '#00094d',
          fontWeight: 500,
        }}
      >
        <span
          style={{
            color: '#ff00a2',
            display: 'block',
            textShadow: '0px 0px 5px white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          🎉 Happy Independence Day! 🇮🇳
        </span>
        We wish to inform you that all markets will be closed on August 15, 2025, for Independence
        Day. Celebrate this historic day with fervor and pride.
        <br />
        <br />
        <b>Jai Hind! 🇮🇳 Jai Bharat 🇮🇳 </b>
      </div> */}

      {/* Notice (inline preserved) */}
      <div className="text2" style={{ marginBottom: '7px', fontSize: '16px', padding: '7px', lineHeight: '25px' }}>
        <span
          style={{
            background: '#b80000',
            color: 'white',
            display: 'block',
            textShadow: '0px 0px 5px black',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          ☆ NOTICE ☆
        </span>
        अपना बाजार dpboss.gold वेबसाइट में डलवाने <br />
        के लिए आज ही हमें ईमेल करे <br />
        <a style={{ color: '#522f92' }} href="mailto:support@dpboss.net">
          Email : support@dpboss.net
        </a>
        <br />
        शर्ते लागु
      </div>

      {/* Keyphrase block */}
      <div>
        <div className="text3">
          KALYAN MATKA | MATKA RESULT | KALYAN MATKA TIPS | SATTA MATKA | MATKA.COM | MATKA PANA
          JODI TODAY | BATTA SATKA | MATKA PATTI JODI NUMBER | MATKA RESULTS | MATKA CHART | MATKA
          JODI | SATTA COM | FULL RATE GAME | MATKA GAME | MATKA WAPKA | ALL MATKA RESULT LIVE
          ONLINE | MATKA RESULT | KALYAN MATKA RESULT | DPBOSS MATKA 143 | MAIN MATKA
        </div>
      </div>

      {/* WORLD ME SABSE FAST */}
      <h4 className="flyr24"> WORLD ME SABSE FAST SATTA MATKA RESULT </h4>

      <div className="tkt-val" style={{ borderColor: '#aa00c0', marginBottom: '2px' }}>
        <div>
          <h4>MILAN MORNING</h4>
          <span>380-16-178</span>
          <p>10:30 AM &nbsp;&nbsp; 11:30 AM</p>
          <a href="/jodi-chart-record/milan-morning.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/milan-morning.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>SRIDEVI</h4>
          <span>149-49-360</span>
          <p>11:45 AM &nbsp;&nbsp; 12:45 PM</p>
          <a href="/jodi-chart-record/sridevi.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/sridevi.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>MAIN BAZAR MORNING</h4>
          <span>148-38-125</span>
          <p>11:15 AM &nbsp;&nbsp; 12:15 PM</p>
          <a href="/jodi-chart-record/main-bazar-morning.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/main-bazar-morning.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>KALYAN MORNING</h4>
          <span>390-28-170</span>
          <p>11:00 AM &nbsp;&nbsp; 12:02 PM</p>
          <a href="/jodi-chart-record/kalyan-morning.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/kalyan-morning.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>PADMAVATHI</h4>
          <span>789-42-200</span>
          <p>11:40 AM &nbsp;&nbsp; 12:40 PM</p>
          <a href="/jodi-chart-record/padmavathi.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/padmavathi.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div className="bg-ylw">
          <h4>MADHURI</h4>
          <span>245-11-236</span>
          <p>11:45 AM &nbsp;&nbsp; 12:45 PM</p>
          <a href="/jodi-chart-record/madhuri.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/madhuri.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>RAJDHANI MORNING [main]</h4>
          <span>178-63-580</span>
          <p>11:25 AM &nbsp;&nbsp; 12:55 PM</p>
          <a href="/jodi-chart-record/rajdhani-morning-main.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/rajdhani-morning-main.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>SRIDEVI MORNING</h4>
          <span>246-21-290</span>
          <p>10:00 AM &nbsp;&nbsp; 11:00 AM</p>
          <a href="/jodi-chart-record/sridevi-morning.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/sridevi-morning.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

      <div>
          <h4>MAHARANI</h4>
          <span>157-36-123</span>
          <p>12:15 PM &nbsp;&nbsp; 02:15 PM</p>
          <a href="/jodi-chart-record/maharani.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/maharani.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        {/* Add the missing sections */}
        <div>
          <h4>WORLI NIGHT</h4>
          <span>236-10-460</span>
          <p>07:30 PM &nbsp;&nbsp; 08:30 PM</p>
          <a href="/jodi-chart-record/worli-night.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/worli-night.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>KAVERI</h4>
          <span>800-80-299</span>
          <p>04:30 PM &nbsp;&nbsp; 06:30 PM</p>
          <a href="/jodi-chart-record/kaveri.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/kaveri.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>

        <div>
          <h4>RADHA-RANI MORNING</h4>
          <span>112-47-124</span>
          <p>12:30 PM &nbsp;&nbsp; 01:30 PM</p>
          <a href="/jodi-chart-record/radha-rani-morning.php" className="vl-clk gm-clk">
            Jodi
          </a>
          <a href="/panel-chart-record/radha-rani-morning.php" className="vl-clk-2 gm-clk">
            Panel
          </a>
        </div>
      </div>

     {/* Email contact section */}
      <div className="eml-us">
        <p>Email for any inquiries Or Support:</p>
        <a href="mailto:support@dpboss.net">support@dpboss.net</a>
      </div>

      {/* Main Star Line Original Result */}
      <div className="my-table mr-sl">
        <h4>MAIN STARLINE</h4>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Result</th>
              <th>Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09:05 AM</td>
              <td>467-7</td>
              <td>03:05 PM</td>
              <td>770-4</td>
            </tr>
            <tr>
              <td>10:05 AM</td>
              <td>260-8</td>
              <td>04:05 PM</td>
              <td>279-8</td>
            </tr>
            <tr>
              <td>11:05 AM</td>
              <td>146-1</td>
              <td>05:05 PM</td>
              <td>355-3</td>
            </tr>
            <tr>
              <td>12:05 PM</td>
              <td>226-0</td>
              <td>06:05 PM</td>
              <td>156-2</td>
            </tr>
            <tr>
              <td>01:05 PM</td>
              <td>256-3</td>
              <td>07:05 PM</td>
              <td>456-5</td>
            </tr>
            <tr>
              <td>02:05 PM</td>
              <td>679-2</td>
              <td>08:05 PM</td>
              <td>240-6</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mumbai Rajshree Star Line */}
      <div className="my-table mumraj-sl">
        <h4>Mumbai Rajshree Star Line Result</h4>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Result</th>
              <th>Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09:30 AM</td>
              <td></td>
              <td>03:30 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>10:30 AM</td>
              <td></td>
              <td>04:30 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>11:30 AM</td>
              <td></td>
              <td>05:30 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>12:30 PM</td>
              <td></td>
              <td>06:30 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>01:30 PM</td>
              <td></td>
              <td>07:30 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>02:30 PM</td>
              <td></td>
              <td>08:30 PM</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Main Bombay 36 Bazar with Spinning Wheel */}
      <div className="my-table mr-sl" style={{ border: '1px solid red', margin: '5px 0px' }}>
        <h4>
          MAIN BOMBAY 36 BAZAR
          <a href="main-bombay-36-bazar-chart.php" style={{
            padding: '3px 5px 2px',
            height: 'auto',
            width: 'auto',
            float: 'right',
            margin: '-1px 0px 0px 0',
            backgroundColor: '#000',
            borderRadius: '5px',
            fontSize: '14px',
            color: 'white',
            textShadow: 'none'
          }}>Chart</a>
        </h4>

        {/* SPIN WHEEL SECTION */}
        <div className="wheel-section">
          <div className="wheel-container">
            <div className="spin-center-text">--</div>
            <img src="/spinner.webp" className="wheel-image" alt="Spinning Wheel" />
          </div>
        </div>

        {/* RESULT TABLE */}
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Result</th>
              <th>Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>11:00 AM</td><td>238-3</td><td>11:15 AM</td><td>667-9</td></tr>
            <tr><td>11:30 AM</td><td>456-5</td><td>11:45 AM</td><td>250-7</td></tr>
            <tr><td>12:00 PM</td><td>400-4</td><td>12:15 PM</td><td>226-0</td></tr>
            <tr><td>12:30 PM</td><td>337-3</td><td>12:45 PM</td><td>230-5</td></tr>
            <tr><td>01:00 PM</td><td>126-9</td><td>01:15 PM</td><td>137-1</td></tr>
            <tr><td>01:30 PM</td><td>560-1</td><td>01:45 PM</td><td>569-0</td></tr>
            <tr><td>02:00 PM</td><td>170-8</td><td>02:15 PM</td><td>279-8</td></tr>
            <tr><td>02:30 PM</td><td>149-4</td><td>02:45 PM</td><td>255-2</td></tr>
            <tr><td>03:00 PM</td><td>345-2</td><td>03:15 PM</td><td>160-7</td></tr>
            <tr><td>03:30 PM</td><td>679-2</td><td>03:45 PM</td><td>780-5</td></tr>
            <tr><td>04:00 PM</td><td>556-6</td><td>04:15 PM</td><td>378-8</td></tr>
            <tr><td>04:30 PM</td><td>145-0</td><td>04:45 PM</td><td>155-1</td></tr>
            <tr><td>05:00 PM</td><td>589-2</td><td>05:15 PM</td><td>168-5</td></tr>
            <tr><td>05:30 PM</td><td>440-8</td><td>05:45 PM</td><td>388-9</td></tr>
            <tr><td>06:00 PM</td><td>235-0</td><td>06:15 PM</td><td>446-4</td></tr>
            <tr><td>06:30 PM</td><td>269-7</td><td>06:45 PM</td><td>150-6</td></tr>
            <tr><td>07:00 PM</td><td>800-8</td><td>07:15 PM</td><td>366-5</td></tr>
            <tr><td>07:30 PM</td><td>135-9</td><td>07:45 PM</td><td>557-7</td></tr>
          </tbody>
        </table>
      </div>

      {/* Dpboss Special Game Zone */}
      <div className="sky-23">
        <h4>Dpboss Special Game Zone</h4>
        <a href="https://dpboss.boston/guessing-forum.php">Dpboss Guessing Forum (Post)</a>
        <a href="https://dpboss.boston/matka-free-open.php">All market free fix game</a>
        <a href="https://dpboss.boston/khatris-favourite-panna-chart.php">Ratan Khatri Fix Panel Chart</a>
        <a href="https://dpboss.boston/matka-final-number-chart.php">Matka Final Number Trick Chart</a>
        <a href="https://dpboss.boston/ever-green-tricks/satta-matka-tricks-zone.php">EverGreen Trick Zone And Matka Tricks By DpBoss</a>
      </div>

      {/* Matka Jodi List */}
      <div className="sky-23">
        <h4>Matka Jodi List</h4>
        <a href="https://dpboss.boston/matka-jodi-count-chart.php">Matka Jodi Count Chart</a>
        <a href="https://dpboss.boston/fix-open-to-close-by-date.php">Dhanvarsha Daily Fix Open To Close</a>
        <a href="https://dpboss.boston/jodi-chart-family-matka.php">Matka Jodi Family Chart</a>
        <a href="https://dpboss.boston/penal-count-chart.php">Penal Count Chart</a>
        <a href="https://dpboss.boston/penal-total-chart.php">Penal Total Chart</a>
        <a href="https://dpboss.boston/All-22-Card-Panna-Penal-Patti-Chart.php">All 220 Card List</a>
      </div>

      {/* Weekly Charts Section */}
      <div className="sun-col">
        <div>
          <h4>DpBoss Net Weekly Patti Or Penal Chart From 11-08-2025 To 17-08-2025 For Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai Royal Night</h4>
          <p>1=&gt;678-119-236-489</p>
          <p>2=&gt;237-660-156-480</p>
          <p>3=&gt;580-689-256-139</p>
          <p>4=&gt;347-680-400-112</p>
          <p>5=&gt;249-140-159-168</p>
          <p>6=&gt;268-114-556-367</p>
          <p>7=&gt;269-250-359-340</p>
          <p>8=&gt;378-558-134-170</p>
          <p>9=&gt;568-289-559-469</p>
          <p>0=&gt;127-479-118-280</p>
        </div>
        <div>
          <h4>DpBoss Net Weekly Line Open Or Close From 11-08-2025 To 17-08-2025 For Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai Royal Night</h4>
          <p>Mon. 1-2-3-4</p>
          <p>Tue. 2-7-5-0</p>
          <p>Wed. 4-9-5-0</p>
          <p>Thu. 1-6-3-8</p>
          <p>Fri. 4-9-5-0</p>
          <p>Sat. 1-6-3-8</p>
          <p>Sun. 2-7-5-0</p>
        </div>
        <div>
          <h4>DpBoss Net Weekly Jodi Chart From 11-08-2025 To 17-08-2025 For Kalyan Milan Kalyan Night, Rajdhani Time, Main Bazar, Mumbai Royal Night Market</h4>
          <p>20 25 70 75</p>
          <p>13 18 81 86</p>
          <p>22 27 72 77</p>
          <p>43 48 93 98</p>
          <p>02 07 52 57</p>
          <p>14 19 64 69</p>
        </div>
      </div>

      {/* FREE GAME ZONE */}
      <div className="oc-fg">
        <h4>FREE GAME ZONE OPEN-CLOSE</h4>
        <div className="ocfg txta-1 rbd onmb gpg0">
          <div style={{ border: '2px solid #ff019e', margin: '5px 5px 0', borderRadius: '10px' }}>
            <p className="k2w5">✔DATE:↬ : 15/08/2025 ↫</p>
            <span style={{ fontSize: '22px', color: '#000', textShadow: '1px 1px 2px #fff' }}>
              FREE GUESSING DAILY
            </span>
            <h5 className="k2w5">OPEN TO CLOSE FIX ANK</h5>
          </div>
          <div className="d1635">
            <div className="oc-3a-69">
              <p className="g5a1">↪ MILAN MORNING</p>
              <p className="l9w2v">1-6-3-8</p>
              <p className="l9w2v">227-880-178-346-468-567</p>
              <p className="l9w2v">13-18-63-68-31-36-81-86</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ KALYAN MORNING</p>
              <p className="l9w2v">4-9-5-0</p>
              <p className="l9w2v">680-360-140-190-550</p>
              <p className="l9w2v">45-40-95-90-54-59-04-09</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ TIME BAZAR</p>
              <p className="l9w2v">*-*-*-*</p>
              <p className="l9w2v">***-***-***-***-***</p>
              <p className="l9w2v">**-**-**-**-**-**-**-**</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ MILAN DAY</p>
              <p className="l9w2v">*-*-*-*</p>
              <p className="l9w2v">***-***-***-***-***</p>
              <p className="l9w2v">**-**-**-**-**-**-**-**</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ KALYAN</p>
              <p className="l9w2v">*-*-*-*</p>
              <p className="l9w2v">***-***-***-***-***</p>
              <p className="l9w2v">**-**-**-**-**-**-**-**</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ MILAN NIGHT</p>
              <p className="l9w2v">*-*-*-*</p>
              <p className="l9w2v">***-***-***-***-***</p>
              <p className="l9w2v">**-**-**-**-**-**-**-**</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ KALYAN NIGHT</p>
              <p className="l9w2v">*-*-*-*</p>
              <p className="l9w2v">***-***-***-***-***</p>
              <p className="l9w2v">**-**-**-**-**-**-**-**</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ RAJDHANI NIGHT</p>
              <p className="l9w2v">*-*-*-*</p>
              <p className="l9w2v">***-***-***-***-***</p>
              <p className="l9w2v">**-**-**-**-**-**-**-**</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ MAIN BAZAR</p>
              <p className="l9w2v">*-*-*-*</p>
              <p className="l9w2v">***-***-***-***-***</p>
              <p className="l9w2v">**-**-**-**-**-**-**-**</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ PUNA BAZAR</p>
              <p className="l9w2v">2-7-4-9</p>
              <p className="l9w2v">27-72-49-94-24-42</p>
              <p className="l9w2v">138-250-130-450</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ SRIDEVI NIGHT</p>
              <p className="l9w2v">2-3-8-0</p>
              <p className="l9w2v">129-148-134-370</p>
              <p className="l9w2v">22-27-33-38-88-83-00-05</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ MAIN BAZAR MORNING</p>
              <p className="l9w2v">9-4-5-6</p>
              <p className="l9w2v">450-117-220-159-880-125-</p>
              <p className="l9w2v">95-93-40-48-57-52-66-61</p>
              <p className="l9w2v">5-3-0-8</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ PADMAVATI</p>
              <p className="l9w2v">1-3-7-8</p>
              <p className="l9w2v">137-300-570-890-557-378-440</p>
              <p className="l9w2v">12-14-34-38-76-77-80-88</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ KARNATAKA DAY</p>
              <p className="l9w2v">4-5-8</p>
              <p className="l9w2v">130-235-456-890-350-478</p>
              <p className="l9w2v">49-47-57-59-80-89</p>
              <p className="l9w2v">0-7-9</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ SRIDEVI</p>
              <p className="l9w2v">1-5-6-8</p>
              <p className="l9w2v">489-258-240-189</p>
              <p className="l9w2v">11-16-55-50-66-61-88-83</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ PRABHAT</p>
              <p className="l9w2v">4-5-7-8</p>
              <p className="l9w2v">149-239-500-159-467-133-233-477</p>
              <p className="l9w2v">45-40-53-58-73-78-89-84</p>
            </div>
            <div className="oc-3a-69">
              <p className="g5a1">↪ NEW TIME BAZAR</p>
              <p className="l9w2v">9-4-1-6</p>
              <p className="l9w2v">360-149-137-236</p>
              <p className="l9w2v">94-99-44-49-16-11-66-61</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kalyan table */}
      <table width="100%" cellSpacing="0" cellPadding="0" className="l-obj-giv">
        <tbody>
          <tr>
            <td colSpan={9} className="v5a25">कल्याण</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">सोम</td>
            <td rowSpan={2} className="v5a25-v85b">3</td>
            <td>689</td>
            <td rowSpan={2} className="v5a25-v85b">5</td>
            <td>366</td>
            <td rowSpan={2} className="v5a25-v85b">7</td>
            <td>223</td>
            <td rowSpan={2} className="v5a25-v85b">8</td>
            <td>666</td>
          </tr>
          <tr>
            <td>35</td>
            <td>53</td>
            <td>78</td>
            <td>87</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">मंगल</td>
            <td rowSpan={2} className="v5a25-v85b">2</td>
            <td>156</td>
            <td rowSpan={2} className="v5a25-v85b">7</td>
            <td>467</td>
            <td rowSpan={2} className="v5a25-v85b">8</td>
            <td>477</td>
            <td rowSpan={2} className="v5a25-v85b">9</td>
            <td>333</td>
          </tr>
          <tr>
            <td>27</td>
            <td>72</td>
            <td>89</td>
            <td>98</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">बुध</td>
            <td rowSpan={2} className="v5a25-v85b">3</td>
            <td>779</td>
            <td rowSpan={2} className="v5a25-v85b">7</td>
            <td>359</td>
            <td rowSpan={2} className="v5a25-v85b">8</td>
            <td>134</td>
            <td rowSpan={2} className="v5a25-v85b">9</td>
            <td>478</td>
          </tr>
          <tr>
            <td>37</td>
            <td>73</td>
            <td>89</td>
            <td>98</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">गुरु</td>
            <td rowSpan={2} className="v5a25-v85b">3</td>
            <td>779</td>
            <td rowSpan={2} className="v5a25-v85b">5</td>
            <td>168</td>
            <td rowSpan={2} className="v5a25-v85b">7</td>
            <td>133</td>
            <td rowSpan={2} className="v5a25-v85b">9</td>
            <td>388</td>
          </tr>
          <tr>
            <td>35</td>
            <td>53</td>
            <td>79</td>
            <td>97</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">शुक्र</td>
            <td rowSpan={2} className="v5a25-v85b">5</td>
            <td>122</td>
            <td rowSpan={2} className="v5a25-v85b">6</td>
            <td>277</td>
            <td rowSpan={2} className="v5a25-v85b">7</td>
            <td>269</td>
            <td rowSpan={2} className="v5a25-v85b">8</td>
            <td>189</td>
          </tr>
          <tr>
            <td>56</td>
            <td>65</td>
            <td>78</td>
            <td>87</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">शनि</td>
            <td rowSpan={2} className="v5a25-v85b">2</td>
            <td>138</td>
            <td rowSpan={2} className="v5a25-v85b">5</td>
            <td>122</td>
            <td rowSpan={2} className="v5a25-v85b">7</td>
            <td>467</td>
            <td rowSpan={2} className="v5a25-v85b">9</td>
            <td>234</td>
          </tr>
          <tr>
            <td>25</td>
            <td>52</td>
            <td>79</td>
            <td>97</td>
          </tr>
        </tbody>
      </table>

      {/* Kalyan Night table */}
      <table width="100%" cellSpacing="0" cellPadding="0" className="l-obj-giv">
        <tbody>
          <tr>
            <td colSpan={9} className="v5a25">KALYAN NIGHT / MAIN BAZAR</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">सोम</td>
            <td rowSpan={2} className="v5a25-v85b">3</td>
            <td>445</td>
            <td rowSpan={2} className="v5a25-v85b">6</td>
            <td>169</td>
            <td rowSpan={2} className="v5a25-v85b">8</td>
            <td>990</td>
            <td rowSpan={2} className="v5a25-v85b">9</td>
            <td>360</td>
          </tr>
          <tr>
            <td>36</td>
            <td>63</td>
            <td>89</td>
            <td>98</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">मंगल</td>
            <td rowSpan={2} className="v5a25-v85b">3</td>
            <td>148</td>
            <td rowSpan={2} className="v5a25-v85b">4</td>
            <td>158</td>
            <td rowSpan={2} className="v5a25-v85b">5</td>
            <td>690</td>
            <td rowSpan={2} className="v5a25-v85b">6</td>
            <td>556</td>
          </tr>
          <tr>
            <td>34</td>
            <td>43</td>
            <td>56</td>
            <td>65</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">बुध</td>
            <td rowSpan={2} className="v5a25-v85b">0</td>
            <td>127</td>
            <td rowSpan={2} className="v5a25-v85b">5</td>
            <td>339</td>
            <td rowSpan={2} className="v5a25-v85b">8</td>
            <td>189</td>
            <td rowSpan={2} className="v5a25-v85b">9</td>
            <td>568</td>
          </tr>
          <tr>
            <td>05</td>
            <td>50</td>
            <td>89</td>
            <td>98</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">गुरु</td>
            <td rowSpan={2} className="v5a25-v85b">2</td>
            <td>246</td>
            <td rowSpan={2} className="v5a25-v85b">5</td>
            <td>168</td>
            <td rowSpan={2} className="v5a25-v85b">6</td>
            <td>222</td>
            <td rowSpan={2} className="v5a25-v85b">7</td>
            <td>557</td>
          </tr>
          <tr>
            <td>25</td>
            <td>52</td>
            <td>67</td>
            <td>76</td>
          </tr>
          <tr>
            <td rowSpan={2} className="v5a25-v4a5">शुक्र</td>
            <td rowSpan={2} className="v5a25-v85b">1</td>
            <td>560</td>
            <td rowSpan={2} className="v5a25-v85b">6</td>
            <td>259</td>
            <td rowSpan={2} className="v5a25-v85b">8</td>
            <td>260</td>
            <td rowSpan={2} className="v5a25-v85b">9</td>
            <td>568</td>
          </tr>
          <tr>
            <td>16</td>
            <td>61</td>
            <td>89</td>
            <td>98</td>
          </tr>
        </tbody>
      </table>

      {/* Station links sections */}
      <div className="sta-div sta-1">
        <h6>SATTA MATKA JODI CHART</h6>
        <a href="https://dpboss.boston/jodi-chart-record/time-bazar.php">Time Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/sridevi.php">Sridevi Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/kalyan-morning.php">Kalyan Morning Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/madhuri.php">Madhuri Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/kalyan.php">Kalyan Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/sridevi-night.php">Sridevi Night Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/kalyan-night.php">Kalyan Night Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/old-main-mumbai.php">Old Main Mumbai Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/main-bazar.php">Main Bazar Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/milan-morning.php">Milan Morning Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/milan-day.php">Milan Day Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/milan-night.php">Milan Night Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/madhuri-night.php">Madhuri Night Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/madhur-morning.php">Madhur Morning Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/madhur-day.php">Madhur Day Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/madhur-night.php">Madhur Night Chart</a>
        <a href="https://dpboss.boston/jodi-chart-record/rajdhani-night.php">Rajdhani Night Chart</a>
      </div>

      <div className="sta-div sta-1">
        <h6>MATKA PANEL CHART</h6>
        <a href="https://dpboss.boston/panel-chart-record/time-bazar.php">Time Panel Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/sridevi.php">Sridevi Panel Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/kalyan-morning.php">Kalyan Morning Panel Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/madhuri.php">Madhuri Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/padmavathi.php">Padmavathi Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/kalyan.php">Kalyan Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/sridevi-night.php">Sridevi Night Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/kalyan-night.php">Kalyan Night Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/old-main-mumbai.php">Old Main Mumbai Panel Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/main-bazar.php">Main Bazar Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/milan-morning.php">Milan Morning Panel Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/milan-day.php">Milan Day Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/milan-night.php">Milan Night Penal Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/madhuri-night.php">Madhuri Night Panel Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/rajdhani-night.php">Rajdhani Night Panel Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/madhur-morning.php">Madhur Morning Day Chart</a>
        <a href="https://dpboss.boston/panel-chart-record/madhur-day.php">Madhur Day Panel Chart</a>
      </div>

      {/* Long Q&A sections - abbreviated for space, but include all the HTML Q&A content */}
      <div className="qtn14" style={{ maxHeight: '240px', overflow: 'auto' }}>
        <h6>Introduction to DPBoss Service</h6>
        <p>
          Welcome to DPBoss, where entertainment takes center stage, and a world of diverse activities awaits you. In our vibrant community, we've crafted an experience beyond conventional platforms, offering a rich tapestry of entertainment for users with varied interests.
          <br /><br />
          Discover the joy of connecting with like-minded individuals through our socializing features. Whether you're an extrovert seeking lively conversations or an introvert looking for a cozy virtual space, DPBoss is your go-to destination for meaningful connections.
          <br /><br />
          DPBOSS.Service is your ultimate destination for everything related to the fascinating world of the Satta Matka. As the DPBOSS is a leading authority in the realm of Matka Games, this is your Go-To Platform for any reliable information along with accurate Matka Results and expert guidance obviously. Whether you are a pro or a newcomer player the comprehensive collection of resources such as Kalyan Matka, Matka Result, and Mumbai Matka, will provide you with the thrilling and immersive experience. Join us along and we will embark on this captivating adventure, where every matka number, matka chart, and matka games hold the potential to unlock fortunes.
        </p>
<div className="q-crd a25hc">
          <label htmlFor="qtn141">
            <span>HISTORY OF SATTA MATKA</span>
          </label>
          <div className="g5v2a">
            <p>
              The history of Satta Matka dates to the 1960s when it originated as a form of gambling in Mumbai, India. Initially, it involved betting on the opening and closing rates of cotton in the Bombay cotton exchange. The practice of placing bets on the fluctuating cotton rates attracted a significant number of people looking to try their luck.<br />

              As the popularity of this form of gambling grew, it expanded beyond the cotton exchange. The game underwent several modifications and evolved into a numbers-based betting system. Players began betting on random numbers ranging from 0 to 9, which were drawn from a Matka (earthen pot).<br />
              Along with time various Matka Markets came out known as Kalyan Matka, Mumbai Matka, Rajdhani Matka, Night Milan Matka, And Main Mumbai Matka, among others. Every market has their own set of rules and draws which provides player with different opportunities in the game.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn142">
            <span>TYPES OF SATTA MATKA</span>
          </label>
          <div className="g5v2a">
            <p>
              Kalyan Matka: Kalyan Matka is one of the most popular variants of Satta Matak which focuses on betting that are based on opening and closing of cotton in the Bombay Cotton Exchange. They have their own rules of draws for the declaration of winning outcome. <br />

              Mumbai Matka: Mumbai Matka is the format of satta matka associated with Mumbai. The game includes various draw which helps player to place bet on different number and combinations. <br />

              Rajdhani Matka: It is another type of Matka which involves betting on number based which is upon the opening and closing rates of the cotton in the Rajdhani Cotton Exchange. <br />

              Night Milan Matka: It is another variant of Satta Matka which is played at the evening or the night hours which offers exciting benefits to player looking to try their luck after the sunset. <br />

              Main Mumbai Matka: It is officially focused on Mumbai with their own sets of rules, draws and betting options for the people interested in the Main Mumbai Market. <br />

              Gali Deshawar Matka: Gali Deshawar Matka is a specific variant of Satta Matka popular in certain regions of India. It involves betting on numbers and predicting the outcome based on the draw.<br />

              Milan Day Matka: Milan Day Matka is a daytime variant of Satta Matka, providing players with betting opportunities during the day, with its own set of rules and draws separate from the night games.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn143">
            <span>THE BASICS OF MATKA:</span>
          </label>
          <div className="g5v2a">
            <p>
              Matka game officially originated in India 1960s. It is a very popular lottery style which involves betting on number and combination and if the result drawn matched your combination the layer can win potential amount. The term "Satta" refers to "betting" in Hindi, while "Matka" means "Earthen Pot" in hindi, traditionally used to draw random numbers.<br />

              Game Format: The Satta Matka games are mainly played on the days when market are closed such as weekends or public holidays. It generally includes playing bets on set of numbers from 0 to 9 and the result is drawn randomly. <br />

              Betting Process: Players need to place bet on the comniation of number on the opening and closi times of the Satta Market. Bets placed are on different types of market and options which includes single Jodi (pair), patti (three-digit number), and more.<br />

              Matka Draw: The Matka Draw involves drawing any of the three numbers from 0 to 9 from the deck of cards. The numbers are made drawn twice so that it creates a two digit number such as number drawn are 5 and 3 then the result is 53. This process is repeated to obtain the second set of numbers.<br />

              Result Declaration: The Winning numbers are declared based on the different combination of two set numbers. As an example, as the first set is 53 whereas the second to be 46 then the result will be 53 x 46. Although mostly the result if od 2-digit number and of that the last digit is taken into consideration as the last digit is 6 the winning number is declared 6. <br />

              Payouts: Payouts in Satta Matka also varies depending on the various types of bets placed and the amount it includes. As different market has their own different payout ratios and if the player wins, they receive the predetermined amount multiplies by their betting amount.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn144">
            <span>DIFFERENT VARIANTS OF MATKA GAMES</span>
          </label>
          <div className="g5v2a">
            <p>
              There are several variants of Matka Games that have emerged over time. Here are some of the popular ones:<br />

              Single: in this format the player needs to bet on the single digit from 0 to 9 and if there chosen number draws out, they win. <br />

              Jodi: In Jodi player need to choose two numbers so that they can form pair of number they need to choose from 00 to 99 and if there selected number is drawn out, they win. <br />

              Patti: Patti is a three-digit number variant where players bet on all three digits of the result. There are different types of patti bets, including single patti, double patti, and triple patti.<br />

              Half Sangam: Half Sangam is a kind of combination bet which includes one number chosen in front the list of numbers and pairs along with he other number from the second set. <br />

              Full Sangam: The Full sangam is just like the half sangam as player select two numbers from both set and if it is drawn, they win. <br />
              Cycle Patti: Cycle Patti is a variation where players bet on a set of three numbers in a specific order. If their selected cycle matches the result, they win.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn145">
            <span>WHAT IS KALYAN MATKA AND ITS WINNING STRATEGY</span>
          </label>
          <div className="g5v2a">
            <p>
              Kalyan Matka is a popular form of gambling that originated in India, focusing on the opening, and closing rates of cotton traded on the Bombay Cotton Exchange. Over time, it has evolved into a game where players bet on numbers and combinations, like other Matka Games. Here are some tips for playing Kalyan Matka:

              1. Understand the game rules and different types of bets.<br />
              2. Analyze past results for patterns, but remember that outcomes are based on chance.<br />
              3. Set a budget and stick to it.<br />
              4. Diversify your bets to minimize risks.<br />
              5. Bet with reasonable amounts and avoid chasing losses.<br />
              6. Control your emotions and make rational decisions.<br />
              7. Stay updated with the latest information and market trends.
              <br />
            </p>
          </div>
        </div>
      </div>

      {/* Long content sections */}
      <div className="be-stone">
        <div className="c-stone" style={{ marginTop: 0, borderTop: 0 }}>
          DPBoss Boston – Trusted Source for Satta Matka, Kalyan Matka & Results
        </div>
        <p>
          Satta Matka is not just a game. It's a daily habit for many. DPBoss helps users with fast, accurate results and easy guides. From Kalyan Matka to Milan, Rajdhani, and Mumbai Matka – DPBoss provides all charts, satta matta matka results, and guessing tools in one place.
        </p>

        <div className="c-stone">WHAT IS SATTA MATKA?</div>
        <p>
          Satta Matka is a popular number-based game in India. It started in the 1960s and is still played widely. The main goal is to guess numbers that win in different markets like Kalyan Matka, Rajdhani Day, and Milan Matka. The name Matka came from how numbers were once drawn from a pot. Today, results are digital, but the game rules remain simple.
        </p>

        <div className="c-stone">HOW DPBOSS HELPS MATKA PLAYERS?</div>
        <p>
          DPBoss gives users the Satta Matka result fast. It includes Kalyan Satta Matka result, Milan Day, and Satta Matka Open numbers. You also get DPBoss guessing, DPBoss 143 guessing, and Boss Matka predictions. These help you play smart, not just lucky.
        </p>

        <div className="c-stone">DAILY MATKA RESULTS WITH TIMINGS</div>
        <p>
          Daily Satta Matka results are posted for Kalyan Open, Kalyan Close, Rajdhani, Milan, and other games. Each day, users can check:
          <br />kalyan result<br />matka result<br />satta matka open<br />कल्याण रिजल्ट<br />milan kalyan matka<br />kalyan chart
        </p>

        <div className="c-stone">MATKA BAZAR & GAME TYPES</div>
        <p>
          DPBoss covers the full Matka Bazar. This includes Satka Matka, Worli Matka, Milan Matka, and Mumbai Matka. Whether it's Satt Matka Satta or Satta 143, DPBoss tracks all records and charts with exact data.
        </p>

        <div className="c-stone">WHY USE DPBOSS FOR SATTA MATKA?</div>
        <p>
          DPBoss Boston offers easy design and daily updated data. Users trust DPBoss for Matka Satta, Kalyan Matka number, and DPBoss result charts. Also, all Satta Matka results come from tested sources. We don't use fake tips or wrong data.
        </p>

        <div className="c-stone">KALYAN SATTA MATKA: THE HEART OF SATTA</div>
        <p>
          Kalyan Matka is the most followed Matka game. It opens and closes daily. Thousands search Kalyan Satta Matka result daily. Kalyan Matka games include classic and modern play. Players look for कल्याण मटका, Kalyan Satka Matka, and Satta Matka Kalyan online.
        </p>

        <div className="c-stone">DP BOSS RESULT TIMINGS AND CHARTS</div>
        <p>
          All results like DPBoss result and DP Boss result are posted on fixed time. Users can check Kalyaan Open, Satta M, and Sattka Mattka com updates here.
          <br />Charts include:<br />satta matka chart<br />kalyan chart<br />matka chart<br />sattamatka.com chart
        </p>

        <div className="c-stone">LANGUAGES AND COMMUNITY SUPPORT</div>
        <p>
          Our platform supports many languages like हिंदी (सट्टा मटका), ગુજરાતી (સટકા મટકા), and ಕನ್ನಡ (ಸತ್ತ ಮಟ್ಕಾ). This helps all players enjoy Satta Matka in their local terms.
        </p>

        <div className="c-stone">PEOPLE ALSO SEARCH:</div>
        <p>सत्ता मटका, सट्टा मटका कल्याण, सट्टा मट्टा, सट्टा मटका रिजल्ट, सट्का मटका कल्याण</p>

        {/* Continue with all the other c-stone sections from the HTML - abbreviated for space */}
        <div className="c-stone">SATTA MATKA SITES VS. DPBOSS</div>
        <p>
          Unlike fake sites, DPBoss shares true Kalyan Matka result and Satta Batta data. Many others show false guesses. We post DPBoss Matka, DPBoss DPBoss double entries, and clear Satta Matka Open numbers. You won't see delays here.
        </p>

        <div className="c-stone">DPBOSS GUESSING & TIPS</div>
        <p>
          Guessing helps in Matka. But only skilled guessing works. Our DPBoss guessing tips are based on trends, not luck. Daily updates include Satta Matta Matka 143 results and Boss Matka records. You can use these for playing smart.
        </p>

        <div className="c-stone">PLAYING SAFE AND SMART</div>
        <p>
          We advise users to play safe. Never invest all money in one number. Use Satta.Matka results, Sattamatka.com tips, and Matka Satka records for safe moves. Also, don't trust sites that claim "fixed numbers." There's no guarantee.
        </p>

        {/* ... Continue with all remaining c-stone sections from the HTML content ... */}
      </div>

      {/* Second be-stone section */}
      <div className="be-stone" style={{ maxHeight: '240px', overflow: 'auto' }}>
        <div className="c-stone" style={{ marginTop: 0, borderTop: 0 }}>
          WHAT IS MUMBAI MATKA?
        </div>
        <p>
          The variant of the Matka gambling game which originated in Mumbai, India is known as Mumbai Matka. The game is specifically associated with the city of Mumbai and hence is known as the Mumbai Matka. As other Matka games Mumbai Matka also revolves around the number and combinations.
        </p>

        <div className="c-stone">WHAT IS RAJDHANI MATKA?</div>
        <p>
          Rajdhani Matka is a very popular matka game and variant of Matka gambling in India. The game involves betting on number and combinations in Rajdhani market as player places the bets on various options such as single number or pair or even the three-digit number before the result gets declared. The games revolve on the similar format of other Matka games where two sets of number are drawn at a random. Even if you want to know how the result is declared so the winning number are determined based on the combination of two sets as the last digit of their products is determined as the winning number. Also, while playing the game, it is that you follow the local laws and regulations while participating in the Rajdhani Matka or any other Format of games.
        </p>

        <div className="c-stone">WHAT IS SATTA CHART ANALYSIS?</div>
        <p>
          The Satta Chart Analysis is the study of historical Satta Matka to identify the patterns along with trends and number of frequencies. By using this it helps in making decisions when you select a number or the combination for future bets. Although it is very to remember that the outcomes are totally based on chances and analysis does not guarantee any accurate predictions. Also, you need to make sure you gamble responsibility within legal boundaries
        </p>

        <div className="c-stone">WHAT IS MATKA OPEN AND MATKA CLOSE?</div>
        <p>
          "Matka Open" is the first set of numbers that are announced or declared at the beginning of a specific Matka game. It represents the opening result or the initial set of winning numbers. "Matka Close" is the second set of numbers that are announced or declared at the end of the Matka game. It represents the closing result or the final set of winning numbers. The time interval between the Matka Open and Matka Close varies depending on the specific Matka game being played. It can range from a few minutes to several hours, depending on the rules and regulations of the Matka market or game. Players place their bets on different numbers or combinations before the Matka Open, and the winning numbers are determined by the Matka Close
        </p>

        <div className="c-stone">MATKA JODI ON dpboss.gold: COMBINING NUMBERS FOR WINNING BETS</div>
        <p>
          Matka Jodi is a term which is often used in Matka gambling to refer a combination of two mars that the player selected for their bets. The Jodi officially refers to the number which are combined to form single outcome. Below are few of the key points about the Matka Jodi: <br />

          Number Combination: Players need to choose a number from 0 to 9 and combine them to create any pair as for example if they select 3 and 7 the Jodi would be 37.<br />

          Betting Process: Players have full right to place bet on different Jodi available in the Matka game. They can select the Jodi bases on previous games and strategies and its analysis. <br />

          Result Declaration: If talking about the result declaration then the Jodi is compared to the winning numbers and if the Jodi outcome matches the player who placed the bet wins the potential amount. As for example if the winning number is declared as 3 and 7 and the Jodi combination was 37 then it would be the winning combination. <br />

          Payouts: The payouts totally depend on the specific Matka Market and their associated odds with chosen Jodi. As different Jodi combinations may have various payout rates.
        </p>

        <div className="c-stone">BOMBAY SATTA GUESSING AND TIPS</div>
        <p>
          Bombay Satta which is also known as the Mumbai Satta or Mumbai Matka refers to various and historical Matka gambling scenes in Mumbai city. The Matka game was originally originated in 1960s and was centred around the cotton exchange market of the Mumbai which later became a very popular form of gambling. <br />

          In Bombay Satta players need to place bets on various combination of numbers which can range from single digit to three-digit numbers. And if you predict the right number, you can win a potential winning at the time of result declaration. These numbers are then declared as the "open" and "close" for the day.<br />

          Mumbai has been a great hub for Matka gambling since a long time now and has various Matka markets operating in different area of the city. Some of the most known matka market are Kalyan Matka, Worli Matka. Milan Day and Rajdhani Night. And it is to know that every Market has their own sets of rules and timing for the declaration of results.
        </p>
      </div>

      {/* Third Q&A section */}
      <div className="qtn14" style={{ maxHeight: '240px', overflow: 'auto' }}>
        <div className="q-crd a25hc">
          <label htmlFor="qtn141">
            <span>WHAT IS SATTA MATKA?</span>
          </label>
          <div className="g5v2a">
            <p>
              Satta Matka originated in India and is one of the popular forms of Lottery and gambling games. The game involves placing bets on different numbers and earning potential winning on the outcome.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn142">
            <span>WHO IS DPBOSS</span>
          </label>
          <div className="g5v2a">
            <p>
              DPBOSS is known for providing the best tips and guidance to players along with expert advice so that they can easily make informed decisions on placing bets on the numbers in their Matka Games.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn143">
            <span>HOW DOES MATKA WORK?</span>
          </label>
          <div className="g5v2a">
            <p>
              In Matka, players need to choose a specific set of numbers from any predefined range and place bets on these numbers so that while any random number drawn if the number is the same the player chooses, they win.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn144">
            <span>WHAT IS KALYAN MATKA?</span>
          </label>
          <div className="g5v2a">
            <p>
              Kalyan Matka is totally a variant of Satta Matka which mainly focuses on games based on opening and closing rates of cotton in the Bombay Cotton Exchange.
            </p>
          </div>
        </div>

        <div className="q-crd">
          <label htmlFor="qtn145">
            <span>HOW CAN I CHECK THE MATKA RESULT?</span>
          </label>
          <div className="g5v2a">
            <p>
              Matka results can be checked through various online platforms or websites that are totally dedicated to Satta Matka games. Various formats of Matka gaming results are declared on these platforms for ease.
            </p>
          </div>
        </div>

        {/* Continue with all remaining Q&A items from the HTML... */}
        <div className="q-crd">
          <label htmlFor="qtn145">
            <span>WHAT IS MATKA CHART?</span>
          </label>
          <div className="g5v2a">
            <p>
              The Matka Chart refers to the graphical representation of any previous result and trends which in Matka Game helps players analyze the patterns of drawing and make predictions for their future games.
            </p>
          </div>
        </div>

        {/* Add all remaining Q&A sections following the same pattern... */}
      </div>

      {/* Final sections */}
      <div className="lst-sec">
        <h6>MATKA</h6>
        <p>
          Madhur Matka | Satta Bazar | Satta Kurla | Satta Com | Satta Batta | Org Mobi Net In | Satta Master | Matka Game | Kapil Indian Matka | Matka Parivar 24 | Prabhat Matka | Tara Matka | Golden Matka | SattaMatka.Com | Madhur Matka satta result chart, satta khabar, matka India net, satakmatak, satta chart 2019, satta bazar result, satta live, satta bazar, satta matka Mumbai chart, satta live result, satta fast result, satta fast, satta today Number 10, Satta Matka
        </p>
      </div>

      <div className="lst-sec">
        <h3 style={{ fontSize: '14px', color: '#bb2833' }}>
          dp boss net, dp satta, dpboss dpboss, indian satta matka, kalyan matkà result today , matka boss, matka result live, matka satta result today, satamatka com, satta boss, satta matka king, sattamatkà, sattamatkà result, sattamatta com, sattmatka sattmatka, star matka, tara matka, tara satta matka, worli matka, indian matka, matka live, kalyan guessing, satta fix, kalyan final ank, dp matka, dpboss net, sata mata com, सट्टा मटका, sattamatkà 143, golden matka, satta matta matka 143, satta fast, kalyan open, satta 143, dpboss 143 guessing, dpboss satta, golden satta matka, satta bajar
        </h3>
      </div>

      <div className="dis12">
        <h6>-:DISCLAIMER:-</h6>
        <p>
          Visiting this site and browsing it is strictly recommended at your own risk. Every information available here is only according to informational purpose and based on astrology and number calculations. We are no associated or affiliated with any illegal Matka business. We make sure we follow all rules and regulations of the regions where you are accessing the website. There are also chances that the website may be banned in your area and after that if you are using it, you are solely dependable and responsible for any damage, loss or legal action taken.
          <br />
          If you are the one who does not like our disclaimer it is advised that you leave our website immediately. Copying of any information/contents posted on the website is strictly prohibited and against the law.
        </p>
      </div>

      <h6 className="pow-13">POWERD BY dpboss.gold</h6>

      <div className="lst-sec">
        <p>
          &copy; 2011 - 2025 dpboss.gold <br />
          <a href="https://dpboss.boston/about.php">About us</a> | <a href="https://dpboss.boston/contact.php">Contact us</a> <br />
          <a href="https://dpboss.boston/privacy.php">Privacy &amp; policy</a> | <a href="https://dpboss.boston/tos.php">Term And Conditions</a>
        </p>
      </div>

      {/* Floating rotating link (client) */}
      <RotatingLink
        id="rotatingText"
        className="mp-clk1"
        href="https://dpboss.boston/dpboss-result-api.php"
        phrases={['Result Api', 'New Plan', '10X Faster']}
        intervalMs={1000}
        style={{
          position: 'fixed',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      />

      {/* Sticky bottom refresh that preserves scroll position (client) */}
      <BottomRefreshButton className="clk1-rld btm-clk1-f">REFRESH</BottomRefreshButton>

      {/* Restore scroll after reload (client) */}
      <ScrollRestorer />
    </>
  );
}
