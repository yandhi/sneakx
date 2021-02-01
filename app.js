const StockXAPI = require('stockx-api');
const stockx = new StockXAPI({
    currency: 'USD',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
});

const readline = require('readline');
const { Console } = require('console');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async() => {
    try {
        console.log('Logging in...');

        await stockx.login({
            user:'',
            password:''
        }).then(() => console.log('Established login to StockX API.'))

        rl.question('What shoe are you looking for?', (shoe) => {
            (async() => {
            const products = await stockx.newSearchProducts(shoe, {
                limit: 5
            });            
        
            for(product in products) {
                console.log(product);
            }            
        })
        rl.close();
        });

    } catch(e) {
        console.log(e);
    }
})();