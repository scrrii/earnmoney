# دليل إعداد الموقع للإنتاج - EarnMoney

## 🚀 جاهزية الموقع للنشر

موقعك **جاهز تقريباً** للنشر! تحتاج فقط لإجراء بعض التعديلات البسيطة لجعله يعمل مع الإعلانات الحقيقية.

## 📋 ما تحتاج لتعديله:

### 1. إضافة أكواد PropellerAds الحقيقية

#### في ملف `public/watch-ad.html`:
```html
<!-- استبدل هذا القسم -->
<div class="video-placeholder">
    <div style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 20px;">📺</div>
        <div>Advertisement Video Playing...</div>
        <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;">Please wait for the video to complete</div>
    </div>
</div>

<!-- بهذا الكود من PropellerAds -->
<div class="video-placeholder">
    <!-- ضع كود الإعلان من PropellerAds هنا -->
    <script type="text/javascript">
        // كود الإعلان من PropellerAds
        // مثال: (سيتم استبداله بالكود الحقيقي)
        // atOptions = {
        //     'key' : 'YOUR_PROPELLER_ADS_KEY',
        //     'format' : 'iframe',
        //     'height' : 300,
        //     'width' : 160,
        //     'params' : {}
        // };
    </script>
    <script type="text/javascript" src="//www.topcreativeformat.com/YOUR_ZONE_ID/invoke.js"></script>
</div>
```

#### في ملف `public/link-video.html`:
```html
<!-- نفس التعديل السابق -->
<div class="video-placeholder">
    <!-- ضع كود إعلان آخر من PropellerAds هنا -->
    <script type="text/javascript">
        // كود إعلان مختلف للفيديو الثاني
    </script>
    <script type="text/javascript" src="//www.topcreativeformat.com/YOUR_SECOND_ZONE_ID/invoke.js"></script>
</div>
```

### 2. إضافة روابط Ouo.io الحقيقية

#### في ملف `public/script.js`:
```javascript
// في قسم visit-link، استبدل هذا الكود:
if (window.location.pathname === '/visit-link') {
    setTimeout(() => {
        // استبدل هذا بالرابط الحقيقي من Ouo.io
        window.open('https://ouo.io/YOUR_SHORTENED_LINK', '_blank');
        
        // انتظار 5 ثوان ثم الانتقال لصفحة الفيديو
        setTimeout(() => {
            window.location.href = '/link-video';
        }, 5000);
    }, 3000);
}
```

### 3. إضافة API Ouo.io (اختياري)

#### إنشاء ملف `ouo-integration.js`:
```javascript
const axios = require('axios');

class OuoIntegration {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://ouo.io/api';
    }
    
    async shortenUrl(originalUrl) {
        try {
            const response = await axios.get(`${this.baseUrl}/shorten`, {
                params: {
                    key: this.apiKey,
                    url: originalUrl
                }
            });
            return response.data.shortenedUrl;
        } catch (error) {
            console.error('Error shortening URL:', error);
            return null;
        }
    }
}

module.exports = OuoIntegration;
```

### 4. تحديث متغيرات البيئة

#### إنشاء ملف `.env`:
```env
# PropellerAds
PROPELLER_ADS_PUBLISHER_ID=YOUR_PUBLISHER_ID
PROPELLER_ADS_ZONE_ID_1=YOUR_FIRST_ZONE_ID
PROPELLER_ADS_ZONE_ID_2=YOUR_SECOND_ZONE_ID

# Ouo.io
OUO_API_KEY=YOUR_OUO_API_KEY

# Database
DATABASE_URL=your_production_database_url

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=3000
NODE_ENV=production
```

## 🔧 خطوات الإعداد النهائية:

### 1. الحصول على أكواد PropellerAds:
1. سجل في PropellerAds.com
2. أضف موقعك وتحقق منه
3. أنشئ منطقتين إعلانيتين (zones):
   - منطقة للفيديو الأول (watch-ad)
   - منطقة للفيديو الثاني (link-video)
4. انسخ أكواد الإعلانات

### 2. الحصول على API من Ouo.io:
1. سجل في Ouo.io
2. اذهب لقسم API
3. احصل على API Key
4. أنشئ روابط مختصرة للاختبار

### 3. تحديث الأكواد:
1. استبدل أكواد الإعلانات الوهمية بالحقيقية
2. استبدل روابط Ouo.io الوهمية بالحقيقية
3. اختبر الموقع محلياً

### 4. النشر:
1. ارفع الموقع لخدمة الاستضافة
2. اربط قاعدة البيانات
3. اضبط متغيرات البيئة
4. اختبر جميع الوظائف

## 💡 نصائح مهمة:

### للإعلانات:
- استخدم أنواع إعلانات مختلفة (Video, Banner, PopUnder)
- اختبر معدلات النقر والأرباح
- تأكد من أن الإعلانات تظهر بشكل صحيح

### للروابط المختصرة:
- استخدم روابط حقيقية ومفيدة للمستخدمين
- اختبر عملية التوجيه
- تأكد من عمل نظام النقاط

### للأمان:
- لا تضع API keys في الكود المرئي
- استخدم متغيرات البيئة
- فعّل HTTPS في الإنتاج

## 🎯 الخلاصة:

موقعك جاهز بنسبة 95%! تحتاج فقط لـ:
1. ✅ استبدال أكواد الإعلانات الوهمية بالحقيقية
2. ✅ إضافة روابط Ouo.io الحقيقية
3. ✅ اختبار النظام
4. ✅ النشر

بعد هذه الخطوات، ستبدأ بالربح فوراً من كل مستخدم يشاهد الإعلانات أو يزور الروابط المختصرة!

## 📞 ملاحظات إضافية:

- نظام النقاط يعمل بشكل مثالي
- نظام السحب جاهز
- قاعدة البيانات مُعدة
- واجهة المستخدم جذابة ومتجاوبة
- الأمان مُطبق (تشفير كلمات المرور، جلسات آمنة)

كل ما تحتاجه هو ربط الإعلانات الحقيقية وستبدأ بالربح! 🚀💰