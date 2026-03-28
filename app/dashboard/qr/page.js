'use client';
import { QRCodeCanvas } from 'qrcode.react';

const CATALOG_URL = 'https://footwear-catalog.vercel.app';

export default function QRPage() {

  function handleDownload() {
    const canvas = document.querySelector('#qr-code canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopcatalog-qr.png';
    a.click();
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'Barlow', sans-serif" }}>

      <div style={{ background: '#111', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#fff', fontSize: 24, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
          👟 QR Code
        </h1>
        <a href="/dashboard" style={{ color: '#FF3A00', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← BACK</a>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>

        <div style={{ background: '#fff', borderRadius: 4, padding: 32, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 800, color: '#999', letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 6px' }}>Scan to Browse</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 800, color: '#111', textTransform: 'uppercase', margin: '0 0 24px' }}>👟 ShopCatalog</h2>
          <div id="qr-code" style={{ display: 'inline-block', padding: 16, background: '#fff', border: '3px solid #111', borderRadius: 4 }}>
            <QRCodeCanvas value={CATALOG_URL} size={220} bgColor="#ffffff" fgColor="#111111" level="H" />
          </div>
          <p style={{ fontSize: 13, color: '#999', margin: '20px 0 0' }}>{CATALOG_URL}</p>
          <div style={{ height: 1, background: '#eee', margin: '20px 0' }} />
          <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>Print this and place it at your counter</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button onClick={handleDownload} style={{ flex: 1, background: '#111', color: '#fff', border: 'none', padding: '14px 0', fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif" }}>
            ⬇️ Download PNG
          </button>
          <button onClick={() => window.print()} style={{ flex: 1, background: '#fff', color: '#111', border: '2px solid #111', padding: '14px 0', fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif" }}>
            🖨️ Print
          </button>
        </div>

        <a href={'https://wa.me/?text=' + encodeURIComponent('Browse our footwear catalog: ' + CATALOG_URL)} target="_blank" style={{ display: 'block', marginTop: 10, background: '#25D366', color: '#fff', padding: '14px 0', fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4, textAlign: 'center', textDecoration: 'none', fontFamily: "'Barlow Condensed', sans-serif" }}>
          💬 Share on WhatsApp
        </a>

      </div>
    </div>
  );
}