const PROD = process.env.PORT

const CONST = {
    DB: !PROD ? 'localhost:27017' : 'heroku_x9fslwmg:c1ms58a6amtodtg3icr5a10dlr@ds117859.mlab.com:17859/heroku_x9fslwmg'
}

console.log('process.env.PORT')
module.exports = { CONST }



