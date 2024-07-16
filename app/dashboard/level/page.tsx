'use client';


import { lusitana } from '@/app/ui/fonts';
import { useState, useEffect } from 'react';
import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import StickyHeadTable from './StickyHeadTable';




 
export default function Page() {
    // iterate through revenue and divide by 1000000

    const [originalLevels, setOriginalLevels] = useState([{'timestamp': 1721112409.6779885, 'playername': 'Platelet', 'skill': 'Magic', 'level': '91'}]);
  //   {
  //     "timestamp": 1721112409.6779885,
  //     "playername": "Platelet",
  //     "skill": "Magic",
  //     "level": "91"
  // }
    


    useEffect(() => {

        const spreadsheetId = '1iyWbBbgCT79S1RTP8hWGQPrcqsTn7XSEIioP7MiSC80'
        const parser = new PublicGoogleSheetsParser(spreadsheetId)

        parser.setOption({ sheetName: 'Levels' })

        parser.parse().then(data => {
            console.log(data)
            setOriginalLevels(data);
        })

        




    }, []);


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Levels
      </h1>

      <div>
        <StickyHeadTable data={originalLevels} />
      </div>
    </main>
  );
}