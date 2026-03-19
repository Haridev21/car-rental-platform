import puppeteer from 'puppeteer';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  try {
    console.log('Capturing Home Page...');
    await page.goto('https://car-rental-platform-nine-alpha.vercel.app/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshots/1_Home.png', fullPage: true });

    console.log('Capturing Login Modal...');
    await page.click('::-p-text(Sign In)');
    await wait(1500); 
    await page.screenshot({ path: 'screenshots/2_LoginModal.png' });
    
    console.log('Capturing Signup Modal...');
    // Login modal has a Sign up link
    await page.click('::-p-text(Sign up)');
    await wait(1500);
    await page.screenshot({ path: 'screenshots/3_SignupModal.png' });

    console.log('Capturing Browse Cars...');
    await page.goto('https://car-rental-platform-nine-alpha.vercel.app/cars', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshots/4_BrowseCars.png', fullPage: true });

    console.log('Capturing Admin Login Portal...');
    await page.goto('https://car-rental-platform-nine-alpha.vercel.app/admin/login', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshots/5_AdminLogin.png' });

    console.log('Logging in as Admin...');
    await page.type('input[type="email"]', 'admin@driveease.com');
    await page.type('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await wait(3000);
    
    console.log('Capturing Admin Dashboard...');
    await page.screenshot({ path: 'screenshots/6_AdminDashboard.png', fullPage: true });

    console.log('Capturing Admin Manage Users...');
    await page.click('::-p-text(User Hub)');
    await wait(2000);
    await page.screenshot({ path: 'screenshots/7_ManageUsers.png', fullPage: true });

    console.log('Capturing Admin All Cars...');
    await page.click('::-p-text(Inventory)');
    await wait(3000);
    await page.screenshot({ path: 'screenshots/8_AllCars.png', fullPage: true });

    console.log('Capturing Admin Bookings...');
    await page.click('::-p-text(All Rentals)');
    await wait(3000);
    await page.screenshot({ path: 'screenshots/9_SystemBookings.png', fullPage: true });

    console.log('All screenshots successfully saved in the /screenshots directory!');
  } catch (error) {
    console.error("An error occurred during capture:", error);
  } finally {
    await browser.close();
  }
})();
