import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
const {
  fullName,
  email,
  phone,
  companyName,
  jobTitle,
  message,
  lang,
} = await request.json()
    // Validate email
if (!email || !email.includes('@')) {
  return NextResponse.json(
    { error: 'Invalid email address' },
    { status: 400 }
  )
}

if (!fullName) {
  return NextResponse.json(
    { error: 'Full name is required' },
    { status: 400 }
  )
}



    // إنشاء transporter مع تفعيل debug
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true فقط لـ 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      logger: true,   // لتسجيل كل خطوات الاتصال
      debug: true,    // لعرض رسائل الأخطاء من Gmail
    })

    await transporter.verify()
      .then(() => console.log('✅ SMTP connection successful'))
      .catch(err => {
        console.error('❌ SMTP connection failed:', err)
        throw err   // إذا فشل الاتصال نوقف الإرسال
      })
    // Email contentn
    const isArabic = lang === 'ar'
    const subject = isArabic
      ? 'طلب جديد من صفحة Main - Savvy'
      : 'New Subscription Main- Savvy'
const htmlContent = isArabic
  ? `
  <div dir="rtl" style="font-family: Arial; max-width:600px; margin:auto">
    <h2 style="color:#2563eb">طلب تواصل جديد 📩</h2>

    <p><strong>الاسم الكامل:</strong> ${fullName}</p>
    <p><strong>البريد الإلكتروني:</strong> ${email}</p>
    <p><strong>رقم الهاتف:</strong> ${phone || '-'}</p>
    <p><strong>اسم الشركة:</strong> ${companyName || '-'}</p>
    <p><strong>المسمى الوظيفي:</strong> ${jobTitle || '-'}</p>

    <hr />

    <p><strong>الرسالة:</strong></p>
    <p>${message || 'لا توجد رسالة'}</p>

    <hr />
    <p style="font-size:13px;color:#666">
      التاريخ: ${new Date().toLocaleDateString('ar-SA')} <br/>
      الوقت: ${new Date().toLocaleTimeString('ar-SA')}
    </p>
  </div>
  `
      : `
  <div style="font-family: Arial; max-width:600px; margin:auto">
    <h2 style="color:#2563eb">New Contact Request 📩</h2>

    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || '-'}</p>
    <p><strong>Company:</strong> ${companyName || '-'}</p>
    <p><strong>Job Title:</strong> ${jobTitle || '-'}</p>

    <hr />

    <p><strong>Message:</strong></p>
    <p>${message || 'No message provided'}</p>

    <hr />
    <p style="font-size:13px;color:#666">
      Date: ${new Date().toLocaleDateString('en-US')} <br/>
      Time: ${new Date().toLocaleTimeString('en-US')}
    </p>
  </div>
`

    // قائمة المستقبلين
    const recipients = [
      process.env.RECIPIENT_EMAIL || '',
      // 'modar.alfaleh@savvyworld.ai',
      // 'raad.a@savvyworld.ai',
      // 'rami.a@savvyworld.ai',
      // 'rashad.walid@savvyworld.ai',
      'sayf.m@savvyworld.ai',
       'issam.p@savvyworld.ai'
      // 'tamara.h@savvyworld.ai',
      // 'mansour.m@savvyworld.ai'
    ].join(', ')

    // Send email
    await transporter.sendMail({
      from: `"Savvy main page" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: subject,
      html: htmlContent,
      text: `New subscription: ${email} (Language: ${lang})`,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
