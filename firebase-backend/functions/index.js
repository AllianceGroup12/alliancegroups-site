const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// Configure Nodemailer transporter using only environment variables
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.submitLead = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { name, email, phone, service, message, _subject, company, siteAddress, documentType, urgency } = req.body;

      // 1. Persist to Firestore first
      const leadRef = await admin.firestore().collection("leads").add({
        name: name || "",
        company: company || "",
        email: email || "",
        phone: phone || "",
        service: service || "",
        siteAddress: siteAddress || "",
        documentType: documentType || "",
        urgency: urgency || "",
        message: message || "",
        subject: _subject || "New Website Lead",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: "new",
        notification_status: "pending"
      });

      // 2. Notify second via email
      const mailOptions = {
        from: '"Alliance Groups Lead System" <noreply@alliancegroups.com.au>',
        to: "info@alliancegroups.com.au",
        subject: _subject ? `New Alliance Enquiry - ${_subject} - ${leadRef.id}` : `New Alliance Enquiry - ${service} - ${leadRef.id}`,
        text: `
          New Lead Received:
          
          Name: ${name}
          Company: ${company}
          Email: ${email}
          Phone: ${phone}
          Service/Doc Type: ${service || documentType}
          Site Address: ${siteAddress}
          Urgency: ${urgency}
          
          Message/Description:
          ${message}
          
          Lead ID: ${leadRef.id}
        `,
      };

      try {
        await mailTransport.sendMail(mailOptions);
        await leadRef.update({ notification_status: "sent" });
        console.log("New lead email sent");
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        await leadRef.update({ notification_status: "failed", notification_error: emailError.message });
      }

      return res.status(200).json({ success: true, message: "Lead submitted successfully", id: leadRef.id });
    } catch (error) {
      console.error("Error processing lead:", error);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
});

exports.generateUploadUrl = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { fileName, contentType, leadId } = req.body;
      
      if (!leadId || !fileName) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Verify lead exists
      const leadDoc = await admin.firestore().collection("leads").doc(leadId).get();
      if (!leadDoc.exists) {
         return res.status(404).json({ error: "Lead not found" });
      }

      const bucket = admin.storage().bucket();
      const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const objectName = `compliance-uploads/${leadId}/${Date.now()}_${safeFileName}`;
      const file = bucket.file(objectName);

      const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: contentType,
      };

      const [url] = await file.getSignedUrl(options);

      // Record metadata intent
      await leadDoc.ref.collection("documents").add({
        fileName: safeFileName,
        objectName: objectName,
        status: "uploading",
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(200).json({ uploadUrl: url, objectName: objectName });
    } catch (error) {
      console.error("Error generating signed URL:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
