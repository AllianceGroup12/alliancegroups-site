document.addEventListener("DOMContentLoaded", function() {
  const forms = document.querySelectorAll('form[action^="https://formsubmit.co"]');
  
  forms.forEach(form => {
    // Prevent default formsubmit.co action
    form.removeAttribute('action');
    form.removeAttribute('method');
    
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const successMsg = form.querySelector('.form-success') || document.getElementById('formSuccess');
      
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Submitting...</span>';
      submitBtn.disabled = true;
      
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'enquiry_form_start', formId: form.id });
      }
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const FIREBASE_FUNCTION_URL = 'https://us-central1-alliancegroups-site.cloudfunctions.net/submitLead';
      
      try {
        const response = await fetch(FIREBASE_FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Network response was not ok');
        }
        
        form.reset();
        form.style.display = 'none'; // Optional: hide form
        
        if (successMsg) {
          successMsg.style.display = 'block';
        } else {
          alert('Thank you! Your request has been received.');
        }
        
        // Push conversion event to Google Tag Manager ONLY on success
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'enquiry_form_submit',
            'formId': form.id,
            'lead_id': result.id
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an issue submitting your request. Please call us directly.');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  });
});
