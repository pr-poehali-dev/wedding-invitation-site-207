import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Получает ответ гостя из анкеты и отправляет письмо на почту невесты."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    attending = body.get('attending', '')
    salad = body.get('salad', '—')
    dish = body.get('dish', '—')

    if not name or not attending:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и ответ обязательны'}, ensure_ascii=False)
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'sanuakv@gmail.com'
    to_email = 'sanuakv@gmail.com'

    attending_text = 'Буду' if attending == 'yes' else 'Не смогу'

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #2c2216;">
      <h2 style="font-size: 24px; font-weight: normal; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 24px;">Новый ответ на анкету</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0; color: #8a7a6a; width: 140px;">Имя</td><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0;">{name}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0; color: #8a7a6a;">Телефон</td><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0;">{phone or '—'}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0; color: #8a7a6a;">Присутствие</td><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0;"><strong>{attending_text}</strong></td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0; color: #8a7a6a;">Салат</td><td style="padding: 12px 0; border-bottom: 1px solid #e8ddd0;">{salad}</td></tr>
        <tr><td style="padding: 12px 0; color: #8a7a6a;">Основное блюдо</td><td style="padding: 12px 0;">{dish}</td></tr>
      </table>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Ответ на приглашение — {name}'
    msg['From'] = from_email
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.ehlo()
        server.starttls()
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }