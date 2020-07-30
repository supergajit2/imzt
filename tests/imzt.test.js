const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require( '../lib/config')
const login = require('../pages/login')
const functions = require('../lib/functions')
const sideNav = require('../pages/side-nav')
const mtcReport = require('../pages/mtcReport')

let browser
let page

jest.setTimeout(200000);

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: config.headless,
        slowMo: config.slowMo,
        devtools: config.devTools,
        timeout: config.launchTimeout,
        defaultViewport: null,
        args: ['--start-maximized'] 
    })
    page = await browser.newPage()
   
    
})


describe ('generic login', () => {   
// login on the standard church login site and go to the admin homepage
    it('page displays', async () => {
        await page.goto(config.testUrl)
        await page.waitForSelector(login.USERNAME)

        const url = await page.url()
        const title = await page.title()

        expect(url).to.contain("login")
        expect(title).to.contain("Sign")
    })

    it('enter login info', async () => {
        await functions.signin(page)
    })
})

describe ('view the MTC reports', () => {
    beforeEach(() => {
        jest.setTimeout(300000);
      });
// view each mtc report and confirm the correct number of records display   
    it('Brazil MTC', async () => {
        await page.waitFor(3000)
        await functions.viewMTCReport(page, sideNav.BRAZIL_MTC, 'Brazil')
        
    })
    it('Colombia MTC', async () => {
        await functions.viewMTCReport(page, sideNav.COLOMBIA_MTC, 'Colombia')
        
    })
    it('England MTC', async () => {
        await functions.viewMTCReport(page, sideNav.ENGLAND_MTC, 'England')
        
    })
    it('Ghana MTC', async () => {
        await functions.viewMTCReport(page, sideNav.GHANA_MTC,'Ghana')
        
    })
    it('Mexico MTC', async () => {
        await functions.viewMTCReport(page, sideNav.MEXICO_MTC,'México')
        
    })
    it('New Zealand MTC', async () => {
        await functions.viewMTCReport(page, sideNav.NZ_MTC,'Zealand')
        
    })
    it('Peru MTC', async () => {
        await functions.viewMTCReport(page, sideNav.PERU_MTC,'Perú ')
        
    })
    it('Philippines MTC', async () => {
        await functions.viewMTCReport(page, sideNav.PHIL_MTC,'Philippines')
        
    })
    it('Provo MTC', async () => {
        await functions.viewMTCReport(page, sideNav.PROVO_MTC,'Provo')
        
    })
    it('South Africa MTC', async () => {
        await functions.viewMTCReport(page, sideNav.S_AFRICA_MTC,'Africa')
        
    })
})

afterAll(async ()  => {
    await browser.close()
})