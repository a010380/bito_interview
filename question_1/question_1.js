var webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;
	
var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();
	
driver.get('https://www.google.com.tw/');
driver.findElement(By.id('APjFqb')).sendKeys('BitoPro');
driver.findElement(By.class('gNO89b')).click();
driver.wait(until.titleIs('BitoPro - Google 搜尋'));

if(driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div/div/div/div/div[1]/a/h3')).text() == "BitoPro"){
    document.write("include!"); 
} else{
    document.write("not include!");
}
for (i=2;i<8;i++){
    let element = driver.findElement(By.xpath('//*[@id="rso"]/div[' + i + ']/div/div/div[1]/div/a/h3')).text()
    if (element.includes("BitoPro")){
        document.write("include!");
    } else{
        document.write("not include!");
    }
}

if(driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div/div/div/div/div[1]/a/h3')).text() == "https://www.bitopro.com"){
    document.write("include URL!"); 
} else{
    document.write("not include URL!");
}
for (i=2;i<8;i++){
    let element = driver.findElement(By.xpath('//*[@id="rso"]/div[' + i + ']/div/div/div[1]/div/a/div/div/span')).text()
    if (element == "https://www.bitopro.com"){
        document.write("include URL!");
    } else{
        document.write("not include URL!");
    }
}
driver.quit();