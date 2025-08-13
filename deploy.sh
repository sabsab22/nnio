#!/bin/bash
echo "جاري نشر المشروع..."

# تثبيت التبعيات
npm install
npm run build

# نسخ الملفات إلى مجلد النشر
cp -r dist/* /var/www/html/
cp .htaccess /var/www/html/
cp install.php /var/www/html/

# تعديل الصلاحيات
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html

echo "تم النشر بنجاح!"
