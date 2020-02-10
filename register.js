const puppeteer = require('puppeteer');
const argv = require('yargs').argv;

async function register(email, password, day) {
  // Why launch a headless browser when you can impress everyone
  // around you by looking like a l33t hacker?
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const viewport = {width: 1480, height: 1480};
  page.setViewport(viewport);

  // Login flow
  await page.goto('https://apm.activecommunities.com/seattleymca/ActiveNet_Login?function=onlinequickfacilityreserve&aui_color_theme=theme_black&enable_reskin=&function_text=To%20Online%20Quick%20Reservation&sessionId=1gxzmwatftiitzqdno6auac82&ga_ga_account=UA-1247608-1&global_multi_fund_enabled=&ams_order_descriptor=YMCA%20of%20Greater%20Seattle&server_host_address=prod-activenet-75w.an.active.tan&rno=2&ga_google_tag_manager=True&js_ams_order_descriptor=YMCA%20of%20Greater%20Seattle&FOR_CUI=True&sdireqauth=1581211758694&js_calendars_label=Calendars&ga_ga_container=GTM-PWTBMFK&CUI_CONSUMER=true&calendars_label=Calendars');
  await page.evaluate((email, password) => {
    document.querySelector('#ctl05_ctlLoginLayout_txtUserName').value = email;
    document.querySelector('#ctl05_ctlLoginLayout_txtPassword').value = password;
  }, email, password);
  await page.click('#ctl05_ctlLoginLayout_btnLogin');
  await page.waitForNavigation();

  // Select date before facility to avoid autoloading results
  await page.select('#begd', `${day}`);

  // Select facility
  await page.select('#facilitygroup_id', '1');

  // Select 5PM and 5:30PM times, hardcoded because they're the best times
  // and who really needs anything else?
  await page.waitForSelector('input[name$="25"]');
  await page.$eval('input[name$="25"]', check => check.checked = true);
  await page.$eval('input[name$="26"]', check => check.checked = true);

  // Reserve!
  await page.waitForSelector('input[title="Reserve Now"]');
  await page.click('input[title="Reserve Now"]');
  await page.waitForNavigation();

  await browser.close();
}

async function run() {
  if (!argv.email || !argv.password || !argv.day) {
    console.log('-----------------');
    console.log('Usage: node ./register.js --email=<email> --password=<password> --day=<day of the month>');
    console.log('-----------------');
    console.log('For example:');
    console.log('$ node ./register.js --email=coolio@example.com --password=123456luggage --day=12');
  } else {
    await register(argv.email, argv.password, argv.day);
  }
}

run();
