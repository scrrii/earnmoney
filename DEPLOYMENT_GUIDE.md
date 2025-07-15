# 🚀 دليل نشر موقع EarnMoney - خطوة بخطوة

## 📋 جدول المحتويات
1. [التحضير للنشر](#التحضير-للنشر)
2. [اختيار خدمة الاستضافة](#اختيار-خدمة-الاستضافة)
3. [النشر على Render (مجاني)](#النشر-على-render)
4. [النشر على Hostinger](#النشر-على-hostinger)
5. [النشر على DigitalOcean](#النشر-على-digitalocean)
6. [إعداد قاعدة البيانات](#إعداد-قاعدة-البيانات)
7. [إعداد النطاق والـ SSL](#إعداد-النطاق-والـ-ssl)
8. [اختبار الموقع بعد النشر](#اختبار-الموقع-بعد-النشر)
9. [المراقبة والصيانة](#المراقبة-والصيانة)

---

## 🛠️ التحضير للنشر

### 1. إنشاء ملف `.env` للإنتاج:
```env
# إعدادات الخادم
NODE_ENV=production
PORT=3000

# قاعدة البيانات
DATABASE_URL=sqlite:./earnmoney.db

# PropellerAds
PROPELLER_ADS_PUBLISHER_ID=your_publisher_id
PROPELLER_ADS_ZONE_ID_1=your_zone_id_1
PROPELLER_ADS_ZONE_ID_2=your_zone_id_2

# Ouo.io
OUO_API_KEY=your_ouo_api_key

# البريد الإلكتروني
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# الأمان
SESSION_SECRET=your_very_long_random_secret_key_here
```

### 2. تحديث `package.json` للإنتاج:
```json
{
  "name": "earnmoney-website",
  "version": "1.0.0",
  "description": "Earn money by watching ads and visiting links",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required'"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "nodemailer": "^6.9.7",
    "sqlite3": "^5.1.6",
    "path": "^0.12.7"
  }
}
```

### 3. إنشاء ملف `.gitignore`:
```
node_modules/
.env
*.log
.DS_Store
earnmoney.db
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

---

## 🌐 اختيار خدمة الاستضافة

### المقارنة السريعة:

| الخدمة | السعر | المميزات | الصعوبة |
|---------|-------|-----------|----------|
| **Render** | مجاني | سهل جداً، SSL مجاني | ⭐ |
| **Hostinger** | $2-5/شهر | رخيص، دعم عربي | ⭐⭐ |
| **DigitalOcean** | $5-10/شهر | مرن، قوي | ⭐⭐⭐ |
| **Heroku** | مجاني محدود | سهل، إضافات | ⭐⭐ |

---

## 🆓 النشر على Render (الأسهل والمجاني)

### الخطوة 1: إعداد Git Repository
```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit"

# إنشاء repository على GitHub
# ثم ربطه
git remote add origin https://github.com/username/earnmoney.git
git push -u origin main
```

### الخطوة 2: التسجيل في Render
1. اذهب إلى [render.com](https://render.com)
2. سجل باستخدام GitHub
3. اختر "New Web Service"
4. اربط GitHub repository

### الخطوة 3: إعداد الخدمة
```yaml
# إعدادات Render
Name: earnmoney-website
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### الخطوة 4: إضافة متغيرات البيئة
في لوحة تحكم Render، أضف:
```
NODE_ENV=production
PORT=10000
PROPELLER_ADS_PUBLISHER_ID=your_id
OUO_API_KEY=your_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
SESSION_SECRET=your_secret
```

### الخطوة 5: النشر
- Render سينشر الموقع تلقائياً
- ستحصل على رابط مثل: `https://earnmoney-website.onrender.com`

---

## 💰 النشر على Hostinger

### الخطوة 1: شراء الاستضافة
1. اذهب إلى [hostinger.com](https://hostinger.com)
2. اختر "Web Hosting" أو "VPS"
3. اختر الخطة المناسبة

### الخطوة 2: إعداد Node.js
```bash
# في cPanel أو SSH
# تفعيل Node.js
nvm install 18
nvm use 18
npm install -g pm2
```

### الخطوة 3: رفع الملفات
```bash
# عبر FTP أو File Manager
# ارفع جميع ملفات المشروع إلى public_html

# أو عبر Git
git clone https://github.com/username/earnmoney.git
cd earnmoney
npm install
```

### الخطوة 4: إعداد PM2
```bash
# إنشاء ملف ecosystem.config.js
module.exports = {
  apps: [{
    name: 'earnmoney',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};

# تشغيل التطبيق
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### الخطوة 5: إعداد Apache/Nginx
```apache
# .htaccess للـ Apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## 🌊 النشر على DigitalOcean

### الخطوة 1: إنشاء Droplet
1. سجل في [digitalocean.com](https://digitalocean.com)
2. اختر "Create Droplet"
3. اختر Ubuntu 22.04
4. اختر الحجم ($5/شهر كافي للبداية)

### الخطوة 2: إعداد الخادم
```bash
# الاتصال بالخادم
ssh root@your_server_ip

# تحديث النظام
apt update && apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# تثبيت PM2
npm install -g pm2

# تثبيت Nginx
apt install nginx -y

# تثبيت Certbot للـ SSL
apt install certbot python3-certbot-nginx -y
```

### الخطوة 3: رفع التطبيق
```bash
# إنشاء مجلد للتطبيق
mkdir /var/www/earnmoney
cd /var/www/earnmoney

# استنساخ المشروع
git clone https://github.com/username/earnmoney.git .
npm install

# إنشاء ملف .env
nano .env
# أضف متغيرات البيئة
```

### الخطوة 4: إعداد PM2
```bash
# تشغيل التطبيق
pm2 start server.js --name "earnmoney"
pm2 startup
pm2 save
```

### الخطوة 5: إعداد Nginx
```nginx
# /etc/nginx/sites-available/earnmoney
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# تفعيل الموقع
ln -s /etc/nginx/sites-available/earnmoney /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 🗄️ إعداد قاعدة البيانات

### للإنتاج - استخدام PostgreSQL:

#### 1. تثبيت PostgreSQL:
```bash
# على Ubuntu
apt install postgresql postgresql-contrib -y

# إنشاء قاعدة بيانات
sudo -u postgres createdb earnmoney
sudo -u postgres createuser earnmoney_user
sudo -u postgres psql
```

```sql
-- في PostgreSQL
ALTER USER earnmoney_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE earnmoney TO earnmoney_user;
\q
```

#### 2. تحديث server.js:
```javascript
// استبدال SQLite بـ PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://earnmoney_user:password@localhost/earnmoney',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
```

---

## 🌐 إعداد النطاق والـ SSL

### 1. ربط النطاق:
```bash
# في إعدادات DNS للنطاق
A Record: @ -> your_server_ip
A Record: www -> your_server_ip
```

### 2. تثبيت SSL مجاني:
```bash
# باستخدام Certbot
certbot --nginx -d your-domain.com -d www.your-domain.com

# التجديد التلقائي
crontab -e
# أضف هذا السطر:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🧪 اختبار الموقع بعد النشر

### قائمة الفحص:
```bash
# 1. فحص الخادم
curl -I https://your-domain.com

# 2. فحص قاعدة البيانات
# تسجيل مستخدم جديد
# تسجيل دخول
# مشاهدة إعلان
# زيارة رابط مختصر
# طلب سحب

# 3. فحص الأداء
# استخدم Google PageSpeed Insights
# فحص أوقات التحميل

# 4. فحص الأمان
# تأكد من HTTPS
# فحص headers الأمان
```

---

## 📊 المراقبة والصيانة

### 1. مراقبة الخادم:
```bash
# مراقبة PM2
pm2 monit
pm2 logs earnmoney

# مراقبة استخدام الموارد
htop
df -h
free -m
```

### 2. النسخ الاحتياطي:
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)

# نسخ احتياطي لقاعدة البيانات
pg_dump earnmoney > /backups/db_$DATE.sql

# نسخ احتياطي للملفات
tar -czf /backups/files_$DATE.tar.gz /var/www/earnmoney

# حذف النسخ القديمة (أكثر من 7 أيام)
find /backups -name "*.sql" -mtime +7 -delete
find /backups -name "*.tar.gz" -mtime +7 -delete
```

### 3. التحديثات:
```bash
# تحديث التطبيق
cd /var/www/earnmoney
git pull origin main
npm install
pm2 restart earnmoney

# تحديث النظام
apt update && apt upgrade -y
```

---

## 🔧 إعدادات إضافية للأداء

### 1. ضغط الملفات:
```nginx
# في إعدادات Nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. التخزين المؤقت:
```nginx
# إعدادات Cache
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. حدود الأمان:
```nginx
# حماية من DDoS
limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
limit_req zone=login burst=5 nodelay;
```

---

## 📞 الدعم والمساعدة

### مشاكل شائعة وحلولها:

#### 1. الموقع لا يعمل:
```bash
# فحص حالة الخدمات
pm2 status
systemctl status nginx

# فحص السجلات
pm2 logs earnmoney
tail -f /var/log/nginx/error.log
```

#### 2. قاعدة البيانات لا تعمل:
```bash
# فحص PostgreSQL
systemctl status postgresql
sudo -u postgres psql -c "SELECT version();"
```

#### 3. SSL لا يعمل:
```bash
# تجديد الشهادة
certbot renew
nginx -t && systemctl reload nginx
```

---

## 🎯 الخلاصة

بعد اتباع هذا الدليل، ستحصل على:

✅ **موقع منشور ومتاح على الإنترنت**
✅ **شهادة SSL مجانية**
✅ **قاعدة بيانات آمنة**
✅ **نظام مراقبة ونسخ احتياطي**
✅ **أداء محسّن**
✅ **حماية من الهجمات**

**الآن موقعك جاهز للربح! 🚀💰**

---

## 📋 قائمة مراجعة النشر

- [ ] إعداد ملف .env
- [ ] تحديث package.json
- [ ] إنشاء Git repository
- [ ] اختيار خدمة الاستضافة
- [ ] رفع الملفات
- [ ] إعداد قاعدة البيانات
- [ ] ربط النطاق
- [ ] تثبيت SSL
- [ ] اختبار جميع الوظائف
- [ ] إعداد المراقبة
- [ ] إعداد النسخ الاحتياطي
- [ ] إضافة أكواد الإعلانات الحقيقية
- [ ] البدء بالربح! 🎉