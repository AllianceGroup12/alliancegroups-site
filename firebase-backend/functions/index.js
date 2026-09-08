const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Declare Firebase secrets explicitly for v2 Cloud Functions
const smtpUser = defineSecret("SMTP_USER");
const smtpPass = defineSecret("SMTP_PASS");

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/csv"
];

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

/**
 * submitLead: Secret-bound HTTP function for processing intake leads & sending email notifications.
 */
exports.submitLead = onRequest(
  { secrets: [smtpUser, smtpPass], cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { name, email, phone, service, message, _subject, company, siteAddress, documentType, urgency } = req.body;

      // 1. Persist to Firestore
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

      // 2. Transporter created with explicitly bound secrets
      const mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser.value(),
          pass: smtpPass.value(),
        },
      });

      const mailOptions = {
        from: '"Alliance Groups Lead System" <noreply@alliancegroups.com.au>',
        to: "info@alliancegroups.com.au",
        subject: _subject ? `New Alliance Enquiry - ${_subject} - ${leadRef.id}` : `New Alliance Enquiry - ${service || 'General'} - ${leadRef.id}`,
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
        console.log("New lead email sent successfully");
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        await leadRef.update({ notification_status: "failed", notification_error: emailError.message });
      }

      return res.status(200).json({ success: true, message: "Lead submitted successfully", id: leadRef.id });
    } catch (error) {
      console.error("Error processing lead:", error);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

/**
 * generateUploadUrl: Secure signed URL generator with strict validation & path isolation.
 */
exports.generateUploadUrl = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { fileName, contentType, fileSize, leadId } = req.body;

      if (!leadId || !fileName || !contentType) {
        return res.status(400).json({ error: "Missing required fields: leadId, fileName, and contentType are required." });
      }

      // Validate leadId format
      if (typeof leadId !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(leadId)) {
        return res.status(400).json({ error: "Invalid submission ID format." });
      }

      // Verify submission exists in Firestore
      const leadDoc = await admin.firestore().collection("leads").doc(leadId).get();
      if (!leadDoc.exists) {
        return res.status(404).json({ error: "Submission record not found." });
      }

      // Validate allowed MIME types
      if (!ALLOWED_MIME_TYPES.includes(contentType)) {
        return res.status(400).json({ error: `File type ${contentType} is not permitted.` });
      }

      // Validate file size (max 25MB)
      if (fileSize && (typeof fileSize !== "number" || fileSize > MAX_FILE_SIZE_BYTES || fileSize <= 0)) {
        return res.status(400).json({ error: "File size exceeds maximum limit of 25MB." });
      }

      // Server-side object path generation (isolated under submission ID)
      const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_").substring(0, 100);
      const uniqueId = admin.firestore().collection("leads").doc().id;
      const objectName = `compliance-uploads/${leadId}/${Date.now()}_${uniqueId}_${sanitizedFileName}`;

      const bucket = admin.storage().bucket();
      const file = bucket.file(objectName);

      // Expiration set to 5 minutes (quick expiration)
      const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 5 * 60 * 1000,
        contentType: contentType,
      };

      const [url] = await file.getSignedUrl(options);

      // Track upload intent in Firestore
      await leadDoc.ref.collection("documents").add({
        fileName: sanitizedFileName,
        objectName: objectName,
        contentType: contentType,
        status: "pending_upload",
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(200).json({ uploadUrl: url, objectName: objectName, expiresAt: Date.now() + 5 * 60 * 1000 });
    } catch (error) {
      console.error("Error generating upload URL:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
