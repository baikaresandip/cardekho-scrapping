const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const getStationsData = async () => {
	try {
        const stations = [];
        
        [
            'pune', 
            'mumbai', 
            'hydrabad',
            'patana',
            'new-delhi',
            'ahmedabad',
            'chennai',
            'gurgaon',
            'chandigarh',
            'nagpur',
            'nashik',
            
        ].map( async (city, index) => {
            const url = 'https://www.cardekho.com/electric-charging-station/' + city
            console.log(url)
            const { data } = await axios.get(
                url
                );
            // return  false 
            const $ = cheerio.load(data);            
            const cityData = []
            $('.gridRow > div').each((_idx, el) => {
                const stationTitle = $(el).find('h3').text()
                const address = $(el).find('.cd_contacts .cd_address:eq(0) > span').text()
                const Contact = $(el).find('.cd_contacts .cd_address:eq(1) > span').text()
                const chargingSlots = $(el).find('.cd_contacts .cd_address:eq(2) > span').text()
                const chargingPortType = $(el).find('.cd_contacts .cd_address:eq(3) > span').text()
                const location = $(el).find('a').attr('href')
                
                cityData.push({
                    name: stationTitle,
                    address: address,
                    Contact: Contact,
                    chargingSlots: chargingSlots,
                    chargingPortType: chargingPortType,
                    location: location,
                })
                console.log("🚀 ~ file: index.js:19 ~ $ ~ stationTitle:", cityData)
            });
            stations.push( { 'city': city, 'data' : JSON.stringify(cityData) } )
            //write into the fiile
            fs.writeFile( __dirname + '/data/'+ city +'.json', JSON.stringify(cityData), 'utf8', function(err) {
                if (err) throw err;
                console.log('Written into file completed!');
                }
            );
        })
        
    
		return stations;
	} catch (error) {
		throw error;
	}
};

getStationsData()
    .then((stations) => console.log(stations));
