# !/usr/bin/env python
import requests
import json
import urllib3
from weasyprint import HTML
import os
import pandas as pd
from datetime import datetime
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Template, Environment, FileSystemLoader
import sys
import base64
import mimetypes

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

KEY = '9ac264a8722e397e64eea67d415dd86d-4de08e90-cbfb94f6'
DOMAIN = 'opussoft.net'
date_format = "%Y-%m-%d %H:%M:%S"

def send(frm: str, to: str, subject: str, text: str, attachment: list = None) -> dict:
    files = []
    if (attachment):
        for x in attachment:
            files.append(('attachment', open(x, 'rb')))
    data = {
        'from': frm,
        'to': to,
        'subject': subject,
        'html': text
        # 'text': text
    }
    url = 'https://api.mailgun.net/v3/{}/messages'.format(DOMAIN)
    r = requests.post(
        url,
        auth=('api', KEY),
        data=data,
        files=files,
        verify=False
    )
    for x in files:
        x[1].close()
    return r.text

nama = input('Nama customer: ')
email = input('Email customer: ')

message = """
<body style="font-family: Arial, sans-serif; margin: 20px; color: #333;">
    
    <p>Yth. {},</p>

    <p>Kami ingin memaklumkan bahawa pembayaran anda telah berjaya disahkan. Terima kasih kerana memilih Synthera! Anda kini boleh terus mengakses dashboard kami dan mula menikmati perkhidmatan yang tersedia.</p>

    <p><a href="https://synthera.vercel.app/dashboard" style="color: #007bff; text-decoration: none; font-weight: bold;">Akses Dashboard Synthera</a></p>

    <p>Sekiranya anda mempunyai sebarang pertanyaan atau memerlukan bantuan lanjut, sila jangan teragak-agak untuk menghubungi kami.</p>

    <p>Terima kasih kerana menjadi sebahagian daripada Synthera!</p>

    <p>Salam hormat,</p>
    <p>Synthera</p>
</body>
""".format(nama)

send('Admin Synthera <synthera@perkeso.gov.my>', email, 'Pembayaran Anda Telah Disahkan', message)