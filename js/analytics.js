/**
 * Tatvam Overseas Inc - Google Analytics 4 Event Tracking
 * Tracks call clicks, WhatsApp clicks, mailto clicks, PDF downloads, and lead submissions
 */
(function() {
    'use strict';

    function trackEvent(eventName, params) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
                event: eventName,
                ...params
            });
        }
    }

    // Delegate click tracking across all links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = (link.getAttribute('href') || '').trim();
        if (!href) return;

        // 1. Telephone Clicks
        if (href.startsWith('tel:')) {
            const phone = href.replace('tel:', '').trim();
            trackEvent('call_click', {
                event_category: 'Contact',
                phone_number: phone,
                link_url: href
            });
            return;
        }

        // 2. WhatsApp Clicks
        if (href.includes('wa.me') || href.includes('api.whatsapp.com') || href.includes('whatsapp://')) {
            trackEvent('whatsapp_click', {
                event_category: 'Contact',
                link_url: href
            });
            return;
        }

        // 3. Mailto Clicks
        if (href.startsWith('mailto:')) {
            const email = href.replace('mailto:', '').split('?')[0].trim();
            trackEvent('email_click', {
                event_category: 'Contact',
                email_address: email,
                link_url: href
            });
            return;
        }

        // 4. PDF Downloads
        if (/\.pdf($|\?)/i.test(href)) {
            const fileName = href.split('/').pop().split('?')[0];
            trackEvent('file_download', {
                event_category: 'Engagement',
                file_name: fileName,
                file_extension: 'pdf',
                link_url: href
            });
            return;
        }
    }, true);

    // 5. Global helper for form submissions / lead generation
    window.trackLeadSubmission = function(inquiryType) {
        // Map raw inquiry types to standard: Quote / Stock / Export / Support
        let cleanType = 'Quote';
        const typeStr = String(inquiryType || '').toLowerCase();
        if (typeStr.includes('stock')) cleanType = 'Stock';
        else if (typeStr.includes('export')) cleanType = 'Export';
        else if (typeStr.includes('support') || typeStr.includes('tech')) cleanType = 'Support';
        else cleanType = 'Quote';

        trackEvent('generate_lead', {
            event_category: 'Conversion',
            inquiry_type: cleanType
        });
    };
})();
