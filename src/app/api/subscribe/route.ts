import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email, lang } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
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
    // Email content
    const isArabic = lang === 'ar'
    const subject = isArabic
      ? 'طلب جديد من صفحة Coming Soon - Savvy'
      : 'New Subscription from Coming Soon Page - Savvy'

    const htmlContent = isArabic
      ? `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px;">طلب اهتمام جديد 📧</h2>
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
              لقد تلقينا إبداء اهتمام من أحد العملاء. عنوان بريده الإلكتروني هو:
            </p>
            <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-size: 18px; color: #1e40af; font-weight: bold;">
                ${email}
              </p>
            </div>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              اللغة المختارة: العربية 🇸🇦
            </p>
            <p style="font-size: 14px; color: #666;">
              التاريخ: ${new Date().toLocaleDateString('ar-SA')}
            </p>
            <p style="font-size: 14px; color: #666;">
              الوقت: ${new Date().toLocaleTimeString('ar-SA')}
            </p>
          </div>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px;">New Interest Registration 📧</h2>
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
              We have received an expression of interest from a customer. Their email address is:
            </p>
            <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-size: 18px; color: #1e40af; font-weight: bold;">
                ${email}
              </p>
            </div>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              Language: English 🇬🇧
            </p>
            <p style="font-size: 14px; color: #666;">
              Date: ${new Date().toLocaleDateString('en-US')}
            </p>
            <p style="font-size: 14px; color: #666;">
              Time: ${new Date().toLocaleTimeString('en-US')}
            </p>
          </div>
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
      from: `"Savvy Coming Soon" <${process.env.SMTP_USER}>`,
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
