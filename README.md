# 🌌 AI-Powered Astrology Prediction System

## 📘 Project Description
This project is a fully automated astrology prediction platform that collects user birth details through a custom web form and sends them to an n8n workflow. The workflow generates personalized astrology predictions using an AI model (Groq/OpenAI) and delivers the results to the user via email.  
It provides a smooth, modern UI and a complete automation pipeline from form submission to email delivery.

---

## 🏗️ Architecture Overview

<img width="1619" height="496" alt="ss" src="https://github.com/user-attachments/assets/f89913cb-da67-40ee-9afe-f5850ce23ab8" />


This architecture uses a simple flow:

1. **Frontend Website**  
   - Collects user birth details  
   - Sends data to n8n Webhook using Fetch API  

2. **n8n Workflow Automation**  
   - Webhook receives data  
   - Set/Edit Fields node formats and prepares AI prompt  
   - Groq/OpenAI node generates prediction text  
   - Gmail node sends prediction email to user  

3. **User**  
   - Receives personalized astrology prediction in their inbox  

---

## 🔄 Frontend → n8n Data Flow Explanation

### **1. User Form Submission**
The frontend HTML form collects:
- Name  
- DOB & Time  
- Place of Birth  
- Gender  
- Focus Area  
- User Question  
- Email Address  

JavaScript sends this data to the n8n Webhook:

```js
fetch("https://ramsankar.app.n8n.cloud/webhook/astro-form", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});

```

### **2. n8n Webhook Trigger**

Receives JSON payload and starts the workflow.

### **3. Edit Fields / Set Node**

Extracts user inputs and constructs a structured prompt for the AI model.

### **4. AI Model Node (Groq/OpenAI)**

Creates a detailed, personalized astrology prediction based on the data.

### **5. Gmail Node**

Formats the email and sends the prediction to the user's email address.

## 🤖 AI Usage Explanation

The AI model receives a structured prompt such as:

Name:<br>
DOB: <br>
Time of Birth: <br>
Place of Birth: <br>
Gender:<br>
Focus Area: <br>
User Question: <br>

Generate a detailed astrology prediction.


The AI then produces:

- Personality traits

- Planet/astrological influences

- Focus-area specific insights

- Answer to the user’s question

- This is returned to n8n and used in the email.

### 🧩 Known Limitations and Assumptions
Limitations

- Email delivery depends on Gmail API limits

- Workflow fails if n8n server is down

- No database: data is not saved anywhere

- AI predictions are not real astrology, only text-based interpretations

- Invalid email addresses cannot receive results

### Assumptions

- Users enter correct birth details

- AI API key is active and valid

- Gmail node is properly authenticated

- Webhook URL remains unchanged and public

- Time/date formats are provided correctly


# Check out website:

https://ai-astrology-prediction.netlify.app/
