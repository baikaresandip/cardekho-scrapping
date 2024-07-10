const axios = require('axios');
const cheerio = require('cheerio');

const getStationsData = async () => {
	try {
        const stations = [];
            const url = 'https://www.cardekho.com/electric-charging-station/pune'
            const { data } = await axios.get( url );
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
            });
            return cityData
	} catch (error) {
		throw error;
	}
};

getStationsData()
    .then((cityData) => console.log(cityData));
