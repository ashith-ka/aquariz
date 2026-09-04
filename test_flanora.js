
    document.getElementById('fYear').textContent = new Date().getFullYear();

    // Mobile Drawer Toggle
    const flanoraMenuToggle = document.getElementById('flanoraMenuToggle');
    const flanoraDrawerClose = document.getElementById('flanoraDrawerClose');
    const flanoraDrawer = document.getElementById('flanoraDrawer');
    const fNavItems = document.querySelectorAll('.f-nav-item');

    function openFlanoraDrawer() {
      flanoraDrawer.classList.add('open');
      flanoraDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      flanoraMenuToggle.querySelector('i').classList.remove('fa-bars');
      flanoraMenuToggle.querySelector('i').classList.add('fa-xmark');
    }

    function closeFlanoraDrawer() {
      flanoraDrawer.classList.remove('open');
      flanoraDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      flanoraMenuToggle.querySelector('i').classList.remove('fa-xmark');
      flanoraMenuToggle.querySelector('i').classList.add('fa-bars');
    }

    if (flanoraMenuToggle) flanoraMenuToggle.addEventListener('click', openFlanoraDrawer);
    if (flanoraDrawerClose) flanoraDrawerClose.addEventListener('click', closeFlanoraDrawer);
    fNavItems.forEach(item => item.addEventListener('click', closeFlanoraDrawer));

    // Toast
    const toastFlanora = document.getElementById('toastFlanora');
    const toastFlanoraMsg = document.getElementById('toastFlanoraMsg');

    function showFlanoraToast(msg) {
      toastFlanoraMsg.textContent = msg;
      toastFlanora.classList.add('show');
      setTimeout(() => {
        toastFlanora.classList.remove('show');
      }, 3000);
    }

    function copyFlanoraGstin() {
      const gstin = '32ACCFA6985C1ZL';
      navigator.clipboard.writeText(gstin).then(() => {
        showFlanoraToast('GSTIN: ' + gstin + ' copied!');
      }).catch(() => {
        showFlanoraToast('GSTIN: ' + gstin);
      });
    }

    // Interactive Pack & Yield Selector
    const selectedPacks = {
      'card-gg': '200g PET Bottle',
      'card-garlic': '200g PET Bottle',
      'card-ginger': '200g PET Bottle'
    };

    function selectPack(cardId, packSize, yieldText) {
      selectedPacks[cardId] = packSize;
      const card = document.getElementById(cardId);
      if (!card) return;

      const buttons = card.querySelectorAll('.pack-pill-btn');
      buttons.forEach(btn => {
        if (btn.textContent.trim() === packSize.replace(' PET Bottle', '').replace(' Commercial Bottle', '').replace(' Catering Bucket', '')) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      const label = card.querySelector('.selected-pack-label');
      if (label) label.textContent = packSize;

      const yieldDisplay = document.getElementById(`yield-${cardId}`);
      if (yieldDisplay && yieldText) yieldDisplay.textContent = yieldText;
    }

    function orderProductWhatsApp(productName, cardId) {
      const pack = selectedPacks[cardId] || '200g PET Bottle';
      const msg = `Hi Flanora! 👋 I'm interested in ordering:\n` +
                  `• *${productName}* (${pack})\n\n` +
                  `Could you please share the price and delivery timeline for my address? Thank you!`;

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/916238796383?text=${encoded}`, '_blank');
    }

    // B2B Wholesale RFQ Submission
    function submitFlanoraRFQ() {
      const name = document.getElementById('rfqName').value.trim();
      const phone = document.getElementById('rfqPhone').value.trim();
      const tier = document.getElementById('rfqTier').value;
      const volume = document.getElementById('rfqVolume').value.trim();
      const notes = document.getElementById('rfqNotes').value.trim();

      if (!name || !phone) {
        alert('Please enter your Business/Contact Name and Phone number.');
        return;
      }

      let msg = `Hi Flanora team! 👋 This is ${name}.\n\n` +
                `We would like to request *${tier}*.\n`;
      if (volume) {
        msg += `• Volume / Business: ${volume}\n`;
      }
      if (notes) {
        msg += `• Delivery details / notes: ${notes}\n`;
      }
      msg += `• Phone: ${phone}\n\n` +
             `Could you please share your rate card and sample details? Thank you!`;

      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/916238796383?text=${encodedMsg}`, '_blank');
    }
  
    // =========================================================================
    // FEATURE 3: KERALA DISTRICT & PINCODE CHECKER LOGIC
    // =========================================================================
    let selectedDeliveryDistrict = 'Thrissur';

    const districtData = {
      'Thrissur': { type: 'fast', text: 'Local Processing Hub • Direct dispatch in 24–48 hrs • FREE delivery on bulk/combos • COD available' },
      'Ernakulam': { type: 'fast', text: 'Central Route • Delivery in 24–48 hrs from Thrissur hub • FREE delivery on bulk/combos • COD available' },
      'Palakkad': { type: 'fast', text: 'Eastern Route • Delivery in 24–48 hrs from Thrissur hub • FREE delivery on bulk/combos • COD available' },
      'Kozhikode': { type: 'express', text: 'Express Courier (2–3 Days) • Calculated delivery fee at checkout • COD available' },
      'Malappuram': { type: 'express', text: 'Express Courier (2–3 Days) • Calculated delivery fee at checkout • COD available' },
      'Kottayam': { type: 'express', text: 'Express Courier (2–3 Days) • Calculated delivery fee at checkout • COD available' },
      'Kannur': { type: 'express', text: 'Express Courier (2–3 Days) • Calculated delivery fee at checkout • COD available' },
      'Thiruvananthapuram': { type: 'express', text: 'Express Courier (2–3 Days) • Calculated delivery fee at checkout • COD available' },
      'Other': { type: 'express', text: 'Statewide Express Courier • All Kerala PIN codes covered • COD supported' }
    };

    function selectDistrict(districtName) {
      selectedDeliveryDistrict = districtName;
      document.querySelectorAll('.district-pill').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(districtName));
      });

      const info = districtData[districtName] || districtData['Other'];
      const icon = info.type === 'fast' ? '<i class="fa-solid fa-bolt" style="color: #fef08a; font-size:1.1rem; margin-top:2px;"></i>' : '<i class="fa-solid fa-truck" style="color: #60a5fa; font-size:1.1rem; margin-top:2px;"></i>';
      const heading = info.type === 'fast' ? `<strong style="color: #86efac;">${districtName} (Free 48h Route):</strong>` : `<strong style="color: #fff;">${districtName} Delivery:</strong>`;

      document.getElementById('deliveryResultCard').innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:0.6rem;">
          ${icon}
          <div>
            ${heading}
            <div>${info.text}</div>
          </div>
        </div>
      `;

      // Sync with Kitchen Bag select
      const bagSelect = document.getElementById('bagDistrictSelect');
      if (bagSelect) {
        for (let i = 0; i < bagSelect.options.length; i++) {
          if (bagSelect.options[i].value === districtName) {
            bagSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    function checkPincode() {
      const pin = document.getElementById('pincodeInput').value.trim();
      if (!pin || pin.length !== 6 || isNaN(pin)) {
        alert('Please enter a valid 6-digit Indian Pincode (e.g. 680662).');
        return;
      }

      let detected = 'Other';
      if (pin.startsWith('680')) detected = 'Thrissur';
      else if (pin.startsWith('682') || pin.startsWith('683')) detected = 'Ernakulam';
      else if (pin.startsWith('678') || pin.startsWith('679')) detected = 'Palakkad';
      else if (pin.startsWith('673')) detected = 'Kozhikode';
      else if (pin.startsWith('676') || pin.startsWith('679')) detected = 'Malappuram';
      else if (pin.startsWith('686')) detected = 'Kottayam';
      else if (pin.startsWith('670')) detected = 'Kannur';
      else if (pin.startsWith('695')) detected = 'Thiruvananthapuram';

      selectDistrict(detected);
    }

    function updateBagDistrict(val) {
      selectedDeliveryDistrict = val;
    }

    // =========================================================================
    // FEATURE 1: MULTI-ITEM KITCHEN BAG LOGIC
    // =========================================================================
    let kitchenBag = [];

    function addToKitchenBag(cardId, productName) {
      const pack = selectedPacks[cardId] || '200g PET Bottle';
      const key = `${productName} (${pack})`;

      const existing = kitchenBag.find(item => item.key === key);
      if (existing) {
        existing.qty += 1;
      } else {
        kitchenBag.push({ key, name: productName, pack: pack, qty: 1 });
      }

      // Visual feedback on button
      const btn = document.getElementById(`btnAddBag-${cardId}`);
      if (btn) {
        const origText = btn.innerHTML;
        btn.classList.add('added');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Bag!';
        setTimeout(() => {
          btn.classList.remove('added');
          btn.innerHTML = origText;
        }, 1500);
      }

      showFlanoraToast(`Added 1x ${productName} (${pack}) to Kitchen Bag!`);
      renderKitchenBag();
    }

    function updateBagQty(key, delta) {
      const idx = kitchenBag.findIndex(i => i.key === key);
      if (idx !== -1) {
        kitchenBag[idx].qty += delta;
        if (kitchenBag[idx].qty <= 0) {
          kitchenBag.splice(idx, 1);
        }
      }
      renderKitchenBag();
    }

    function renderKitchenBag() {
      const totalItems = kitchenBag.reduce((sum, item) => sum + item.qty, 0);
      const floatBar = document.getElementById('kitchenBagFloatingBar');
      const countBadge = document.getElementById('bagCountBadge');
      const itemCount = document.getElementById('bagItemCount');
      const quickSummary = document.getElementById('bagQuickSummary');
      const itemList = document.getElementById('bagModalItemList');

      if (totalItems > 0) {
        floatBar.style.display = 'block';
        countBadge.textContent = totalItems;
        itemCount.textContent = totalItems;
        const itemNames = kitchenBag.map(i => `${i.qty}x ${i.name.replace('Crushed ', '').replace(' Paste', '')}`).join(', ');
        quickSummary.textContent = itemNames;
      } else {
        floatBar.style.display = 'none';
        closeKitchenBagModal();
      }

      // Render Modal Items
      if (itemList) {
        if (kitchenBag.length === 0) {
          itemList.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:2rem 0;">Your Kitchen Bag is empty.<br>Add fresh pastes to order together!</p>';
        } else {
          itemList.innerHTML = kitchenBag.map(item => `
            <div class="bag-item-row">
              <div>
                <div class="bag-item-title">${item.name}</div>
                <div class="bag-item-pack">${item.pack}</div>
              </div>
              <div style="display:flex; align-items:center; gap:0.6rem;">
                <div class="bag-qty-controls">
                  <button type="button" class="btn-qty" onclick="updateBagQty('${item.key}', -1)">-</button>
                  <span class="qty-display">${item.qty}</span>
                  <button type="button" class="btn-qty" onclick="updateBagQty('${item.key}', 1)">+</button>
                </div>
                <button type="button" class="btn-remove-item" onclick="updateBagQty('${item.key}', -${item.qty})" aria-label="Remove item">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          `).join('');
        }
      }
    }

    function openKitchenBagModal() {
      if (kitchenBag.length === 0) return;
      document.getElementById('bagModalBackdrop').classList.add('open');
      document.getElementById('bagModal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeKitchenBagModal() {
      document.getElementById('bagModalBackdrop').classList.remove('open');
      document.getElementById('bagModal').classList.remove('open');
      document.body.style.overflow = '';
    }

    function sendKitchenBagOrderWhatsApp() {
      if (kitchenBag.length === 0) return;

      const itemsFormatted = kitchenBag.map(item => `• *${item.qty}x ${item.name}* (${item.pack})`).join('\n');
      const district = selectedDeliveryDistrict || 'Thrissur';

      const msg = `Hi Flanora! 👋 I would like to order items from my Kitchen Bag:\n\n` +
                  `${itemsFormatted}\n\n` +
                  `📍 *Delivery Destination:* ${district}\n` +
                  `Could you please confirm the total price and dispatch timeline for my order? Thank you!`;

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/916238796383?text=${encoded}`, '_blank');
      closeKitchenBagModal();
    }

  