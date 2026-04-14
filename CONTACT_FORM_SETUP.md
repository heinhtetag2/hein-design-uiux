# Contact Form Email Setup Guide

The contact form needs to send submissions to **heincise@gmail.com**. Here are your options:

## Option 1: EmailJS (Recommended - Free & Easy)

EmailJS allows sending emails directly from the frontend without a backend.

### Setup Steps:

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com
   - Sign up for free account
   - Verify your email

2. **Add Email Service**
   - Go to Email Services
   - Click "Add New Service"
   - Select Gmail
   - Connect your Gmail account (heincise@gmail.com)

3. **Create Email Template**
   - Go to Email Templates
   - Click "Create New Template"
   - Template ID: `contact_form`
   - Template content:
   ```
   Subject: New Contact Form Submission from {{from_name}}
   
   Name: {{from_name}}
   Email: {{from_email}}
   How they heard: {{how_heard}}
   Company Stage: {{company_stage}}
   
   Message:
   {{message}}
   
   Newsletter Signup: {{newsletter}}
   ```

4. **Get Credentials**
   - Public Key: Found in Account settings
   - Service ID: From Email Services page
   - Template ID: `contact_form`

5. **Install EmailJS**
   ```bash
   npm install @emailjs/browser
   ```

6. **Update Contact.tsx**

Replace the form section (lines 46-106) with:

```typescript
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner'; // Already installed

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    howHeard: '',
    companyStage: 'Select One',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.howHeard || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',        // Replace with your service ID
        'YOUR_TEMPLATE_ID',       // Replace with your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          how_heard: formData.howHeard,
          company_stage: formData.companyStage,
          message: formData.message,
          newsletter: formData.newsletter ? 'Yes' : 'No',
          to_email: 'heincise@gmail.com' // Your email
        },
        'YOUR_PUBLIC_KEY'         // Replace with your public key
      );

      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        howHeard: '',
        companyStage: 'Select One',
        message: '',
        newsletter: false
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // ... existing JSX
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full">
      <div className="flex flex-col gap-4 group">
        <label className="text-[14px] text-white/70 uppercase tracking-widest font-light">Name*</label>
        <input 
          type="text" 
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors text-[18px] font-light placeholder:text-white/40"
          required
        />
      </div>

      <div className="flex flex-col gap-4 group">
        <label className="text-[14px] text-white/70 uppercase tracking-widest font-light">Email*</label>
        <input 
          type="email" 
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors text-[18px] font-light placeholder:text-white/40"
          required
        />
      </div>

      <div className="flex flex-col gap-4 group">
        <label className="text-[14px] text-white/70 uppercase tracking-widest font-light">How did you hear of us?*</label>
        <input 
          type="text" 
          placeholder="Enter your answer"
          value={formData.howHeard}
          onChange={(e) => setFormData({...formData, howHeard: e.target.value})}
          className="bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors text-[18px] font-light placeholder:text-white/40"
          required
        />
      </div>

      <div className="flex flex-col gap-4 group">
        <label className="text-[14px] text-white/70 uppercase tracking-widest font-light">What stage is your company?</label>
        <div className="relative border-b border-white/10 py-2 cursor-pointer group-hover:border-white transition-colors">
          <select 
            value={formData.companyStage}
            onChange={(e) => setFormData({...formData, companyStage: e.target.value})}
            className="bg-transparent w-full appearance-none outline-none text-[18px] font-light cursor-pointer pr-8"
          >
            <option className="bg-black">Select One</option>
            <option className="bg-black">Early Stage</option>
            <option className="bg-black">Growth</option>
            <option className="bg-black">Enterprise</option>
          </select>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
            <ChevronDown className="size-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 group md:col-span-2">
        <label className="text-[14px] text-white/70 uppercase tracking-widest font-light">Message*</label>
        <textarea 
          placeholder="Type your message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors text-[18px] font-light placeholder:text-white/40 resize-none"
          required
        />
      </div>

      <div className="md:col-span-2 flex flex-row items-center justify-between pt-8">
        <div className="flex items-center gap-4">
          <input 
            type="checkbox" 
            id="newsletter" 
            checked={formData.newsletter}
            onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
            className="size-5 rounded border-white/20 bg-transparent accent-white cursor-pointer" 
          />
          <label htmlFor="newsletter" className="text-[16px] text-white/60 font-light cursor-pointer">
            Signup to Newsletter
          </label>
        </div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-white/10 text-white px-6 h-[32px] rounded-full font-light text-[14px] hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
    // ... rest of JSX
  );
}
```

7. **Add Toaster Component**

In `/src/app/App.tsx`, add at the top:
```typescript
import { Toaster } from 'sonner';

// Inside return, before closing div:
<Toaster position="bottom-right" theme="dark" />
```

---

## Option 2: Formspree (Easiest - No Code)

1. Go to https://formspree.io
2. Sign up for free
3. Create new form
4. Get your form endpoint (e.g., `https://formspree.io/f/abcdefg`)
5. Set email to: heincise@gmail.com

Update Contact.tsx form tag:
```typescript
<form 
  action="https://formspree.io/f/YOUR_FORM_ID" 
  method="POST"
  className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full"
>
  {/* Add name attributes to all inputs */}
  <input type="text" name="name" ... />
  <input type="email" name="email" ... />
  <input type="text" name="how_heard" ... />
  <select name="company_stage" ... />
  <textarea name="message" ... />
  <input type="checkbox" name="newsletter" ... />
</form>
```

---

## Option 3: Custom Backend API

If you want more control, create a simple Node.js backend:

1. **Create API Server** (separate project)
   ```bash
   mkdir contact-api
   cd contact-api
   npm init -y
   npm install express nodemailer cors dotenv
   ```

2. **Create server.js**
   ```javascript
   const express = require('express');
   const nodemailer = require('nodemailer');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS // Use App Password, not regular password
     }
   });

   app.post('/api/contact', async (req, res) => {
     const { name, email, howHeard, companyStage, message, newsletter } = req.body;

     const mailOptions = {
       from: process.env.EMAIL_USER,
       to: 'heincise@gmail.com',
       subject: `New Contact Form Submission from ${name}`,
       html: `
         <h3>New Contact Form Submission</h3>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>How they heard:</strong> ${howHeard}</p>
         <p><strong>Company Stage:</strong> ${companyStage}</p>
         <p><strong>Message:</strong></p>
         <p>${message}</p>
         <p><strong>Newsletter:</strong> ${newsletter ? 'Yes' : 'No'}</p>
       `
     };

     try {
       await transporter.sendMail(mailOptions);
       res.json({ success: true, message: 'Email sent successfully' });
     } catch (error) {
       console.error(error);
       res.status(500).json({ success: false, message: 'Failed to send email' });
     }
   });

   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

3. **Create .env file**
   ```
   EMAIL_USER=heincise@gmail.com
   EMAIL_PASS=your_app_password_here
   PORT=3001
   ```

4. **Get Gmail App Password**
   - Go to Google Account settings
   - Security → 2-Step Verification → App Passwords
   - Generate new app password
   - Use this password in .env

5. **Update Contact.tsx**
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);

     try {
       const response = await fetch('http://localhost:3001/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });

       if (response.ok) {
         toast.success('Message sent successfully!');
         // Reset form
       } else {
         toast.error('Failed to send message');
       }
     } catch (error) {
       toast.error('Network error');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

---

## Recommendation

**For quick deployment: Use EmailJS (Option 1)**
- ✅ No backend needed
- ✅ Free tier is generous
- ✅ Works immediately
- ✅ Easy to implement
- ❌ Exposes API key in frontend (use domain restrictions)

**For simplest setup: Use Formspree (Option 2)**
- ✅ Zero code changes needed
- ✅ Just add action URL
- ✅ Handles everything
- ❌ Less customization

**For production/scale: Custom Backend (Option 3)**
- ✅ Full control
- ✅ More secure
- ✅ Can add database
- ❌ More complex
- ❌ Requires server hosting

---

## Security Notes

- Never commit API keys or passwords to Git
- Use environment variables for sensitive data
- Enable domain restrictions in EmailJS
- Use Gmail App Passwords, not regular passwords
- Consider rate limiting for production

---

## Testing

After implementation:
1. Fill out the form
2. Submit
3. Check heincise@gmail.com inbox
4. Verify all fields are present
5. Test error cases (empty fields, etc.)

Good luck! 🚀
