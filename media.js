/*
  Drive-backed media config.
  Drive folder: https://drive.google.com/drive/folders/16Q6aTHkSjCXppIejPyk3Cy9c8QuXvblC

  Each work project has a `panels` array: [{ img: DRIVE_FILE_ID, title: "..." }, ...]
  rendered as a titled grid on the project's detail page. The first panel with
  an image also becomes that project's gallery cover automatically.

  To add more: upload into the matching Drive subfolder, share it
  ("Anyone with the link" -> Viewer), copy the file ID from its URL
  (drive.google.com/file/d/FILE_ID_HERE/view), and add a { img, title } entry.
*/

const MEDIA = {
  hero: {
    plateA: "",
    plateB: "",
    plateC: "",
    plateD: "",
    plateE: ""
  },

  work: {
    don: {
      reel: "",
      panels: [
        { img: "1qkIlNl4e7PzkcZOnLkD2Yh6F2srXko1O", title: "Still 01" },
        { img: "1e9kzSeFcKOyIiB4vx1dmeF7xNnMZBJUf", title: "Still 02" },
        { img: "1wmGq8z_2TjX1Jy9Ph_9w5aEM7g_WrCTO", title: "Still 03" },
        { img: "1WF90F9urNLOGGwlZqcBhv2W25F3z5Jn3", title: "Still 04" },
        { img: "1i67Yn6zSZ5SzA3z8DEZYK2FQO4Af7Nxz", title: "Still 05" },
        { img: "1fHbUminegYM82h70q7C4nxMB8FzBCUrF", title: "Still 06" },
        { img: "1OPxWIpyYN5hCFs4pmWZ7dtspDOJqte46", title: "Still 07" },
        { img: "1BLhmfPZujD8kB1FDYqxNLQnhKnXhVmIa", title: "Still 08" },
        { img: "1DXtMKHCjsajKQO7tRdTZen5i_dM3HQ66", title: "Still 09" }
      ]
    },

    swey: {
      reel: "https://www.youtube.com/embed/videoseries?list=PLGBvRabH3Wt7X1n9LnP5qfOXW8MgsGHd8",
      panels: [
        { img: "1nu_eXggyW7SvGmBzvIH8P1r5JS6U_iuR", title: "Still 01" },
        { img: "14OfxKfWCZMugvvo7drg3Hd4M5aOdSaZ7", title: "Still 02" },
        { img: "1AUgphqL1ktVh-RD5ActvuDJExpY4QCJr", title: "Still 03" },
        { img: "1A90Qnvm8RNIanBQvjTj2LL4faMbW7pEz", title: "Still 04" },
        { img: "1wwGlZC4YEvPz3WtSnOZBkLIVlc8B8R2l", title: "Still 05" },
        { img: "1tRQOv1UFF-ioZBQteoLfhwgR7JC5cpNJ", title: "Still 06" },
        { img: "1Ga1NcVQadYPJKI7mXyENwOjiQsB03fCh", title: "Still 07" },
        { img: "1L4sNrcCQ8gEZ6CDXXjBYi21JeyL4QCZX", title: "Still 08" },
        { img: "1NwcWcPhOkPvoKNIbcDTwBc4RTPyA72L7", title: "Still 09" }
      ]
    },

    // storyboard photos (PHOTO-*.jpg set)
    iow: {
      reel: "https://www.youtube.com/embed/9SKQiPkImlY",
      panels: [
        { img: "14b9CweyJW4aiqrTpuK0pxCqefXFhSwFi", title: "Panel 01" },
        { img: "1VO1CrSHHivSMbzexFLbl6ejt0iXqRM2V", title: "Panel 02" },
        { img: "1WheiJj8gp2tpI0ueG23XA9e-WO8XI9lM", title: "Panel 03" },
        { img: "1iKwlr8PPuYM9RGyYrJMLQe-oNFSVonWk", title: "Panel 04" },
        { img: "17qoX4TwiR2w-RqrLWTP8iC4A-RJps6Wb", title: "Panel 05" },
        { img: "12D1rcqRBu6l8Hpt_rm0cuwqWifJWPkBG", title: "Panel 06" },
        { img: "1ptc5NwmHy7qQHwscA6z_9nxbsqMHl3Bt", title: "Panel 07" },
        { img: "1DAlNFRBZBntn-0-z7IlL7AL3XpCCZiHo", title: "Panel 08" },
        { img: "1DZdlLGOj3Qy3X-1Lcvp8E2VIMFtF3bmS", title: "Panel 09" }
      ]
    },

    kmb: {
      reel: "https://www.youtube.com/embed/l_v5yS9Tet0",
      panels: [
        { img: "1jVgJ11XZZ5EwQtkN51G5CifpkQMO9Snp", title: "Storyboard 01" },
        { img: "1pmVk6lR-id9OUEQnz68NKnbmtAhVzh8Q", title: "Storyboard 02" },
        { img: "1xSPlk2gLAdolujjH2eOWmRaxSpp9CVPa", title: "Storyboard 03" },
        { img: "1VdwWICCSAjv57zdtCwmNBCWxbqC4UfMD", title: "Storyboard 04" },
        { img: "1zEod0tZm1QfYPh7jDA3iChv0i_t_jnyX", title: "Storyboard 05" },
        { img: "1DdwnxOD9ecGnLmbEXXYfHKFcswGgrw00", title: "Storyboard 06" },
        { img: "1-QAzc6NwaA4ezIjXwfvMjrKBd2_OV7AU", title: "Storyboard 07" },
        { img: "1iDPWQJpRyN-BFK3ylv0iIzcpJk2ffaQt", title: "Storyboard 08" },
        { img: "1seJ1LI7BCvkd9PvhCZuCDAnBdhKRgD4B", title: "Storyboard 09" },
        { img: "1HU3PsRjMsg0-zK_vdV9ZBcCqRWNOlkPU", title: "Storyboard 10" },
        { img: "1LDAKMleDZggATfpXRycsAi1V9gmeZeKO", title: "Still 01" },
        { img: "1Vzn59_jTRDEKfV3MFoHJ6iITc8-9xZ_t", title: "Still 02" },
        { img: "1nW4T2n1t-6mA5YFyd7QqWDpw276cw165", title: "Still 03" },
        { img: "1D4cEoJHRUPHz_HB7tistp78XaSV3EWuw", title: "Still 04" },
        { img: "1H-YFFmORhpIQvi21EiM_poauDYokpiVm", title: "Still 05" },
        { img: "1PX5BKC3GISFiTScPu30CMWRnXi1QAk46", title: "Still 06" },
        { img: "1nUwbAm8v-9G_iEnxaHbbrG0yqSBfH9qk", title: "Still 07" },
        { img: "1u_g14FLjQHAXqUv3HaE0RCeTE9S_ihjq", title: "Still 08" }
      ]
    },

    waiting: {
      reel: "https://www.youtube.com/embed/ZMFfGNMA09U",
      panels: [
        { img: "1DQgdbtW732wzyvHpECudBdcTmAnSh88A", title: "Still 01" },
        { img: "1eai44p_RwO3VbExurmQmz7n7iBHFXVWF", title: "Still 02" },
        { img: "1Lwbx-2csjdoEM1kBd-K_lBJy9jDV-3ol", title: "Still 03" },
        { img: "1NpvA1i-parYykm9Jt5nJXLtC4u1aJ2z5", title: "Still 04" },
        { img: "1wp7WjNjJWIprSZfyyuX3Kqmn41tLn4ro", title: "Still 05" },
        { img: "1NC5mB-3hbDudORjpNK1eQ3IJhgGmeSlu", title: "Still 06" },
        { img: "1PkqR-nspFk_b4pbeOAFdiwM3DMCw0jvN", title: "Still 07" },
        { img: "1ye2oW5bXR672o-3Qt0JZr3ANf1iWiB8z", title: "Still 08" },
        { img: "1vCld0Oqrvk95z_vsbehWBpmH3kkzqhRh", title: "Still 09" }
      ]
    },

    keeta: {
      reel: "https://www.youtube.com/embed/KxUCqJpana8",
      panels: [
        { img: "1r1R-j9uwGu7CEhUxigG2YjyOswk95DIT", title: "Panel 01" },
        { img: "1q2crbQH_ihR3ZMWrRwHvUFFkmDEiMf5S", title: "Panel 02" },
        { img: "1wHeM8hNuQd8_KiGCdetkFC2d-p2wNtRa", title: "Panel 03" },
        { img: "1XLGpyPTSEgwT5q4ZPAg0HgK7Oczyuo1q", title: "Panel 04" },
        { img: "1ww0yzchyj1Le2edadRlA9eJfg2a6k22w", title: "Panel 05" },
        { img: "1tt9JtnaVvzkpt8H69cXazaCew_aSOsz9", title: "Panel 06" },
        { img: "1v_2e2T8v0vwxTD2fiYVT8jyzTqROoLpe", title: "Panel 07" },
        { img: "1vgllwUak8vvH5G1hkS1wcazoUkihOn4k", title: "Panel 08" },
        { img: "1n6KaGsSuu82pQ1ngX05rQLQqwH1uGXJO", title: "Panel 09" },
        { img: "1kXJ2OGFSKyNGgj4vnNKb0826gGQ4DC3Q", title: "Panel 10" }
      ]
    },

    // Housewarming and Don't Leave have no detail page — clicking their
    // gallery card opens the video modal directly with a status message.
    house: { statusText: "Work in progress" },
    dontleave: { statusText: "Work in progress" }
  },

  journal: {
    contactSheet: ["", "", "", "", "", "", "", "", "", "", "", ""],
    diagram: "",
    btsPlate: ""
  },

  chefReel: "", // no reel yet -> credit line shows "Work in progress" (see script.js)

  // Short films currently in production. Each opens the video modal with
  // a "Coming soon" status instead of a detail page.
  upcoming: [
    {
      id: "darar",
      title: "Darar",
      desc: "DP · Colorist — short film currently in production",
      cover: ""
    },
    {
      id: "sample06",
      title: "Sample 06",
      desc: "Writer · Director · Animator — one-man animated short, currently in production",
      cover: ""
    }
  ]
};

function driveImageUrl(id) {
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1600` : null;
}

function driveVideoEmbedUrl(id) {
  return id ? `https://drive.google.com/file/d/${id}/preview` : null;
}

// Accepts either a bare Drive file ID or a full embeddable URL (e.g. a
// youtube.com/embed/... link) and returns a ready iframe src, or null.
function resolveEmbedUrl(value) {
  if (!value) return null;
  return /^https?:\/\//i.test(value) ? value : driveVideoEmbedUrl(value);
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
