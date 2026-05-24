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
/* Original "Gallary" set — labelled as Training & Testing Gallery
   on the spreadsheet. Kept here so older imports still resolve. */
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

/* ---- Module: Training & Testing Gallary (extras, 4 photos) ---- */
export const TRAINING_GALLERY_IMAGES = [
  `${CLOUD}/image/upload/v1779514519/Training_Testing_Gallary_2_sty69a.jpg`,
  `${CLOUD}/image/upload/v1779514517/Training_Testing_Gallary_3_ou0mg9.jpg`,
  `${CLOUD}/image/upload/v1779514516/Training_Testing_Gallary_4_y0pvjd.jpg`,
  `${CLOUD}/image/upload/v1779514514/Training_Testing_Gallary_1_evyqqe.jpg`,
];

/* ---- Module: Office gallary (3 photos, 2026-05-23 supply) ----- */
export const OFFICE_GALLERY_IMAGES = [
  `${CLOUD}/image/upload/v1779516359/WhatsApp_Image_2026-05-23_at_11.54.32_AM_xwua0e.jpg`,
  `${CLOUD}/image/upload/v1779516358/WhatsApp_Image_2026-05-23_at_11.54.33_AM_fk6dd7.jpg`,
  `${CLOUD}/image/upload/v1779516357/WhatsApp_Image_2026-05-23_at_11.54.34_AM_duewdd.jpg`,
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
  agriculture:   `${CLOUD}/image/upload/v1779535797/WhatsApp_Image_2026-05-23_at_5.24.43_PM_dvjjjs.jpg`,
};

/* ---- Module: Training & testing centre — Facility & Activity --- */
/* Keys match the `tag` values used by the photo strip on the
   Training & Testing Center page (case-insensitive lookup). */
export const FACILITY_IMAGES = {
  "training floor": `${CLOUD}/image/upload/v1779517440/Training_Floor_meql1r.png`,
  "records room":   `${CLOUD}/image/upload/v1779517420/Record_room_kllgsj.png`,
  "common area":    `${CLOUD}/image/upload/v1779516358/WhatsApp_Image_2026-05-23_at_11.54.33_AM_fk6dd7.jpg`,
  "workers":        `${CLOUD}/image/upload/v1779517382/Workers_ddhzag.jpg`,
  "trade test":     `${CLOUD}/image/upload/v1779517380/Trade_Test_yrvjwp.jpg`,
  "tools":          `${CLOUD}/image/upload/v1779517378/Tools_ivif6z.webp`,
};

/* ---- Module: Training & testing centre — Hero image ------------- */
export const FACILITY_HERO_IMAGE =
  `${CLOUD}/image/upload/v1779535510/WhatsApp_Image_2026-05-23_at_5.24.11_PM_ulhcla.jpg`;

/* ---- Module: About Bangladesh ---------------------------------- */
export const ABOUT_BANGLADESH_IMAGE =
  `${CLOUD}/image/upload/v1779518488/WhatsApp_Image_2026-05-23_at_12.36.55_PM_xqb1mc.jpg`;
