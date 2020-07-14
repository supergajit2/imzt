const login = require('../pages/login')
const config = require('../lib/config')
const home = require('../pages/home')
const helpers = require('../lib/helpers')
const sideNav = require('../pages/side-nav')
const report = require('../pages/mtcReport')

module.exports = {
    // Sign-in on the generic church login page
    signin: async function(page) {
        await page.waitForSelector(login.USERNAME)
        await page.type(login.USERNAME,config.username)
        await page.type(login.PASSWORD, config.password)
        await page.click(login.SIGN_IN)
        await helpers.waitForText(page,home.TITLE,'Missionary')
    },
    // Run an MTC Report
    viewMTCReport: async function(page, selector, text) {
        await page.waitForSelector(home.SIDE_NAV)
        await helpers.click(page, home.SIDE_NAV)
        await page.waitForSelector(sideNav.MTC_LIST)
        await helpers.click(page, sideNav.MTC_LIST)
        await page.waitFor(3000)
        await helpers.click(page, selector)
        await helpers.waitForText(page, report.MTC_TITLE, text)
        await page.waitForSelector(report.WEEK_SUMMARY)   
        
    },
    
}