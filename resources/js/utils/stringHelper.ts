type TrimMode = 'all' | 'strip-tags' | string[];

/**
 * Utilitas untuk membersihkan dan men-trim string HTML dari TinyMCE.
 * * @param htmlString - Teks HTML mentah yang akan dibersihkan.
 * @param target - Defaultnya 'all' (menghasilkan teks murni).
 * Jika 'strip-tags', menghapus tag struktural umum (p, div, span) tapi menjaga iframe/img.
 * Jika berupa array (contoh: ['p']), hanya tag tersebut yang dihapus.
 */
export const cleanHtml = (
  htmlString: string | null | undefined, 
  target: TrimMode = 'all' // 👈 DEFAULT-NYA DIATUR KE 'all'
): string => {
  if (!htmlString) return '';

  let result = htmlString;

  if (target === 'all') {
    // Mode Trim All: Hapus total semua tag HTML (<[^>]*>) menjadi pure text murni
    result = result.replace(/<[^>]*>/g, '');
  } 
  else if (target === 'strip-tags') {
    // Mode Pintasan Aman: Hanya hapus p, div, dan span pembungkus (Sangat cocok untuk Maps/Iframe)
    const tagsToStrip = ['p', 'div', 'span'];
    tagsToStrip.forEach((tag) => {
      const regex = new RegExp(`<\/?${tag}([^>]*?)>`, 'gi');
      result = result.replace(regex, '');
    });
  } 
  else if (Array.isArray(target)) {
    // Mode Array Spesifik: Hanya hapus tag yang didaftarkan manual oleh kamu
    target.forEach((tag) => {
      const regex = new RegExp(`<\/?${tag}([^>]*?)>`, 'gi');
      result = result.replace(regex, '');
    });
  }

  return result.trim();
};