// CONFIG file (separate)
// Contains creator info, templates, guides and license data.
// You can edit this file to add / change items.

const CONFIG = {
  creator: {
    name: "@Velixsaxy",
    pfp: "assets/pp.png", // ensure file exists in assets/
    ytLink: "https://youtube.com/@velixsaxy",
    video: "https://youtu.be/fO6L_b-bCcg?si=5zVuTIEgVztrIftT",
    discord: "https://discord.gg/example",
    whatsapp: "https://wa.me/628123456789",
    bannerTitle: "VelixsCraftMCYT",
    bannerSub: "Creator",
    content: [
      { type: "label", value: "✓ Verified Developer Addons" },
      { type: "title", value: "Description Creator:" },
      { type: "divider" },
      { type: "text", value: "Saya adalah creator kecil **Minecraft Add-ons** yang fokus pada Asset Template untuk addons anda, bisa disini link [youtube](https://youtube.com/@velixsaxy?si=pq-tbjIIsKtsXb3E)" },
      { type: "divider" },
      { type: "text", value: "Addons Template Akan selalu² ada diaini, jadi tolong Pakailah dengan Bijak misal ke addons anda, buat server anda itu boleh asalkan ada Kreditnya ya :3" },
      { type: "list", items: ["Mibrowser (W.I.P)", "Magicosmetic (W.I.P)", "3D Cosmetics item (W.I.P)"] },
      { type: "divider" },
      { type: "text", value: "Template² yang sudah Saya buatkan" },
      { type: "label", value: "Items 3D Like A Java" },
      { type: "label", value: "Items Anvil Rename Like A Java" },
      { type: "divider" }
    ]
  },

  templates: [
    {
      id: 1,
      title: "Realistic Shader V4",
      type: "addons",
      thumbnail: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800",
      content: [
        { type: "image", src: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800" },
        { type: "title", value: "Deskripsi Shader" },
        { type: "text", value: "Shader ini memberikan efek **bayangan nyata** dan air jernih." },
        { type: "label", value: "High Performance" },
        { type: "label", value: "Lush Water" },
        { type: "divider" },
        { type: "title", value: "Fitur Utama" },
        { type: "list", items: ["Refleksi Air", "Awan Dinamis", "Lampu Malam Berwarna"] },
        { type: "title", value: "Instalasi" },
        { type: "numbered", items: ["Download File", "Klik file .mcpack", "Pasang di Minecraft"] },
        { type: "code", value: "/set_shader realistic_v4 --enable" },
        { type: "divider" },
        { 
          type: "dropdown", 
          label: "Pilih Versi Shader", 
          targetId: "btn-download-1",
          options: [
            { label: "Shader v4.0.0 (Stable)", url: "file_v4_stable.zip" },
            { label: "Shader v4.1.0 (Beta)", url: "file_v4_beta.zip" }
          ]
        },
        { type: "button", id: "btn-download-1", label: "Download File", url: "file_v4_stable.zip", primary: true }
      ]
    },
    {
      id: 2,
      title: "Cardboard Prop Pack",
      type: "cardboard",
      thumbnail: "https://via.placeholder.com/800x450/3b4252/ffffff?text=Cardboard+Pack",
      content: [
        { type: "title", value: "Cardboard Set" },
        { type: "text", value: "Set model cardboard untuk props dan dekorasi." },
        { type: "code", value: '{ "type": "cardboard", "id": "card_01" }' }
      ]
    }
  ],

  guides: [
    {
      id: 101,
      title: "Cara Pasang Addons",
      type: "utility",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800",
      content: [
        { type: "title", value: "Panduan Cepat" },
        { type: "text", value: "Ikuti langkah berikut untuk memasang asset." },
        { type: "code", value: "1. Buka File Manager\n2. Cari folder Minecraft\n3. Paste asset di Resource Packs" }
      ]
    }
  ],

  license: [
    { type: "title", value: "Hak Cipta" },
    { type: "text", value: "Seluruh asset adalah milik **@velixsaxy**." },
    { type: "list", items: ["Boleh untuk konten YT", "Dilarang jual ulang", "Wajib kredit"] }
  ]
};