const express = require('express');
const cheerio = require('cheerio');
const got = require('got');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors())

const salaryURL = "https://questionnaire-148920.appspot.com/swe/data.html";

function filterSalaries(idx, elem) {
    if(!elem.children[0]){
        return false;
    }
    if (Number.isNaN(elem.children[0].data.replace(/[^0-9.-]+/g, ""))){
        return false
    }
    return true
}

async function getQualifyingOffer() {
    return await got(salaryURL).then(res => {
        const $ = cheerio.load(res.body);
        const salaries = []
        $('.player-salary').filter(filterSalaries).each((i, elem) => salaries[i] = Number(elem.children[0].data.replace(/[^0-9.-]+/g, "")))
        return (salaries.sort((a, b) => b-a).slice(0,125).reduce((acc, cur) => acc + cur, 0) / 125).toFixed(2)
    })
}

app.get('/', async (req, res) => {
    let qualifyingOffer = await getQualifyingOffer()
    res.json({qualifyingOffer});
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});