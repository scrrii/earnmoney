# مثال عملي لدمج الإعلانات الحقيقية

## 🎥 مثال: كيف ستبدو صفحة watch-ad.html بعد إضافة PropellerAds

### الكود الحالي (وهمي):
```html
<div class="video-placeholder">
    <div style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 20px;">📺</div>
        <div>Advertisement Video Playing...</div>
    </div>
</div>
```

### الكود بعد إضافة PropellerAds (حقيقي):
```html
<div class="video-placeholder">
    <!-- كود الإعلان الحقيقي من PropellerAds -->
    <script type="text/javascript">
        atOptions = {
            'key' : 'abc123def456',  // مفتاحك من PropellerAds
            'format' : 'iframe',
            'height' : 300,
            'width' : 500,
            'params' : {}
        };
    </script>
    <script type="text/javascript" src="//www.topcreativeformat.com/123456/invoke.js"></script>
    
    <!-- أو إعلان فيديو -->
    <div id="propeller-video-ad"></div>
    <script>
        (function() {
            var d = document, s = d.createElement('script');
            s.src = 'https://go.propellerads.com/aff_ad?adid=YOUR_AD_ID';
            s.async = true;
            d.getElementById('propeller-video-ad').appendChild(s);
        })();
    </script>
</div>
```

## 🔗 مثال: كيف ستبدو الروابط المختصرة الحقيقية

### الكود الحالي (وهمي):
```javascript
if (window.location.pathname === '/visit-link') {
    setTimeout(() => {
        showMessage('Redirecting to shortened link...', 'success');
        setTimeout(() => {
            window.location.href = '/link-video';
        }, 3000);
    }, 1000);
}
```

### الكود بعد إضافة Ouo.io (حقيقي):
```javascript
if (window.location.pathname === '/visit-link') {
    setTimeout(() => {
        // قائمة بالروابط المختصرة الحقيقية
        const ouoLinks = [
            'https://ouo.io/abc123',
            'https://ouo.io/def456', 
            'https://ouo.io/ghi789',
            'https://ouo.io/jkl012'
        ];
        
        // اختيار رابط عشوائي
        const randomLink = ouoLinks[Math.floor(Math.random() * ouoLinks.length)];
        
        showMessage('Opening shortened link in new tab...', 'success');
        
        // فتح الرابط في تبويب جديد
        window.open(randomLink, '_blank');
        
        // إعطاء 25 نقطة فوراً لزيارة الرابط
        earnPoints(25, 'link_visit');
        
        // الانتقال لصفحة الفيديو بعد 5 ثوان
        setTimeout(() => {
            window.location.href = '/link-video';
        }, 5000);
    }, 1000);
}
```

## 💰 مثال: إضافة المزيد من أنواع الإعلانات

### 1. إعلانات PopUnder (الأكثر ربحية):
```html
<!-- في <head> أو قبل </body> -->
<script type="text/javascript">
    var uid = '123456';
    var wid = '654321';
    var pop_tag = document.createElement('script');
    pop_tag.src='//www.propellerads.com/js/show.js';
    document.head.appendChild(pop_tag);
    pop_tag.onload = function() {
        pop_show(uid, wid, 0);
    }
</script>
```

### 2. إعلانات Push Notification:
```html
<!-- في <head> -->
<script>
(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('propellerads.com',123456,document.createElement('script'))
</script>
```

### 3. إعلانات Banner:
```html
<div class="banner-ad">
    <script type="text/javascript">
        atOptions = {
            'key' : 'banner_key_123',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
        };
    </script>
    <script type="text/javascript" src="//www.topcreativeformat.com/banner_zone/invoke.js"></script>
</div>
```

## 🔧 مثال: تحديث server.js لدعم Ouo.io API

```javascript
// إضافة في أعلى server.js
const axios = require('axios');
const OUO_API_KEY = process.env.OUO_API_KEY || 'your_ouo_api_key';

// إضافة endpoint جديد لإنشاء روابط مختصرة
app.post('/api/create-short-link', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        
        const response = await axios.get('https://ouo.io/api/shorten', {
            params: {
                key: OUO_API_KEY,
                url: originalUrl
            }
        });
        
        res.json({
            success: true,
            shortUrl: response.data.shortenedUrl
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to create short link'
        });
    }
});

// تحديث endpoint earn-points لدعم أنواع جديدة
app.post('/api/earn-points', (req, res) => {
    const { points, type } = req.body;
    const userId = req.session.userId;
    
    if (!userId) {
        return res.json({ success: false, message: 'Please login first' });
    }
    
    // أنواع الأرباح المختلفة
    const pointsMap = {
        'video': 40,           // مشاهدة فيديو
        'link_visit': 25,      // زيارة رابط مختصر
        'link_video': 40,      // فيديو بعد الرابط المختصر
        'popup': 15,           // إعلان popup
        'banner_click': 10,    // نقر على banner
        'push_click': 20       // نقر على push notification
    };
    
    const earnedPoints = pointsMap[type] || points;
    
    db.run('UPDATE users SET points = points + ? WHERE id = ?', [earnedPoints, userId], function(err) {
        if (err) {
            res.json({ success: false, message: 'Failed to update points' });
        } else {
            res.json({ 
                success: true, 
                message: `You earned ${earnedPoints} points!`,
                pointsEarned: earnedPoints
            });
        }
    });
});
```

## 📊 مثال: إضافة إحصائيات الأرباح

```javascript
// إضافة جدول جديد للإحصائيات
db.run(`CREATE TABLE IF NOT EXISTS earnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    points_earned INTEGER,
    earning_type TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
)`);

// endpoint لعرض الإحصائيات
app.get('/api/earnings-stats', (req, res) => {
    const userId = req.session.userId;
    
    if (!userId) {
        return res.json({ success: false, message: 'Please login first' });
    }
    
    db.all(`
        SELECT 
            earning_type,
            SUM(points_earned) as total_points,
            COUNT(*) as total_actions,
            DATE(timestamp) as date
        FROM earnings 
        WHERE user_id = ? 
        GROUP BY earning_type, DATE(timestamp)
        ORDER BY timestamp DESC
        LIMIT 30
    `, [userId], (err, rows) => {
        if (err) {
            res.json({ success: false, message: 'Failed to get stats' });
        } else {
            res.json({ success: true, stats: rows });
        }
    });
});
```

## 🎯 الخلاصة:

بعد تطبيق هذه الأمثلة، موقعك سيصبح:

✅ **يعرض إعلانات حقيقية** من PropellerAds
✅ **يستخدم روابط مختصرة حقيقية** من Ouo.io  
✅ **يربح المال الحقيقي** من كل زائر
✅ **يتتبع الإحصائيات** بدقة
✅ **يدعم أنواع إعلانات متعددة** لزيادة الأرباح

**المطلوب منك فقط:**
1. الحصول على أكواد PropellerAds الحقيقية
2. الحصول على API key من Ouo.io
3. استبدال الأكواد الوهمية بالحقيقية
4. اختبار الموقع
5. النشر والبدء بالربح! 💰🚀