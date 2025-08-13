<?php
// ملف تثبيت قاعدة البيانات
header('Content-Type: text/html; charset=utf-8');
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $host = $_POST['host'] ?? 'localhost';
    $user = $_POST['user'] ?? 'root';
    $password = $_POST['password'] ?? '';
    $database = $_POST['database'] ?? 'doc_management';

    try {
        $conn = new mysqli($host, $user, $password);
        
        // إنشاء قاعدة البيانات
        $conn->query("CREATE DATABASE IF NOT EXISTS `$database`");
        $conn->select_db($database);
        
        // إنشاء الجدول
        $sql = "CREATE TABLE IF NOT EXISTS credentials (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $conn->query($sql);
        
        // حفظ إعدادات الاتصال
        $config = <<<EOT
        <?php
        define('DB_HOST', '$host');
        define('DB_USER', '$user');
        define('DB_PASS', '$password');
        define('DB_NAME', '$database');
        EOT;
        
        file_put_contents('config.php', $config);
        $success = true;
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <title>تثبيت النظام</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; }
        .success { color: green; }
        .error { color: red; }
    </style>
</head>
<body>
    <h1>تثبيت نظام إدارة المستندات</h1>
    
    <?php if (isset($error)): ?>
        <p class="error">خطأ: <?= htmlspecialchars($error) ?></p>
    <?php elseif ($success): ?>
        <p class="success">تم التثبيت بنجاح! يمكنك الآن <a href="index.php">الدخول للنظام</a>.</p>
    <?php else: ?>
        <form method="post">
            <div>
                <label for="host">خادم قاعدة البيانات:</label>
                <input type="text" id="host" name="host" value="localhost" required>
            </div>
            <div>
                <label for="user">اسم المستخدم:</label>
                <input type="text" id="user" name="user" required>
            </div>
            <div>
                <label for="password">كلمة المرور:</label>
                <input type="password" id="password" name="password">
            </div>
            <div>
                <label for="database">اسم قاعدة البيانات:</label>
                <input type="text" id="database" name="database" value="doc_management" required>
            </div>
            <button type="submit">تثبيت النظام</button>
        </form>
    <?php endif; ?>
</body>
</html>
