# 🔍 Find Me Zipcode Thailand (ค้นหารหัสไปรษณีย์ไทย)

เว็บแอปพลิเคชันค้นหารหัสไปรษณีย์ ตำบล อำเภอ จังหวัด ทั่วประเทศไทย รองรับทั้งการใช้งานแบบ **Online** และแบบ **Offline** 100% พร้อมระบบแจ้งเตือนกรณีพื้นที่คาบเกี่ยว/กรณีพิเศษ (Overlap cases)

---

## ✨ ฟีเจอร์เด่น
- 🔎 **ค้นหาง่าย รวดเร็ว**: กรอกข้อมูลอย่างน้อย 2 ช่อง (ตำบล, อำเภอ, จังหวัด) หรือกรอกรหัสไปรษณีย์ 5 หลักช่องเดียวเพื่อค้นหาได้ทันที
- ⚡ **Auto-complete**: มี datalist ช่วยแนะนำชื่อตำบล อำเภอ จังหวัด และรหัสไปรษณีย์
- ⚠️ **แจ้งเตือนเคสพิเศษ (Overlap Warnings)**: แสดงข้อความแจ้งเตือนสีส้มสำหรับพื้นที่หรือรหัสไปรษณีย์ที่มีเงื่อนไขเฉพาะ
- 🎯 **คลิกเพื่อกรอง (Drill-down)**: คลิกที่รายการที่อยู่เพื่อเติมค่าลงในช่องค้นหาและตัดตัวเลือกได้ทันที
- 📦 **รองรับการใช้งาน Offline**: ไฟล์เดี่ยวขนาดกะทัดรัด เปิดใช้งานได้ทันทีโดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต

---

## 📁 โครงสร้างโปรเจกต์

```text
find_me_zipcode_thailand/
├── find_me_zipcode_thailand.html             # เวอร์ชัน Online (ดึงข้อมูลผ่าน Gist API)
├── find_me_zipcode_thailand_offline.html     # เวอร์ชัน Offline (ฝังฐานข้อมูล JSON ในตัว พร้อมเปิดใช้ได้ทันที)
├── find_me_zipcode_thailand_template_offline.html # ไฟล์ Template สำหรับประกอบร่างเป็นไฟล์ Offline
├── build.js                                  # สคริปต์ Node.js ดึง JSON ล่าสุดแล้วสร้างไฟล์ Offline
├── .gitignore
└── README.md
```

---

## 🚀 วิธีใช้งานทั่วไป

### 1. แบบ Online
- ดับเบิลคลิกเปิดไฟล์ `find_me_zipcode_thailand.html` ด้วยเบราว์เซอร์ใดก็ได้
- ระบบจะโหลดฐานข้อมูลล่าสุดผ่าน GitHub Gist อัตโนมัติ

### 2. แบบ Offline
- ดับเบิลคลิกเปิดไฟล์ `find_me_zipcode_thailand_offline.html` ด้วยเบราว์เซอร์
- สามารถนำไฟล์นี้ใส่ Flash Drive หรือส่งต่อให้เครื่องที่ไม่มีอินเทอร์เน็ตใช้งานได้ทันที

---

## 🔄 วิธีอัปเดตเวอร์ชัน Offline (Update Offline Database)

เมื่อมีการปรับปรุงหรือแก้ไขฐานข้อมูลบน Gist คุณสามารถอัปเดตฐานข้อมูลในไฟล์ `find_me_zipcode_thailand_offline.html` ได้ 2 วิธี ดังนี้:

### วิธีที่ 1: อัปเดตอัตโนมัติด้วย Node.js (แนะนำ รวดเร็วที่สุด) ⚡

1. ตรวจสอบว่าเครื่องมี **Node.js** ติดตั้งอยู่ (ตรวจสอบด้วยคำสั่ง `node -v`)
2. เปิด Terminal หรือ PowerShell ในโฟลเดอร์โปรเจกต์
3. รันคำสั่ง:
   ```bash
   node build.js
   ```
4. สคริปต์จะทำการ:
   - ดาวน์โหลด `database.json` ล่าสุด
   - ดาวน์โหลด `overlap_cases_database.json` ล่าสุด
   - นำข้อมูลฝังเข้าไปใน `find_me_zipcode_thailand_template_offline.html`
   - บันทึกทับเป็น `find_me_zipcode_thailand_offline.html` ให้โดยอัตโนมัติ

---

### วิธีที่ 2: อัปเดตด้วยตนเอง (Manual Update) 🛠️

หากไม่มี Node.js สามารถทำตามขั้นตอนต่อไปนี้ได้:

1. เปิดดาวน์โหลดข้อมูล JSON ล่าสุดจาก 2 แหล่งนี้:
   - **ฐานข้อมูลตำบล/อำเภอ/จังหวัด**: [database.json](https://gist.githubusercontent.com/fiwflash/7d2dc9d1ffbe8e0b8d89430668289a62/raw/database.json)
   - **ฐานข้อมูลเคสแจ้งเตือนพิเศษ**: [overlap_cases_database.json](https://gist.githubusercontent.com/fiwflash/cc0795e30e0072a0e60e68870a3cb7ad/raw/0aeb1a5d210b27d60432b871d6f2c0667f47e8e5/overlap_cases_database.json)
2. เปิดไฟล์ `find_me_zipcode_thailand_template_offline.html` ด้วย Text Editor (เช่น VS Code, Notepad++)
3. หาแท็ก:
   ```html
   <script id="db-provinces" type="application/json">PASTE_PROVINCES_JSON_HERE</script>
   ```
   แล้ว Copy เนื้อหาทั้งหมดจาก `database.json` มาวางแทนที่ข้อความ `PASTE_PROVINCES_JSON_HERE`
4. หาแท็ก:
   ```html
   <script id="db-overlaps" type="application/json">PASTE_OVERLAPS_JSON_HERE</script>
   ```
   แล้ว Copy เนื้อหาทั้งหมดจาก `overlap_cases_database.json` มาวางแทนที่ข้อความ `PASTE_OVERLAPS_JSON_HERE`
5. บันทึกไฟล์ (Save As) ตั้งชื่อเป็น `find_me_zipcode_thailand_offline.html`

---

## 🛠️ แหล่งที่มาของข้อมูล (Data Sources)
- ฐานข้อมูลที่อยู่และรหัสไปรษณีย์: Gist [`database.json`](https://gist.github.com/fiwflash/7d2dc9d1ffbe8e0b8d89430668289a62)
- ฐานข้อมูลข้อควรระวังพื้นที่ทับซ้อน: Gist [`overlap_cases_database.json`](https://gist.github.com/fiwflash/cc0795e30e0072a0e60e68870a3cb7ad)

---

## 📄 License
MIT License
