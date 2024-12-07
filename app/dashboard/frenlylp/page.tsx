'use client';


import { lusitana } from '@/app/ui/fonts';
import { useState, useEffect } from 'react';
import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import { LineChart } from '@mui/x-charts/LineChart';





 
export default function Page() {
    // iterate through revenue and divide by 1000000

    // [
    //   {
    //       "timestamp": 1732939809.5828943,
    //       "player_name": "piplupowo,kamo udon,tonkatzu,mianbaoroll,alpoopi",
    //       "score": "16370,4630,3180,3390,8710"
    //   }
    // ]

    function createDateFromTimestamp(timestamp: number) {
      // Create a new JavaScript Date object based on epoch timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      return new Date(timestamp * 1000);
    }

    let dataset = [
      {
        date: new Date(1732939809.5828943),
      }
    ]

    const [data, setData] = useState([{'timestamp': 1732939809.5828943, 'player_name': 'piplupowo,kamo udon,tonkatzu,mianbaoroll,alpoopi', 'score': '16370,4630,3180,3390,8710'}]);
    
    // convert data to dataset
    dataset = [];
    const player_name = data[data.length-1].player_name;
    const player_names = player_name.split(',');
    for (let i = 0; i < data.length; i++) {
      const date = data[i].timestamp;
      
      const score = data[i].score;
      
      const scores = score.split(',');
      let obj = {date: new Date(date * 1000)};
      for (let j = 0; j < player_names.length; j++) {
        try {
          obj[player_names[j]] = parseInt(scores[j]);
        }
        catch (e) {
          obj[player_names[j]] = 0;
        }
        
      }
      dataset.push(obj);
    }

    useEffect(() => {

        const spreadsheetId = '1iyWbBbgCT79S1RTP8hWGQPrcqsTn7XSEIioP7MiSC80'
        const parser = new PublicGoogleSheetsParser(spreadsheetId)

        parser.setOption({ sheetName: 'LScores' })

        parser.parse().then(data => {
            console.log(data)
            setData(data);
        })

        




    }, []);


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        frenly lp competition
      </h1>

      <div>
        <LineChart
          dataset={dataset}
          xAxis={[
            {
              id: 'Hour',
              dataKey: 'date',
              scaleType: 'time',
            },
          ]}
          series={
            data[data.length-1].player_name.split(',').map((player_name) => {
              return {
                id: player_name,
                dataKey: player_name,
                label: player_name,
              };
            })
          }
          width={600}
          height={400}
          margin={{ left: 70 }}
          tooltip={{ trigger: 'item' }}
        />
      </div>
    </main>
  );
}