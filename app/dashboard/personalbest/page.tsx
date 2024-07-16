'use client';


import { lusitana } from '@/app/ui/fonts';
import { useState, useEffect } from 'react';
import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import StickyHeadTable from './StickyHeadTable';




 
export default function Page() {

    const [originalPb, setOriginalPb] = useState([{'timestamp': 1721122163.1246238, 'playername': 'God said', 'pb': '20:32', 'content': 'Chambers of Xeric (Team Size: 4 players)'}]);

    


    useEffect(() => {


        const spreadsheetId = '1iyWbBbgCT79S1RTP8hWGQPrcqsTn7XSEIioP7MiSC80'
        const parser = new PublicGoogleSheetsParser(spreadsheetId)

        parser.setOption({ sheetName: 'Pbs' })

        parser.parse().then(data => {
            console.log(data)
            setOriginalPb(data);
        })

        




    }, []);


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Personal Bests
      </h1>

      <div>
        <StickyHeadTable data={originalPb} />
      </div>
    </main>
  );
}