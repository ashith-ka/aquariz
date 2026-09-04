
    // Year
    document.getElementById('aqYear').textContent = new Date().getFullYear();

    // Drawer toggle
    const aquarizMenuToggle = document.getElementById('aquarizMenuToggle');
    const aquarizDrawerClose = document.getElementById('aquarizDrawerClose');
    const aquarizDrawer = document.getElementById('aquarizDrawer');
    const fNavItems = document.querySelectorAll('.drawer-item');

    function openDrawer() { aquarizDrawer.classList.add('open'); aquarizDrawer.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; aquarizMenuToggle.querySelector('i').classList.remove('fa-bars'); aquarizMenuToggle.querySelector('i').classList.add('fa-xmark'); }
    function closeDrawer() { aquarizDrawer.classList.remove('open'); aquarizDrawer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; aquarizMenuToggle.querySelector('i').classList.remove('fa-xmark'); aquarizMenuToggle.querySelector('i').classList.add('fa-bars'); }
    if (aquarizMenuToggle) aquarizMenuToggle.addEventListener('click', openDrawer);
    if (aquarizDrawerClose) aquarizDrawerClose.addEventListener('click', closeDrawer);
    fNavItems.forEach(item => item.addEventListener('click', closeDrawer));

    // Toast
    function showToast(msg) {
      const toast = document.getElementById('toastAquariz');
      document.getElementById('toastAquarizMsg').textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Copy GSTIN
    function copyAquarizGstin() {
      const gstin = '32ACCFA6985C1ZL';
      navigator.clipboard.writeText(gstin).then(() => showToast('GSTIN copied!')).catch(() => showToast('GSTIN: ' + gstin));
    }

    // Contact form
    
    function sendAquarizEmail() {
      const name = document.getElementById('aqName').value.trim();
      const phone = document.getElementById('aqPhone').value.trim();
      const message = document.getElementById('aqMessage').value.trim();
      const subject = encodeURIComponent('Aquariz Web Inquiry' + (name ? ' - ' + name : ''));
      const body = encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\nMessage: ' + message + '\n\nSent from Aquariz Website');
      window.location.href = 'mailto:aquariz.official@gmail.com?subject=' + subject + '&body=' + body;
    }
    function submitAquarizContact() {
      const name = document.getElementById('aqName').value.trim();
      const phone = document.getElementById('aqPhone').value.trim();
      const message = document.getElementById('aqMessage').value.trim();
      if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
      let msg = `Hi Aquariz team! 👋 This is ${name}.\n\n`;
      if (message) {
        msg += `${message}\n\n`;
      } else {
        msg += `I was browsing your website and would love to connect with your team.\n\n`;
      }
      msg += `My contact number: ${phone}\nLooking forward to hearing from you!`;
      window.open(`https://wa.me/916238796383?text=${encodeURIComponent(msg)}`, '_blank');
    }
  