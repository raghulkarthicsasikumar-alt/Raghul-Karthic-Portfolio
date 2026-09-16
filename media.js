/*
  Drive-backed media config.
  Drive folder: https://drive.google.com/drive/folders/16Q6aTHkSjCXppIejPyk3Cy9c8QuXvblC

  Folder structure (already created for you):
    01-Hero/
    02-Manifesto/
    03-Work/
      01-double-or-nothing/
      02-swey/
      03-in-other-words-i-loved-you/
      04-kaise-main-batau/
      05-housewarming/
      06-red-light-shadows/
      07-the-waiting-room/
      08-keeta-spec-ad/
      09-dont-leave/
    04-Journal/
    05-Reel-ChroniclesOfAChef/

  How to add a file:
    1. Upload into the matching folder above, named per the convention noted
       next to each slot below (e.g. cover.jpg, still-01.jpg, reel.mp4).
    2. Right-click the file in Drive -> Share -> "Anyone with the link" -> Viewer.
    3. Open the file, copy the ID from its URL:
       https://drive.google.com/file/d/FILE_ID_HERE/view
    4. Paste FILE_ID_HERE into the matching slot below as a string.
  Any slot left as "" simply falls back to the site's placeholder plate —
  nothing breaks if you fill these in gradually.
*/

const MEDIA = {
  hero: {
    plateA: "",   // 01-Hero/plate-a.jpg  (reel still, 16:9)
    plateB: "",   // 01-Hero/plate-b.jpg  (motion clip still, 16:9)
    plateC: "",   // 01-Hero/plate-c.jpg  (texture plate, 16:9)
    plateD: "",   // 01-Hero/plate-d.jpg  (portrait, 16:9)
    plateE: ""    // 01-Hero/plate-e.jpg  (optional extra, 16:9)
  },

  work: {
    don:       { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/01-double-or-nothing/
    swey:      { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/02-swey/
    iow:       { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/03-in-other-words-i-loved-you/
    kmb:       { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/04-kaise-main-batau/
    house:     { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/05-housewarming/
    rls:       { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/06-red-light-shadows/
    waiting:   { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/07-the-waiting-room/
    keeta:     { cover: "", stills: ["", "", "", "", ""], reel: "" }, // 03-Work/08-keeta-spec-ad/
    dontleave: { cover: "", stills: ["", "", "", "", ""], reel: "" }  // 03-Work/09-dont-leave/
  },

  journal: {
    contactSheet: ["", "", "", "", "", "", "", "", "", "", "", ""], // 04-Journal/contact-01.jpg .. contact-12.jpg
    diagram: "",   // 04-Journal/diagram.jpg
    btsPlate: ""   // 04-Journal/bts-plate.jpg
  },

  chefReel: "" // 05-Reel-ChroniclesOfAChef/reel.mp4 (or paste a Drive video file ID)
};

function driveImageUrl(id) {
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1600` : null;
}

function driveVideoEmbedUrl(id) {
  return id ? `https://drive.google.com/file/d/${id}/preview` : null;
}

function applyDriveBackground(el, driveId) {
  if (!el) return;
  const url = driveImageUrl(driveId);
  if (url) {
    el.style.backgroundImage = `url("${url}")`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
  }
}
