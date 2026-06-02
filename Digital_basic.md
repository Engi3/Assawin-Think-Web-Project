# โครงสร้างการออกแบบเว็บไซต์สื่อการสอนออนไลน์ (Web-Based Instruction Blueprint)
**รายวิชา:** ดิจิทัลและไมโครคอนโทรลเลอร์ (20127-2007) - โมดูลพื้นฐานดิจิทัล
**ทฤษฎีการเรียนรู้หลัก:** Constructivism (การสร้างความรู้ด้วยตนเองผ่านการลงมือทำ) และ Experiential Learning (การเรียนรู้ผ่านประสบการณ์และ Simulation)
**กรอบการออกแบบ:** Outcome-Based Education (OBE) ผสาน Active Learning

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Outcomes)
ตามทฤษฎี Bloom's Taxonomy (Cognitive Domain):
1. **(Remembering/Understanding):** ผู้เรียนสามารถอธิบายหลักการของระบบเลขฐาน รหัสตัวเลข และการทำงานของลอจิกเกตได้
2. **(Applying):** ผู้เรียนสามารถคำนวณการแปลงเลขฐาน การบวกลบคูณหาร และอ่านคู่มือไอซีดิจิทัล (Datasheet) ได้
3. **(Analyzing/Evaluating):** ผู้เรียนสามารถวิเคราะห์ตารางความจริง และออกแบบวงจรบวกลบเลขฐาน เข้ารหัส และถอดรหัสเบื้องต้นได้

---

## 📚 โครงสร้างเนื้อหาและกระบวนการเรียนรู้ (Content & Process)

### บทที่ 1: ระบบเลขฐานและการแปลงเลขฐาน (Number Systems & Conversions)
**เนื้อหา (Content):**
- โครงสร้างของระบบเลขฐาน: ฐานสอง (Binary), ฐานแปด (Octal), ฐานสิบ (Decimal), ฐานสิบหก (Hexadecimal)
- **ไฮไลต์สำคัญ:** การแปลงเลขฐานสิบเป็นฐานอื่นๆ โดยใช้ **"วิธีหารสั้น" (Short Division)**

**กระบวนการและสื่อ (Process & Interactive Media):**
- **UI/UX Design:** นำเสนอแอนิเมชันทีละสเต็ป (Step-by-step animation) เพื่ออธิบายกระบวนการหารสั้น
- **ตัวอย่างประกอบ (แสดงผลบนเว็บ):**
  - **1. ฐานสิบ เป็น ฐานสอง (ตัวอย่าง: 25)**
    ```text
    2 | 25  เศษ 1  (LSB - หลักที่มีค่าน้อยสุด)
    2 | 12  เศษ 0
    2 |  6  เศษ 0
    2 |  3  เศษ 1
    2 |  1  เศษ 1  (MSB - หลักที่มีค่ามากสุด)
    2 |  0
    คำตอบ: 11001 เบส 2
    ```
  - **2. ฐานสิบ เป็น ฐานแปด (ตัวอย่าง: 25)**
    ```text
    8 | 25  เศษ 1  (LSB)
    8 |  3  เศษ 3  (MSB)
    8 |  0
    คำตอบ: 31 เบส 8
    ```
  - **3. ฐานสิบ เป็น ฐานสิบหก (ตัวอย่าง: 45)**
    ```text
    16 | 45  เศษ 13 (ในฐานสิบหก 13 คือ D) (LSB)
    16 |  2  เศษ  2 (MSB)
    16 |  0
    คำตอบ: 2D เบส 16
    ```
- **Interactive Simulation:** - *"เครื่องแปลงเลขฐานอัจฉริยะ":* ให้ผู้เรียนกรอกตัวเลขฐานสิบ ระบบจะจำลองการตั้งหารสั้นให้ดูทีละบรรทัด พร้อมปุ่ม "Next Step" เพื่อสร้างความเข้าใจตามหลัก Scaffolding

### บทที่ 2: คณิตศาสตร์ของระบบเลขฐาน (Number System Arithmetic)
**เนื้อหา (Content):**
- การบวก ลบ คูณ หาร ในระบบเลขฐานสอง (เน้นเป็นพิเศษ) ฐานแปด และฐานสิบหก
- รหัสตัวเลข (Number Codes): BCD, ASCII, Excess-3, Gray Code
- วงจรการลบด้วย 1's Complement และ 2's Complement

**กระบวนการและสื่อ (Process & Interactive Media):**
- **UI/UX Design:** กระดานดำดิจิทัล (Digital Chalkboard) แสดงการทดเลข (Carry) และการยืม (Borrow) ด้วยสีที่แตกต่างกัน (Visual Coding)
- **Interactive Simulation:**
  - *"Arithmetic Sandbox":* กล่องทรายสำหรับตั้งโจทย์บวกลบเลขฐานสอง ให้ผู้เรียนลากตัวทด (Carry-over) ไปวางในหลักที่ถูกต้อง หากวางผิดระบบจะแจ้งเตือนพร้อมคำอธิบาย (Immediate Feedback)

### บทที่ 3: พีชคณิตบูลลีน ลอจิกเกต และตารางความจริง (Boolean Algebra & Logic Gates)
**เนื้อหา (Content):**
- ทฤษฎีพีชคณิตบูลลีนเบื้องต้น (กฎและทฤษฎีบท)
- สัญลักษณ์สมการ และตารางความจริง (Truth Table) ของ AND, OR, NOT, NAND, NOR, EX-OR, EX-NOR

**กระบวนการและสื่อ (Process & Interactive Media):**
- **UI/UX Design:** แสดงกราฟิกของเกตแต่ละชนิด พร้อมเปรียบเทียบกับการต่อสวิตช์ไฟฟ้า (อนุกรม = AND, ขนาน = OR) เพื่อเชื่อมโยงความรู้เดิม (Cognitive Bridging)
- **Interactive Simulation:**
  - *"Logic Gate Builder":* พื้นที่จำลองการต่อวงจร ให้ผู้เรียนลากสวิตช์อินพุต (0/1) ไปต่อกับเกตชนิดต่างๆ และดูผลลัพธ์ที่หลอดไฟ LED ท้ายวงจร
  - *"Truth Table Generator":* เมื่อผู้เรียนเปลี่ยนสถานะอินพุต ตารางความจริงด้านข้างจะไฮไลต์แถวที่ตรงกับสภาวะนั้นแบบ Real-time

### บทที่ 4: วงจรลอจิกเชิงผสมและการอ่านคู่มือไอซี (Combinational Logic & IC Manuals)
**เนื้อหา (Content):**
- วงจรบวกเลข (Half Adder, Full Adder)
- วงจรลบเลข (Half Subtractor, Full Subtractor)
- วงจรเข้ารหัส (Encoder) และถอดรหัส (Decoder)
- การอ่านคู่มือไอซีดิจิทัล (Datasheet) เช่น การดูขา (Pinout), VCC, GND

**กระบวนการและสื่อ (Process & Interactive Media):**
- **UI/UX Design:** อินเทอร์เฟซแบบคู่ (Split Screen) ด้านซ้ายเป็นผังวงจร (Schematic) ด้านขวาเป็นไอซีตัวจริงบน Breadboard
- **Interactive Simulation:**
  - *"Virtual Breadboard":* จำลองแผงต่อวงจร ให้ผู้เรียนเลือกเบอร์ไอซี (เช่น 74LS08 สำหรับ AND gate) ลากสายไฟเชื่อมต่อ VCC, GND และ Input/Output การจำลองนี้จะอ้างอิงจาก Datasheet จริง เพื่อฝึกทักษะการอ่านคู่มือ (Psychomotor & Cognitive Integration)

---

## 🛠 คำแนะนำสำหรับ AI ในการเขียนโค้ด (Technical Prompt for Web Generation)
- **Frontend Stack:** แนะนำใช้ React.js หรือ Vue.js เพื่อรองรับ State management สำหรับงาน Simulation อย่างมีประสิทธิภาพ
- **Styling:** ใช้ Tailwind CSS ในการออกแบบ UI ให้ดูทันสมัย (Modern Design) ใช้สีน้ำเงิน/เทา ให้ความรู้สึกเป็นวิศวกรรมเทคโนโลยี
- **Animation:** ใช้ Framer Motion หรือ CSS Animations สำหรับแสดงการหารสั้นและการไหลของกระแสข้อมูล (Data Flow) ในวงจรลอจิก
- **Accessibility:** รองรับ Responsive Design เพื่อให้ผู้เรียนระดับ ปวช. สามารถเข้าใช้งานผ่านสมาร์ทโฟนได้ 100%
