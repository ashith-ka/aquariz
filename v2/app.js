(() => {
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const whatsapp = '916238796383';

    const drawer = $('#mobileDrawer');
    const menu = $('#menuToggle');
    const closeMenu = $('#closeMenu');
    let drawerReturn;
    function setDrawer(open) {
        if (!drawer || !menu) return;
        if (open) {
            drawerReturn = document.activeElement;
            drawer.hidden = false;
            requestAnimationFrame(() => drawer.classList.add('is-open'));
            menu.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            (closeMenu || drawer).focus();
        } else {
            drawer.classList.remove('is-open');
            drawer.hidden = true;
            menu.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            drawerReturn?.focus();
        }
    }
    menu?.addEventListener('click', () => setDrawer(true));
    closeMenu?.addEventListener('click', () => setDrawer(false));
    $$('.drawer-link').forEach(link => link.addEventListener('click', () => setDrawer(false)));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && drawer && !drawer.hidden) setDrawer(false);
        if (event.key === 'Escape' && $('#cartModal') && !$('#cartModal').hidden) closeCart();
    });

    function toast(message) {
        const node = $('#toast');
        if (!node) return;
        node.textContent = message;
        node.hidden = false;
        clearTimeout(toast.timer);
        toast.timer = setTimeout(() => { node.hidden = true; }, 3500);
    }
    window.copyGstin = () => {
        const value = '32ACCFA6985C1ZL';
        navigator.clipboard?.writeText(value).then(() => toast('GSTIN copied.')).catch(() => toast(value));
    };

    const cart = [];
    const selectedPacks = {};
    const productNames = {
        gg: 'Crushed Ginger-Garlic Paste',
        garlic: 'Pure Crushed Garlic Paste',
        ginger: 'Single-Origin Crushed Ginger Paste'
    };
    const packLabels = ['200g', '500g', '1kg', '5kg'];
    $$('.product-card').forEach(card => {
        const id = card.dataset.product;
        selectedPacks[id] = '200g PET Bottle';
        $$('.pack-row button', card).forEach(button => button.addEventListener('click', () => {
            $$('.pack-row button', card).forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            selectedPacks[id] = button.dataset.pack;
        }));
        $('.add-product', card)?.addEventListener('click', () => addToCart(id));
        $('.single-order', card)?.addEventListener('click', () => orderSingle(id));
    });
    function addToCart(id) {
        const pack = selectedPacks[id];
        const key = `${id}:${pack}`;
        const item = cart.find(entry => entry.key === key);
        if (item) item.quantity += 1;
        else cart.push({ key, id, pack, quantity: 1 });
        renderCart();
        toast(`${productNames[id]} added to your bag.`);
    }
    function changeQuantity(key, amount) {
        const item = cart.find(entry => entry.key === key);
        if (!item) return;
        item.quantity += amount;
        if (item.quantity < 1) cart.splice(cart.indexOf(item), 1);
        renderCart();
    }
    function renderCart() {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        const tray = $('#cartTray');
        if (!tray) return;
        tray.hidden = total === 0;
        $('.cart-count', tray).textContent = total;
        $('.cart-summary', tray).textContent = `${total} item${total === 1 ? '' : 's'} ready to order`;
        const list = $('#cartItems');
        if (!list) return;
        list.innerHTML = cart.length ? cart.map(item => `<div class="cart-item"><div><strong>${productNames[item.id]}</strong><small>${item.pack}</small></div><div class="qty"><button type="button" data-key="${item.key}" data-change="-1" aria-label="Remove one">−</button><strong>${item.quantity}</strong><button type="button" data-key="${item.key}" data-change="1" aria-label="Add one">+</button></div></div>`).join('') : '<p class="muted">Your kitchen bag is empty.</p>';
        $$('.qty button', list).forEach(button => button.addEventListener('click', () => changeQuantity(button.dataset.key, Number(button.dataset.change))));
        $('.cart-count', tray).setAttribute('aria-label', `${total} items in kitchen bag`);
    }
    function openCart() {
        if (!cart.length) return;
        const modal = $('#cartModal');
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        $('#closeCart')?.focus();
        renderCart();
    }
    function closeCart() { const modal = $('#cartModal'); if (!modal) return; modal.hidden = true; document.body.style.overflow = ''; }
    $$('#openCart').forEach(button => button.addEventListener('click', openCart));
    $('#cartTray')?.addEventListener('click', event => { if (event.target.closest('#reviewCart')) openCart(); });
    $('#closeCart')?.addEventListener('click', closeCart);
    $('#cartBackdrop')?.addEventListener('click', closeCart);
    function orderSingle(id) {
        const message = `Hi Flanora! I would like to order ${productNames[id]} (${selectedPacks[id]}). Please confirm the price and delivery timeline.`;
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    }
    $('#sendBag')?.addEventListener('click', () => {
        if (!cart.length) return;
        const destination = $('#bagDestination')?.value || 'Kerala';
        const items = cart.map(item => `${item.quantity}x ${productNames[item.id]} (${item.pack})`).join('\n');
        const message = `Hi Flanora! I would like to order:\n${items}\n\nDelivery destination: ${destination}\nPlease confirm the total price and dispatch timeline.`;
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
    $('#deliveryForm')?.addEventListener('submit', event => {
        event.preventDefault();
        const pin = $('#pincode')?.value.trim();
        const result = $('#deliveryResult');
        if (!/^\d{6}$/.test(pin)) { result.textContent = 'Enter a valid 6-digit Indian PIN code.'; result.dataset.state = 'error'; return; }
        const fast = ['680', '682', '683', '678'];
        result.textContent = fast.some(prefix => pin.startsWith(prefix)) ? 'Fast route available. We will confirm the exact timeline on WhatsApp.' : 'Kerala-wide courier delivery available. We will confirm the exact timeline on WhatsApp.';
        result.dataset.state = 'success';
    });
    $('#rfqForm')?.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        const message = `Hi Flanora! I am ${data.get('name')}. We are interested in ${data.get('need')}. Monthly volume: ${data.get('volume') || 'Not specified'}. Contact: ${data.get('phone')}. Notes: ${data.get('notes') || 'None'}.`;
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
    $('#contactForm')?.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        const message = `Hi Aquariz team! I am ${data.get('name')}. Phone: ${data.get('phone')}. Inquiry: ${data.get('message') || 'I would like to connect with your team.'}`;
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
        $('#contactStatus').textContent = 'WhatsApp opened with your message ready to send.';
    });
    $('#emailContact')?.addEventListener('click', () => {
        const form = $('#contactForm');
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        const subject = encodeURIComponent(`Aquariz enquiry - ${data.get('name')}`);
        const body = encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\n\n${data.get('message') || ''}`);
        window.location.href = `mailto:aquariz.official@gmail.com?subject=${subject}&body=${body}`;
    });
    $$('.year').forEach(node => node.textContent = new Date().getFullYear());
})();
