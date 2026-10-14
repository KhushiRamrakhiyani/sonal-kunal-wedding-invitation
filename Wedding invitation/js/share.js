/**
 * Social Sharing and URL Copy Actions
 */
class WeddingShare {
  static getShareData() {
    return {
      title: 'Kunal Weds Sonal — Wedding Invitation',
      text: 'You are cordially invited to celebrate the wedding celebrations of Kunal Lalwani & Sonal Saheta on 10–13 November 2026. View our interactive invitation here:\n',
      url: window.location.href.split('#')[0]
    };
  }

  static async share() {
    const data = this.getShareData();

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    }

    // Fallback: copy link
    this.copyLink();
  }

  static shareWhatsApp() {
    const data = this.getShareData();
    const text = encodeURIComponent(`${data.text}\n${data.url}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, '_blank');
  }

  static async copyLink() {
    const url = window.location.href.split('#')[0];
    try {
      await navigator.clipboard.writeText(url);
      if (window.showToast) {
        window.showToast('✨ Invitation link copied to clipboard!');
      }
    } catch (e) {
      // Prompt fallback
      prompt('Copy this invitation link:', url);
    }
  }
}

window.WeddingShare = WeddingShare;
