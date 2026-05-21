/* ================================================================
   Shared media assets — Cloudinary-hosted images & video.

   Single source of truth for every real client-supplied asset on
   the site, mapped per "Module name" from the SNS Cloudinary sheet:
   https://docs.google.com/spreadsheets/d/12QdqDKO68LgRMqH8jo11DkmbOf_QQZlSjh7zH7wylzI

   Components import from here instead of hard-coding URLs, so when
   an asset is re-uploaded only this file changes.
   ================================================================ */

const CLOUD = "https://res.cloudinary.com/dk4csiouq";

/* ---- Module: vedio --------------------------------------------- */
export const HERO_VIDEO =
  `${CLOUD}/video/upload/v1779357996/WhatsApp_Video_2026-05-21_at_3.07.01_PM_webqgf.mp4`;

/* ---- Module: Gallary (8 office photos) ------------------------- */
export const GALLERY_IMAGES = [
  `${CLOUD}/image/upload/v1779356826/Gallary_8_itoch8.jpg`,
  `${CLOUD}/image/upload/v1779356825/Gallary_6_jk4c5n.jpg`,
  `${CLOUD}/image/upload/v1779356825/Gallary_7_slkybj.jpg`,
  `${CLOUD}/image/upload/v1779356823/Gallary_5_jnofff.jpg`,
  `${CLOUD}/image/upload/v1779356822/Gallary_1_cfgvz2.jpg`,
  `${CLOUD}/image/upload/v1779356821/Gallary_3_hifhzh.jpg`,
  `${CLOUD}/image/upload/v1779356821/Gallary_2_nolwsg.jpg`,
  `${CLOUD}/image/upload/v1779356821/Gallary_4_kjjhlc.jpg`,
];

/* ---- Module: Mission / Vision ---------------------------------- */
export const MISSION_IMAGE =
  `${CLOUD}/image/upload/v1779357366/Mission_oiwf8y.png`;
export const VISION_IMAGE =
  `${CLOUD}/image/upload/v1779357363/Our_Vision_xru5fs.png`;

/* ---- Module: our reasourses (sector imagery) ------------------- */
/* Keyed by sector so any component can look one up by name. */
export const RESOURCE_IMAGES = {
  construction: `${CLOUD}/image/upload/v1779357526/Construction_xoue01.png`,
  textile:      `${CLOUD}/image/upload/v1779357523/Textile_Garments_ml7lyl.png`,
  cleaners:     `${CLOUD}/image/upload/v1779357520/Cleaners_jaleu0.png`,
  hotel:        `${CLOUD}/image/upload/v1779357516/Hotel_Industry_ap5qec.png`,
  drivers:      `${CLOUD}/image/upload/v1779357500/Drivers_c7uikh.png`,
  machinery:    `${CLOUD}/image/upload/v1779357487/Machinery_Operators_wktpiw.png`,
};
