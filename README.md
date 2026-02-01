# Template-3D-Items-Like-A-Java-Edition-for-bedrock-Edition
Create 3D-style items just like in Minecraft Java Edition using OptiFine. This template allows items to appear fully 3D, similar to OptiFine features, by using a resource pack with item renaming or CIT.

**Support Minecraft version**
1.21.130 / 1.21.131 / 1.21.132
(Recommend) > Beta / Priview

> Support Type: equipment, blocks, items, and more

> Guide Edit  you're Models:
![IMG-20260131-WA0004](https://github.com/user-attachments/assets/de8356f4-c9dc-4243-a3e5-6ac8a864e040)
![IMG-20260131-WA0005](https://github.com/user-attachments/assets/6887078b-dd9f-425e-880e-1a1b938d7afe)
![IMG-20260131-WA0006](https://github.com/user-attachments/assets/76fdbaa8-5056-46b3-9e33-86054d3aea44)


> Guide Scale Models (Click ->)
> 
https://github.com/user-attachments/assets/3841be48-6362-4953-b43a-e6517fbf32cc


> If you’ve already edited or made the models, go ahead and do this!
![IMG-20260131-WA0007](https://github.com/user-attachments/assets/f4e593da-fa62-40c9-8ce3-1065409398e6)
![IMG-20260131-WA0008](https://github.com/user-attachments/assets/9e771c02-21ec-49c0-9f84-76a7b496a5c3)

**This is the final result, and don’t forget to enable all experimental features to prevent errors in the add-ons!**

> See:
<img width="1640" height="720" alt="Screenshot_20260131-205631" src="https://github.com/user-attachments/assets/76ff8cc6-56b1-4137-b3ab-af2787c87f0f" />

> **Animated Textures (Frame 3d Items)**

<img width="1640" height="720" alt="Screenshot_20260201-191003" src="https://github.com/user-attachments/assets/994f1015-a33f-4cbd-aa57-070156c7f80e" />
video:

https://github.com/user-attachments/assets/14c4369a-2b42-4fb7-a736-3ee013d3f965

<img width="1640" height="720" alt="Screenshot_20260201-190947" src="https://github.com/user-attachments/assets/c6d38c76-5150-4b79-a96c-7144bfc54e92" />
video:

https://github.com/user-attachments/assets/011123a6-6efe-47f1-9f51-065ed85d9a87

<img width="1640" height="720" alt="Screenshot_20260201-191037" src="https://github.com/user-attachments/assets/7976a02b-08c6-4f66-8f53-018b674b8f4f" />
video:

https://github.com/user-attachments/assets/1c215a2a-a09e-45f4-8242-1145524ae368

## Code Preview

### flipbook_textures.json
```json
[
    {
        "flipbook_texture": "textures/items/rave_sword",
        "atlas_tile": "rave_sword",
        "ticks_per_frame": 3,
        "blend_frames": false
    }
]
```

### item_texture.json
```json
{
    "resource_pack_name": "vanilla",
    "texture_name": "atlas.items",
    "texture_data": {
        "rave_sword": {
            "textures": "textures/items/rave_sword"
        }
    }
}
```

### terrain_textures.json
```json
{
    "resource_pack_name": "vanilla",
    "texture_name": "atlas.terrain",
    "padding": 8,
    "num_mip_levels": 4,
    "texture_data": {
        "frost_slayer": {
            "textures": "textures/items/frost_slayer"
        },
        "rave_sword": {
            "textures": "textures/items/rave_sword"
        }
    }
}
```
