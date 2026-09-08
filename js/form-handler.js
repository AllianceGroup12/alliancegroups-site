document.addEventListener("DOMContentLoaded", function() {
  const FIREBASE_FUNCTION_URL = 'https://us-central1-alliance-hub-5ed2c.cloudfunctions.net/submitLead';

  // Select all forms on the page except portal-form (which manages multi-file signed URLs)
  const forms = document.querySelectorAll('form:not(#portal-form)');

  forms.forEach(form => {
    // Remove any legacy action/method
    form.removeAttribute('action');
    form.removeAttribute('method');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      const statusDiv = form.querySelector('.form-status') || form.querySelector('.form-success') || document.getElementById('formSuccess') || document.getElementById('orderSuccess');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Submitting securely...</span>';
        submitBtn.disabled = true;
      }

      if (window.dataLayer) {
        window.dataLayer.push({ event: 'enquiry_form_start', formId: form.id || 'general_form' });
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Format subject line if missing
      if (!data.subject && !data._subject) {
        if (form.id === 'compliance-shield-form') {
          data.subject = 'Compliance Shield Review Order ($395 + GST)';
        } else if (form.id === 'asbestosOrderForm') {
          data.subject = `AUasbestos Service Order — ${data.product || 'Asbestos Testing/Removal'}`;
        } else {
          data.subject = `New Website Lead — ${data.service || data.documentType || 'General Enquiry'}`;
        }
      }

      try {
        const response = await fetch(FIREBASE_FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Submission failed');
        }

        form.reset();

        if (statusDiv) {
          statusDiv.style.display = 'block';
          statusDiv.classList.add('show');
          statusDiv.innerHTML = '<div style="background:#e6fffa;color:#047857;border:1px solid #a7f3d0;padding:16px 20px;border-radius:8px;margin-top:16px;font-weight:600;font-size:0.95rem;">✓ Thank you! Your submission has been securely received (Ref #' + (result.id || 'AG-OK') + '). A member of our compliance team will contact you shortly.</div>';
        } else {
          alert('✓ Thank you! Your request has been securely received. Our team will contact you shortly.');
        }

        // Push conversion event to Google Tag Manager / Google Analytics
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'enquiry_form_submit',
            'formId': form.id || 'general_form',
            'lead_id': result.id
          });
        }
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', { 'send_to': 'AW-18006768389/lead_form_submit' });
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an issue submitting your request. Please contact us directly on 0410 942 905.');
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    });
  });
});
