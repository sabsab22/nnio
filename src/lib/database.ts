import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin89', // استبدل ببيانات الدخول الخاصة بك
  password: '2qJ38ul!', // كلمة المرور إن وجدت
  database: 'sultan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function storeCredentials(credentials: { email?: string; username?: string; password: string }[]) {
  const connection = await pool.getConnection();
  
  try {
    const [results] = await connection.query(
      'INSERT INTO credentials (email, username, password) VALUES ?',
      [credentials.map(c => [c.email, c.username, c.password])]
    );
    return results;
  } catch (error) {
    console.error('خطأ في تخزين البيانات:', error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function getCredentials() {
  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.query('SELECT * FROM credentials');
    return rows;
  } catch (error) {
    console.error('خطأ في جلب البيانات:', error);
    throw error;
  } finally {
    connection.release();
  }
}
