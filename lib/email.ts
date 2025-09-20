import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email service not configured. Skipping email notification.');
      return false;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

export const sendNewComplaintNotification = async (complaint: any) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@company.com';
  
  const subject = `New Complaint Submitted: ${complaint.title}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #e1e5e9; padding-bottom: 10px;">
        New Complaint Received - ComplainX
      </h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #495057;">${complaint.title}</h3>
        
        <div style="margin: 15px 0;">
          <strong>Category:</strong> 
          <span style="background: #e9ecef; padding: 4px 8px; border-radius: 4px;">${complaint.category}</span>
        </div>
        
        <div style="margin: 15px 0;">
          <strong>Priority:</strong> 
          <span style="background: ${getPriorityColor(complaint.priority)}; color: white; padding: 4px 8px; border-radius: 4px;">
            ${complaint.priority}
          </span>
        </div>
        
        <div style="margin: 15px 0;">
          <strong>Submitted:</strong> ${new Date(complaint.dateSubmitted).toLocaleDateString()}
        </div>
        
        <div style="margin: 15px 0;">
          <strong>Description:</strong>
          <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
            ${complaint.description}
          </p>
        </div>
        
        ${complaint.userEmail ? `
          <div style="margin: 15px 0;">
            <strong>User Email:</strong> ${complaint.userEmail}
          </div>
        ` : ''}
      </div>
      
      <p style="color: #6c757d; font-size: 14px;">
        Please log in to the admin dashboard to manage this complaint.
      </p>
    </div>
  `;

  return await sendEmail({ to: adminEmail, subject, html });
};

export const sendStatusUpdateNotification = async (complaint: any, oldStatus: string) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@company.com';
  
  const subject = `Complaint Status Updated: ${complaint.title}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #e1e5e9; padding-bottom: 10px;">
        Complaint Status Updated - ComplainX
      </h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #495057;">${complaint.title}</h3>
        
        <div style="margin: 15px 0;">
          <strong>Status Changed:</strong> 
          <span style="background: #dc3545; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">
            ${oldStatus}
          </span>
          →
          <span style="background: ${getStatusColor(complaint.status)}; color: white; padding: 4px 8px; border-radius: 4px;">
            ${complaint.status}
          </span>
        </div>
        
        <div style="margin: 15px 0;">
          <strong>Updated:</strong> ${new Date().toLocaleDateString()}
        </div>
        
        <div style="margin: 15px 0;">
          <strong>Category:</strong> ${complaint.category}
        </div>
        
        <div style="margin: 15px 0;">
          <strong>Priority:</strong> 
          <span style="background: ${getPriorityColor(complaint.priority)}; color: white; padding: 4px 8px; border-radius: 4px;">
            ${complaint.priority}
          </span>
        </div>
      </div>
      
      <p style="color: #6c757d; font-size: 14px;">
        This is an automated notification of the status update.
      </p>
    </div>
  `;

  return await sendEmail({ to: adminEmail, subject, html });
};

function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'high': return '#f43f5e';
    case 'medium': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#6c757d';
  }
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending': return '#f59e0b';
    case 'in progress': return '#14b8a6';
    case 'resolved': return '#10b981';
    default: return '#6c757d';
  }
}