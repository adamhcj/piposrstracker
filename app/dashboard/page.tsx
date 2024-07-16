'use client';

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { useState, useEffect } from 'react';
// const PublicGoogleSheetsParser = require('public-google-sheets-parser')
import PublicGoogleSheetsParser from 'public-google-sheets-parser'


 
export default function Page() {
    const [revenue, setRevenue] = useState([{'month': 'mianbaoroll', 'revenue': 0}, {'month': 'rubiak', 'revenue': 100000000}, {'month': 'alpoopi', 'revenue': 300000000}, {'month': 'onyo', 'revenue': 1000000000}]);
    // iterate through revenue and divide by 1000000

    


    useEffect(() => {
        let copyRevenue = JSON.parse(JSON.stringify(revenue));
        for (let i = 0; i < copyRevenue.length; i++) {
            copyRevenue[i].revenue = copyRevenue[i].revenue / 1000000;
        }
    
        setRevenue(copyRevenue);

        const spreadsheetId = '1iyWbBbgCT79S1RTP8hWGQPrcqsTn7XSEIioP7MiSC80'
        const parser = new PublicGoogleSheetsParser(spreadsheetId)

        parser.setOption({ sheetName: 'Drops' })

        parser.parse().then(data => {
            console.log(data)
            let new_revenue = {};
            // {
            //     "timestamp": 1721116755.4696517,
            //     "name": "Laksa",
            //     "item": "135 x Onyx bolt tips",
            //     "value": "1,156,545"
            // }
            
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let player = item['name'];
                let value = item['value'];
                if (value == "?") {
                    continue;
                }

                value = value.replaceAll(',', '');
                value = parseInt(value);
                if (new_revenue[player]) {
                    new_revenue[player] += value;
                } else {
                    new_revenue[player] = value;
                }
            }

            // iterate through new_revenue and divide by 1000000
            for (let key in new_revenue) {
                new_revenue[key] = new_revenue[key] / 1000000;
            }

            const updated_revenue = Object.keys(new_revenue).map((key) => {
                return {'month': key, 'revenue': new_revenue[key]};
            });

            // sort updated_revenue by revenue
            updated_revenue.sort((a, b) => (a.revenue < b.revenue) ? 1 : -1);

            setRevenue(updated_revenue);
        })

        




    }, []);


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div>
        <RevenueChart revenue={revenue}  />
      </div>
    </main>
  );
}