const puppeteer = require('puppeteer')
const fs = require('fs')
const chalk = require('chalk') // 一个美化 console 的输出库
const readline = require('readline')
const setting = {
  // 设置超时时间
  timeout: 15000,
  // 如果是访问https页面，此属性会忽略 https错误
  ignoreHTTPSErrors: true,
  // 关闭 headlesss模式，不会打开浏览器
  headless: false
}

const log = console.log
const TOTAL_PAGE = 2
let page
let search_btn
async function getHtml() {
  const browser = await puppeteer.launch(setting)
  log(chalk.green('服务正常启动'))
  try {
     page = await browser.newPage()

    await page.goto('https://business.oceanengine.com/site/login')
    await page.waitFor(2000)
    await page.focus('input[name="email"]')
    await page.keyboard.sendCharacter('cuihonglei@huajinmedia.com')
    await page.focus('input[name="password"]')
    await page.keyboard.sendCharacter('Hj@123456')

     search_btn = await page.$('button.account-center-action-button')
    await search_btn.click()
    await page.waitFor(2000)
    const ma = await page.$('#login-account-center-captcha-input')
    if(ma){
       await getMa()
    }
    
    // 所有的数据爬取完毕后关闭浏览器
    // await browser.close();
    // log(chalk.green('数据成功爬取完成！！'))
  } catch (error) {
    console.log(error)
    log(chalk.red('服务意外终止'))
    // await browser.close();
  } finally {
    // 最后要退出进程
    // process.exit(0)
  }
}

getHtml()

async function getMa() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  await rl.question('验证码', async (answer) => {
    // 对答案进行处理
    console.log(`多谢你的反馈：${answer}`);
    rl.close();
       await page.focus('#login-account-center-captcha-input')
       await page.keyboard.sendCharacter(answer)
       await search_btn.click()
       await page.waitFor(2000)
       await page.screenshot({
         path: '1.png',
         type: 'png',
         fullPage: true,
       });
       let d=await page.$$('.overview-info')
       console.log(d)
  });
}
