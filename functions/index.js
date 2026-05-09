/**
 * Media Minds AI Group — Cloud Functions
 *
 * notifyLeadCreated:
 *   Triggered when a new document is added to the `leads` Firestore
 *   collection (the lead-capture modal on media-mindai.web.app writes here).
 *   Sends a formatted email to mediamindsaigroup@gmail.com with the lead's
 *   info, what they're looking for, source page, and a "reply directly"
 *   convenience header.
 *
 * Setup (one-time):
 *   1. Generate a Gmail App Password for mediamindsaigroup@gmail.com
 *      (https://myaccount.google.com/apppasswords — requires 2FA enabled)
 *   2. Set as a Firebase secret:
 *        firebase functions:secrets:set GMAIL_APP_PASSWORD --project qxaios
 *      (paste the 16-char password when prompted, no spaces)
 *   3. Install dependencies:
 *        cd functions && npm install
 *   4. Deploy:
 *        firebase deploy --only functions --project qxaios
 */

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const { logger } = require('firebase-functions');
const nodemailer = require('nodemailer');

// Secret reference — actual value set via `firebase functions:secrets:set`.
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD');

// Where leads are routed.
const NOTIFY_TO   = 'mediamindsaigroup@gmail.com';
const SENDER_FROM = 'mediamindsaigroup@gmail.com';
const SENDER_NAME = 'Media Minds AI — Lead Notifications';

// Human-readable interest labels (mirror LeadModal.jsx)
const INTEREST_LABELS = {
  geo_audit:    'GEO + AEO Audit',
  verification: 'Brand AI Verification',
  social_media: 'Social Media Strategy',
  campaigns:    'National Campaign / Content',
  web_dev:      'Web Design & Development',
  app_dev:      'App / SaaS Development',
  ai_systems:   'Custom AI Platform',
  web3:         'Web3 / Blockchain',
  press:        'Press / Partnership',
  other:        'Something else',
};

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderHtml(lead) {
  const interests = (lead.interests || [])
    .map((i) => INTEREST_LABELS[i] || i)
    .map(escapeHtml)
    .join(', ') || '—';

  return `<!DOCTYPE html>
<html><body style="font-family: -apple-system, system-ui, sans-serif; background: #FBFAF5; padding: 24px; color: #0B0B0B;">
  <div style="max-width: 640px; margin: 0 auto; background: white; border-radius: 12px; border: 1px solid #E8E6E0; overflow: hidden;">
    <div style="background: #0B0B0B; color: white; padding: 18px 24px; border-bottom: 3px solid #C8FF00;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #C8FF00; font-weight: 600;">
        New Lead — Media Minds AI Group
      </div>
      <div style="font-size: 22px; font-weight: 700; margin-top: 4px;">
        ${escapeHtml(lead.name || 'Unknown')}
        <span style="color: rgba(255,255,255,0.55); font-weight: 400;">· ${escapeHtml(lead.company || '—')}</span>
      </div>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
        <tr><td style="padding: 6px 0; width: 110px; color: #5C6473; font-weight: 600;">Name</td><td>${escapeHtml(lead.name || '—')}</td></tr>
        <tr><td style="padding: 6px 0; color: #5C6473; font-weight: 600;">Company</td><td>${escapeHtml(lead.company || '—')}</td></tr>
        <tr><td style="padding: 6px 0; color: #5C6473; font-weight: 600;">Email</td><td><a href="mailto:${escapeHtml(lead.email || '')}" style="color: #1D9E75;">${escapeHtml(lead.email || '—')}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #5C6473; font-weight: 600;">Phone</td><td>${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}" style="color: #1D9E75;">${escapeHtml(lead.phone)}</a>` : '—'}</td></tr>
        <tr><td style="padding: 6px 0; color: #5C6473; font-weight: 600; vertical-align: top;">Interests</td><td>${interests}</td></tr>
      </table>

      ${lead.message ? `
        <div style="margin-top: 18px; padding: 14px 16px; background: #FBFAF5; border-left: 3px solid #C8FF00; border-radius: 4px;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: #5C6473; margin-bottom: 6px;">
            What they're looking for
          </div>
          <div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(lead.message)}</div>
        </div>
      ` : ''}

      <div style="margin-top: 22px; padding-top: 16px; border-top: 1px solid #E8E6E0; font-size: 12px; color: #5C6473;">
        <div><strong>Source:</strong> ${escapeHtml(lead.source || '—')}</div>
        <div><strong>Page:</strong> ${escapeHtml(lead.page_url || '—')}</div>
        ${lead.referrer ? `<div><strong>Referrer:</strong> ${escapeHtml(lead.referrer)}</div>` : ''}
        <div style="margin-top: 8px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #8A8F9A;">
          Lead ID: ${escapeHtml(lead._id)}
        </div>
      </div>

      <div style="margin-top: 22px; display: flex; gap: 10px;">
        <a href="mailto:${escapeHtml(lead.email || '')}?subject=Re%3A%20your%20inquiry%20at%20Media%20Minds%20AI"
           style="display: inline-block; padding: 10px 18px; background: #C8FF00; color: #0B0B0B; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;">
          Reply to ${escapeHtml(lead.name || '').split(' ')[0]}
        </a>
        <a href="https://console.firebase.google.com/project/qxaios/firestore/data/~2Fleads~2F${escapeHtml(lead._id)}"
           style="display: inline-block; padding: 10px 18px; background: white; color: #0B0B0B; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid #E8E6E0;">
          View in Firebase
        </a>
      </div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 18px; font-size: 11px; color: #8A8F9A; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em;">
    Media Minds AI Group · Lead capture · Auto-routed from media-mindai.web.app
  </div>
</body></html>`;
}

function renderText(lead) {
  const interests = (lead.interests || []).map((i) => INTEREST_LABELS[i] || i).join(', ') || '—';
  return `NEW LEAD — Media Minds AI Group

Name:      ${lead.name || '—'}
Company:   ${lead.company || '—'}
Email:     ${lead.email || '—'}
Phone:     ${lead.phone || '—'}
Interests: ${interests}

What they're looking for:
${lead.message || '(none provided)'}

—
Source: ${lead.source || '—'}
Page:   ${lead.page_url || '—'}
Lead ID: ${lead._id}

Reply directly to ${lead.email || 'the address above'} to start the conversation.
`;
}

exports.notifyLeadCreated = onDocumentCreated(
  {
    document: 'leads/{leadId}',
    region: 'us-central1',
    secrets: [GMAIL_APP_PASSWORD],
  },
  async (event) => {
    const snap = event.data;
    if (!snap) {
      logger.warn('No data on leads/onCreate event');
      return;
    }
    const lead = { _id: snap.id, ...(snap.data() || {}) };
    logger.info(`New lead: ${lead.email} (${lead.company})`);

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SENDER_FROM,
          pass: GMAIL_APP_PASSWORD.value(),
        },
      });
    } catch (e) {
      logger.error('Failed to create SMTP transporter', e);
      return;
    }

    const subject = `New Lead — ${lead.name || 'Unknown'} · ${lead.company || '—'}`;

    try {
      await transporter.sendMail({
        from: `"${SENDER_NAME}" <${SENDER_FROM}>`,
        to: NOTIFY_TO,
        replyTo: lead.email || undefined,
        subject,
        text: renderText(lead),
        html: renderHtml(lead),
      });
      logger.info(`Lead notification sent to ${NOTIFY_TO} for ${lead.email}`);
    } catch (e) {
      logger.error('Failed to send lead notification email', e);
      throw e;
    }
  },
);
