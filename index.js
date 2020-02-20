const cookie = {
    name: 'agencies',
    value: 'EMS1110',
    domain: 'web.pulsepoint.org',
    url: 'https://web.pulsepoint.org/',
    path: '/',
    httpOnly: false,
    samesite: 'Unset'
  }
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  await page.setCookie(cookie)
  
  await page.goto('https://web.pulsepoint.org/').then(() => page.waitForNavigation({waitUntil: 'load'}));
  //try{
        // await page.waitForNavigation({
            // waitUntil: 'networkidle2',
            // timeout: 0
        // });
        // // let pagecontains;
        // // while(pagecontains){

        // // }
        // await page.screenshot({ path: 'screenshots/github.png' });
    // } catch(err) {
        // console.log(err);
    // }
  
  //dom selector
  const INCIDENT_TITLE_SELECTOR = '#active_incidents_content > div > dl > dd:nth-child(1) > div > div.pp_incident_item_description > h2'
//   setTimeout(function(){
      let inner = await page.evaluate((sel) => {
        let html = document.querySelector(sel).innerHTML;
        return html;
      }, INCIDENT_TITLE_SELECTOR);
    // },5000);

  console.log("The incident is: " + inner);
//   console.log(document.getElementsByClassName(sel));

  browser.close();
}

run();