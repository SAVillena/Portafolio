// Vercel Serverless Function (Node.js)
export default async function handler(request, response) {
    // Enable CORS for testing
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = request.body;

        if (!name || !email || !message) {
            return response.status(400).json({ error: 'Missing required fields' });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return response.status(500).json({ error: 'Resend API key is not configured in Vercel dashboard' });
        }

        // Diseño premium para el correo electrónico en formato HTML oscuro
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Nuevo mensaje de contacto</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                        background-color: #020617;
                        color: #f1f5f9;
                        margin: 0;
                        padding: 40px 20px;
                    }
                    .card {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #0f172a;
                        border: 1px solid #1e293b;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    }
                    .header {
                        background-color: #3b82f6;
                        background-image: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
                        padding: 28px;
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 20px;
                        font-weight: 900;
                        color: #ffffff;
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                    }
                    .content {
                        padding: 32px 24px;
                    }
                    .field {
                        margin-bottom: 24px;
                    }
                    .label {
                        font-size: 11px;
                        font-weight: 700;
                        color: #64748b;
                        text-transform: uppercase;
                        letter-spacing: 0.1em;
                        margin-bottom: 6px;
                    }
                    .value {
                        font-size: 15px;
                        color: #e2e8f0;
                        line-height: 1.6;
                    }
                    .value-highlight {
                        font-size: 16px;
                        font-weight: 700;
                        color: #ffffff;
                    }
                    .footer {
                        padding: 16px 24px;
                        background-color: #090d16;
                        border-top: 1px solid #1e293b;
                        text-align: center;
                        font-size: 12px;
                        color: #475569;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="header">
                        <h1>Nuevo Mensaje de Contacto</h1>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Nombre del Contacto</div>
                            <div class="value value-highlight">${name}</div>
                        </div>
                        <div class="field">
                            <div class="label">Correo Electrónico</div>
                            <div class="value">
                                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">${email}</a>
                            </div>
                        </div>
                        <div class="field">
                            <div class="label">Asunto</div>
                            <div class="value" style="font-weight: 600; color: #ffffff;">${subject || 'Sin Asunto'}</div>
                        </div>
                        <div class="field" style="margin-bottom: 0;">
                            <div class="label">Mensaje</div>
                            <div class="value" style="background-color: #020617; border: 1px solid #1e293b; padding: 18px; border-radius: 10px; white-space: pre-wrap; color: #e2e8f0;">${message}</div>
                        </div>
                    </div>
                    <div class="footer">
                        Enviado desde tu Portafolio Profesional • <a href="https://sergiovillena.vercel.app" style="color: #475569; text-decoration: none;">sergiovillena.vercel.app</a>
                    </div>
                </div>
            </body>
            </html>
        `;

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Portafolio <onboarding@resend.dev>',
                to: 'sergio.villena.vergara@gmail.com',
                reply_to: email, // Al responder el correo en tu bandeja, le responderás al visitante automáticamente!
                subject: `Contacto: ${subject || 'Nuevo mensaje'} de ${name}`,
                html: htmlContent
            })
        });

        const resendResult = await resendResponse.json();

        if (!resendResponse.ok) {
            console.error('Resend API Error:', resendResult);
            return response.status(resendResponse.status).json({ error: resendResult.message || 'Error sending email' });
        }

        return response.status(200).json({ success: true, message: 'Email sent successfully', id: resendResult.id });
    } catch (error) {
        console.error('Serverless Function Error:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}
