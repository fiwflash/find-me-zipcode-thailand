// build.js — รันด้วย: node build.js
// ดึง JSON จาก Gist → generate index.html ที่ฝัง JSON ไว้

const fs = require('fs');
const path = require('path');

const DATABASE_URL = 'https://gist.githubusercontent.com/fiwflash/7d2dc9d1ffbe8e0b8d89430668289a62/raw/database.json';
const OVERLAP_DB_URL = 'https://gist.githubusercontent.com/fiwflash/cc0795e30e0072a0e60e68870a3cb7ad/raw/0aeb1a5d210b27d60432b871d6f2c0667f47e8e5/overlap_cases_database.json';

const TEMPLATE_PATH = path.join(__dirname, 'find_me_zipcode_thailand_template_offline.html');
const OUTPUT_PATH = path.join(__dirname, 'find_me_zipcode_thailand_offline.html');

function escapeForScriptTag(json) {
  return json.replace(/<\/script>/gi, '<\\/script>');
}

function embedJson(scriptId, json) {
  const safeJson = escapeForScriptTag(json);
  return `<script id="${scriptId}" type="application/json">${safeJson}</script>`;
}

async function fetchJson(url, label) {
  process.stdout.write(`⏳ ดาวน์โหลด ${label}... `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} จาก ${url}`);
  const text = await res.text();
  const parsed = JSON.parse(text);
  const count = Array.isArray(parsed) ? parsed.length : 1;
  console.log(`✅ (${count} รายการ)`);
  return text;
}

async function main() {
  console.log('🔨 เริ่ม build index.html\n');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ ไม่พบ ${TEMPLATE_PATH}`);
    process.exit(1);
  }
  let template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const [provinceJson, overlapJson] = await Promise.all([
    fetchJson(DATABASE_URL, 'database.json'),
    fetchJson(OVERLAP_DB_URL, 'overlap_cases_database.json'),
  ]);

  const provinceScript = embedJson('db-provinces', provinceJson);
  const overlapScript = embedJson('db-overlaps', overlapJson);

  // แทนทั้งแท็ก <script> ที่มี placeholder อยู่ข้างใน
  const beforeProvince = template;
  template = template.replace(
    /<script id="db-provinces" type="application\/json">PASTE_PROVINCES_JSON_HERE<\/script>/,
    provinceScript
  );
  if (template === beforeProvince) {
    console.error('❌ ไม่พบ placeholder ของ db-provinces ใน template');
    process.exit(1);
  }

  const beforeOverlap = template;
  template = template.replace(
    /<script id="db-overlaps" type="application\/json">PASTE_OVERLAPS_JSON_HERE<\/script>/,
    overlapScript
  );
  if (template === beforeOverlap) {
    console.error('❌ ไม่พบ placeholder ของ db-overlaps ใน template');
    process.exit(1);
  }

  fs.writeFileSync(OUTPUT_PATH, template, 'utf8');
  const sizeKb = (Buffer.byteLength(template, 'utf8') / 1024).toFixed(1);
  console.log(`\n✅ สร้างเสร็จ: ${OUTPUT_PATH}`);
  console.log(`📦 ขนาดไฟล์: ${sizeKb} KB`);
  console.log(`\n💡 ดับเบิลคลิก index.html เปิดใช้ได้เลย (offline)\n`);
}

main().catch((err) => {
  console.error('\n❌ Build failed:', err.message);
  process.exit(1);
});