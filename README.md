# Template: 3D Items Like OptiFine for Bedrock Edition

---

<img width="1937" height="333" alt="title" src="https://github.com/user-attachments/assets/17681633-826b-4e63-9ec0-f7ff271d84d2" />


[![activity](https://img.shields.io/github/commit-activity/m/MojoLauncher/MojoLauncher)](https://github.com/VelixsCraftMC/Template-3D-Items-Like-A-Java-Edition-for-bedrock-Edition/activity)


> Create 3D-style items just like in Minecraft Java Edition using OptiFine. This template allows items to appear fully 3D, similar to OptiFine features, by using a resource pack with item renaming or CIT.
---
> [New Final Update - Glowing 3D]

<img width="1640" height="720" alt="Screenshot_20260209-132254" src="https://github.com/user-attachments/assets/ac3e415e-c38d-4068-891c-20530af758db" />

> no longer getting new updates (because all 3D features are already there, this will continue to support the latest version)

---

Items, weapons, and blocks are displayed with full visual models in the inventory, container slots, chests, shulkers, hotbar, on the ground, in item frames, first-person view, third-person view, and also when dropped — all rendered in 3D.

---

## Screenshots

<img width="1640" height="720" alt="Screenshot_20260201-190941" src="https://github.com/user-attachments/assets/cf9b924d-7280-4bab-94bf-0ab236990f08" />


---

This will look similar to Minecraft: Java Edition when using OptiFine with a resource pack that changes item models. It can support 3D visuals, glow effects, and animations. I found a method to make this work in Minecraft: Bedrock Edition, although there are still some limitations.

I’ve created this and you can use it as a template. Please don’t forget to credit me — you can use my name, GitHub, or YouTube channel. Also, please review the license information below:

- Licence:

![Indonesia](https://github.com/user-attachments/assets/fe195911-9b5b-40cc-bd77-d854f073fa51)
![English](https://github.com/user-attachments/assets/53b07280-e127-4a5b-943d-27b8c95f7d11)

- *YouTube: https://www.youtube.com/@velixsaxy*

---

## Currently Supported

Below is a checklist of the template’s current features:

- [x] ~3D support across slots, item frames, and ground items~ ✓
- [x] ~Animated texture support~ ✓
- [X] ~Glow in the dark~ ✓

- [ ] Double geometry (Next update)  
- [ ] Double textures (Next update)  
- [ ] Render method improvements (Next update) 
- [ ] Item outlines (Next update)  
- [ ] Rename items in anvil (Next update)

More templates may be added here later to support the growth of free MMORPG-style addons that are accessible to everyone.

---

## Usage Guide

### Guide #1 — How to Create a Compatible Model
Screenshot

<img width="628" height="387" alt="1" src="https://github.com/user-attachments/assets/692d94ae-41b2-48c5-a18a-67e06c955840" />
<img width="628" height="387" alt="2" src="https://github.com/user-attachments/assets/0ab5468a-2d00-4b51-a2e3-d1e1ec5c6059" />
<img width="628" height="387" alt="3" src="https://github.com/user-attachments/assets/87deeb62-0e4c-4b82-9f46-86aa3de6fee5" />
<img width="628" height="387" alt="4" src="https://github.com/user-attachments/assets/6471826b-a54c-4755-b4f3-c59ac6844b89" />
<img width="628" height="387" alt="5" src="https://github.com/user-attachments/assets/897fba0a-d2bb-47d1-a9eb-2b2a5f575e88" />
<img width="351" height="628" alt="6" src="https://github.com/user-attachments/assets/26e049f5-fb5e-41b7-bd78-86deb5356d75" />
<img width="628" height="387" alt="7" src="https://github.com/user-attachments/assets/84dee76a-7510-4a79-93c2-3a9d571ac6f9" />
<img width="628" height="387" alt="8" src="https://github.com/user-attachments/assets/1522ffd7-487f-4837-b0f3-3b229b9de28b" />


---

### Guide #2 — How to Create Animated Textures



https://github.com/user-attachments/assets/d420556d-6a7f-42e1-8bcd-3ae80ad072bb

> Indonesian:

# 📘 Konfigurasi Animasi Texture (Minecraft Bedrock)

## flipbook_textures.json — khusus animasi

Masukkan frame hasil copy dari Blockbench ke file ini.

```json
[
  {
    "flipbook_texture": "textures/items/rave_sword",
    "atlas_tile": "rave_sword",
    "ticks_per_frame": 3,
    "blend_frames": false
  },
  {
    "flipbook_texture": "textures/items/contoh",
    "atlas_tile": "contoh",
    "ticks_per_frame": 3,
    "blend_frames": false
  }
]
```

---

## item_texture.json — khusus item animasi

Tambahkan entry texture animasi di bagian `texture_data`.

```json
{
  "resource_pack_name": "vanilla",
  "texture_name": "atlas.items",
  "texture_data": {
    "rave_sword": {
      "textures": "textures/items/rave_sword"
    },
    "contoh": {
      "textures": "textures/items/contoh"
    }
  }
}
```

---

## terrain_texture.json — blok non-animasi & animasi

Gunakan untuk blok. Texture animasi tetap harus didaftarkan di atlas terrain jika dipakai di blok.

```json
{
  "resource_pack_name": "vanilla",
  "texture_name": "atlas.terrain",
  "padding": 8,
  "num_mip_levels": 4,
  "texture_data": {
    "rave_sword": {
      "textures": "textures/items/rave_sword"
    },
    "contoh": {
      "textures": "textures/items/contoh"
    }
  }
}
```

### Guide #3 — How to Scale Down a Model

<img width="628" height="387" alt="1" src="https://github.com/user-attachments/assets/914cf4ad-c867-4bb8-be4d-f6f61a58e41f" />
<img width="628" height="387" alt="2" src="https://github.com/user-attachments/assets/4fc0891a-f6d7-4af5-be30-b348e1013d43" />
<img width="628" height="386" alt="3" src="https://github.com/user-attachments/assets/fa828bde-7b26-4772-bd70-7b5c49444590" />
<img width="628" height="387" alt="4" src="https://github.com/user-attachments/assets/6f3fd0f1-a6c2-410e-98c9-13819ace1b69" />
<img width="372" height="628" alt="5" src="https://github.com/user-attachments/assets/e11484aa-4aac-4b28-bd07-2ff5b6e2d513" />



---

## Creator Notes

**#1 VelixsCraftMCYT:**  
Sorry — update schedules will now be set to 2 updates per week for this template. I’m busy with real-world responsibilities and can’t push daily updates. Each change requires experimentation and coding time.

**#2 VelixsCraftMCYT:**  
The license allows you to use this template for large projects. Paid or premium addon projects are allowed. Donations are welcome — even small support helps. Around $2 is already meaningful support (or local equivalent). It helps fund further template development.

Donation link:

**#3 VelixsCraftMCYT:**  
I’m looking for contributors who can build Bedrock addons. Please contact me if you want to help — GitHub experience is required so we can collaborate and improve this template together.

---

## Latest Template Version

https://github.com/VelixsCraftMC/Template-3D-Items-Like-A-Java-Edition-for-bedrock-Edition/releases/tag/release
